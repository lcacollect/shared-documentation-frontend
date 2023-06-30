import { CardTitle, GraphQlSchemaCategory, LcaButton } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Box,
  Button,
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
  useGetProjectSchemasWithCategoriesLazyQuery,
  Unit,
} from '../../dataAccess'
import { SourceForm } from './sourceForm'
import { AddElementsFromSourceDialog } from '../addElementFromSourceDialog'
import { UnitOptions } from '../schemaElementsTable'

interface SelectionDialogProps {
  openDialog: boolean
  handleDialogClose: () => void
  projectId: string
  editRow?: ProjectSource | null
  setEditRow: Dispatch<SetStateAction<ProjectSource | null | undefined>>
  setSourceId?: Dispatch<SetStateAction<string | undefined>>
}

export const SourceDialog: React.FC<SelectionDialogProps> = (props) => {
  const { openDialog, handleDialogClose, projectId, editRow, setEditRow, setSourceId } = props
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
  const [openElementsFromSourceDialog, setOpenElementsFromSourceDialog] = useState<boolean>(false)

  const [getProjectCategories, { data: categoriesData }] = useGetProjectSchemasWithCategoriesLazyQuery({
    variables: { projectId: projectId as string },
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
        (member) => member.userId === accountData?.account.id,
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
      if (setSourceId) setSourceId(response.data?.addProjectSource.id)
    } else {
      response = await updateProjectSourceMutation({
        variables: {
          id: editRow.id as string,
          type: type as ProjectSourceType,
          name,
          file: encodedFile,
        },
      })
      if (setSourceId) setSourceId(response.data?.updateProjectSource.id)
    }

    if (response?.errors) {
      response.errors.forEach((error) => console.error(error))
      setSnackbar({ children: response.errors[0].message, severity: 'error' })
    } else {
      handleClose()
      setSnackbar({ children: 'File uploaded! Do you want to add elements to project?', severity: 'success' })
    }
  }

  const handleClose = () => {
    setType(null)
    setName('')
    setFile(null)
    setEditRow(null)
    handleDialogClose()
  }

  const downloadTemplate = () => {
    const rows = [
      ['Id', 'Name', 'Description', 'Type Code', 'm', 'm2', 'm3', 'kg', 'pcs'],
      ['2781f8dc-aea7-409b-9c36-c6f33551a5b4', 'Test', 'Some text', '103', '', '1', '', '', ''],
      ['b918aac2-b2d1-4762-976c-09cccb682259', 'Test2', 'Some text2', '205', '2', '1', '1', '1', '1'],
    ]

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')

    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'LCAcollect - Source Template.csv')
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

  const unitOptions: UnitOptions = {
    [Unit.M]: 'm',
    [Unit.M2]: 'm²',
    [Unit.M3]: 'm³',
    [Unit.Kg]: 'kg',
    [Unit.Pcs]: 'pcs',
  }

  const alertSnackbar =
    snackbar?.severity == 'success' ? (
      <Alert
        {...snackbar}
        variant='filled'
        action={
          <>
            <Button
              color='inherit'
              size='small'
              data-testid='sourceAlertBtnYes'
              onClick={() => {
                getProjectCategories().then(() => {
                  setOpenElementsFromSourceDialog(true)
                  setSnackbar(null)
                })
              }}
            >
              YES
            </Button>
            <Button color='inherit' size='small' onClick={() => setSnackbar(null)}>
              NO
            </Button>
          </>
        }
      />
    ) : (
      <Alert {...snackbar} variant='filled' />
    )

  const getSchemCategories = () => {
    const categories = categoriesData?.reportingSchemas[0]?.categories
    return categories?.filter((child) => child.depth === 2)
  }

  return (
    <>
      <Dialog
        data-testid='sources-dialog'
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth={'xl'}
        PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
      >
        <DialogTitle sx={{ display: 'flex' }}>
          <CardTitle title='Add Source' size='medium' />
          <LcaButton onClick={downloadTemplate} data-testid='downloadTemplate' sx={{ 'margin-left': 'auto' }}>
            <Typography fontSize={'60%'}>Download template</Typography>
          </LcaButton>
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
      </Dialog>

      <Snackbar
        open={!!snackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbar(null)}
        sx={{ top: '10% !important' }}
        autoHideDuration={15000}
        data-testid='alert-snackbar'
      >
        {alertSnackbar}
      </Snackbar>

      <AddElementsFromSourceDialog
        open={openElementsFromSourceDialog}
        handleClose={() => setOpenElementsFromSourceDialog(false)}
        addSource={() => undefined}
        category={(getSchemCategories() as unknown as GraphQlSchemaCategory[]) || []}
        unitOptions={unitOptions}
        handleRowUpdateFromSource={() => undefined}
      />
    </>
  )
}
