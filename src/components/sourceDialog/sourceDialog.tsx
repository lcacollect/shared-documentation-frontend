import { CardTitle, LcaButton } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { ProjectSource } from 'components'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  GetProjectSourcesDocument,
  ProjectSourceType,
  useAddProjectSourceMutation,
  useGetAccountQuery,
  useGetProjectMembersQuery,
  useUpdateProjectSourceMutation,
} from '../../dataAccess'
import { SourceForm } from './sourceForm'

interface SelectionDialogProps {
  openDialog: boolean
  handleDialogClose: () => void
  projectId: string
  editRow?: ProjectSource | null
  setEditRow: Dispatch<SetStateAction<ProjectSource | null | undefined>>
}

export const SourceDialog: React.FC<SelectionDialogProps> = (props) => {
  const { openDialog, handleDialogClose, projectId, editRow, setEditRow } = props
  const [type, setType] = useState<ProjectSourceType | null | undefined>(editRow?.type || null)
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>()
  const [isMemberOfProject, setIsMemberOfProject] = useState<boolean>()
  const { data: accountData } = useGetAccountQuery()
  const { data: projectMemberData } = useGetProjectMembersQuery({
    variables: {
      projectId: projectId as string,
    },
    skip: !projectId,
  })

  const [addProjectSourceMutation] = useAddProjectSourceMutation({
    refetchQueries: [{ query: GetProjectSourcesDocument, variables: { projectId } }],
  })
  const [updateProjectSourceMutation] = useUpdateProjectSourceMutation({
    refetchQueries: [{ query: GetProjectSourcesDocument, variables: { projectId } }],
  })
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  useEffect(() => {
    setType(editRow?.type || null)
    setName(editRow?.name || '')
  }, [editRow])

  useEffect(() => {
    if (accountData && projectMemberData) {
      const isMemberOfProject = projectMemberData?.projectMembers.find(
        (member) => member.email === accountData?.account.email,
      )
      setIsMemberOfProject(!!isMemberOfProject)
    }
  }, [accountData, projectMemberData])

  // if fileToBase64 is imported from @lca/shared-core-frontend it won't run, perhaps due to issues with using FileReader async
  const fileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.replace(/^data:.+;base64,/, ''))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleDialogAdd = async () => {
    const encodedFile = file ? ((await fileToBase64(file)) as string) : undefined
    let response
    if (!editRow) {
      response = await addProjectSourceMutation({
        variables: {
          projectId: projectId as string,
          type: type as ProjectSourceType,
          name,
          file: encodedFile,
        },
      })
    } else {
      response = await updateProjectSourceMutation({
        variables: {
          id: editRow.id as string,
          type: type as ProjectSourceType,
          name,
          file: encodedFile,
        },
      })
    }

    if (response.errors) {
      response.errors.forEach((error) => console.error(error))
      setSnackbar({ children: response.errors[0].message, severity: 'error' })
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    setType(null)
    setName('')
    setFile(null)
    setEditRow(null)
    handleDialogClose()
  }

  return (
    <Dialog
      data-testid='sources-dialog'
      open={openDialog}
      onClose={handleDialogClose}
      maxWidth={'xl'}
      PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
    >
      <DialogTitle>
        <CardTitle title='Add Source' size='medium' />
      </DialogTitle>
      <DialogContent>
        <SourceForm type={type} setType={setType} name={name} setName={setName} setFile={setFile} />
      </DialogContent>
      <DialogActions sx={{ paddingX: 3 }}>
        <LcaButton onClick={handleClose} data-testid='cancel-project-source-button'>
          <Typography>Cancel</Typography>
        </LcaButton>
        <Tooltip
          placement='top-end'
          title={
            !name || !file
              ? 'Complete the form to upload file'
              : !isMemberOfProject
              ? 'Only project members can add files'
              : ''
          }
        >
          <Box sx={{ ml: 1 }}>
            <LcaButton
              disabled={!name || !file || !isMemberOfProject}
              onClick={handleDialogAdd}
              data-testid='add-project-source-button'
            >
              <Typography>Add</Typography>
            </LcaButton>
          </Box>
        </Tooltip>
      </DialogActions>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </Dialog>
  )
}
