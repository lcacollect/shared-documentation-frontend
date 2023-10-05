import { LcaButton } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { FileField } from '../sourceDialog/sourceForm'
import { ProjectSourceType, useUploadTypeCodeElementsMutation, GetTypeCodesDocument } from '../../dataAccess'

export const AssigneeTypeMap = {
  GraphQLProjectMember: 'PROJECT_MEMBER',
  GraphQLProjectGroup: 'PROJECT_GROUP',
  User: 'USER',
}

type AddTypecodeProps = {
  open: boolean
  handleClose: () => void
}

export const AddTypecodeDialog = ({ open, handleClose }: AddTypecodeProps) => {
  const [name, setName] = useState<string>()
  const [file, setFile] = useState<File>()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const [uploadTypeCodeElements] = useUploadTypeCodeElementsMutation({
    refetchQueries: [{ query: GetTypeCodesDocument }],
  })

  const resetValue = () => {
    setName(undefined)
    setFile(undefined)
  }

  const handleCancel = () => {
    resetValue()
    handleClose()
  }

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

  const handleAdd = async () => {
    if (file) {
      const encodedFile = (await fileToBase64(file)) as string
      setSnackbar({ children: 'Adding typecode...', severity: 'info' })

      await uploadTypeCodeElements({
        variables: { file: encodedFile },
      })
        .then((data) => {
          if (data.errors) {
            data.errors.forEach((error) => console.error(error))
            setSnackbar({ children: data.errors[0].message, severity: 'error' })
          } else {
            setSnackbar({ children: 'File uploaded', severity: 'success' })
          }
        })
        .catch((error) => {
          console.log(error)
          setSnackbar({ children: error.message, severity: 'error' })
        })
    }
    handleCancel()
  }

  const handleFormIncomplete = () => {
    setSnackbar({ children: 'Add both a name and a file', severity: 'warning' })
  }

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) {
      return
    }

    const newFile = event.currentTarget.files[0]
    setFile(newFile)
  }

  const downloadTemplate = () => {
    const rows = [
      ['Code', 'Name', 'Level', 'parentPath'],
      ['1', 'Bygningsbasis', 1, '/'],
      ['10x', 'TerrĆ¦n', 3, '/1'],
      ['121', 'Liniefundamenter', 3, '/1/10x'],
    ]

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')

    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'LCAcollect - TypeCodeElement Template.csv')
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
      >
        <DialogTitle>Add Typecode</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} paddingBottom={3}>
            <Grid item xs={true}>
              <TextField
                label='Name'
                helperText='Name for import'
                value={name ?? ''}
                onChange={(e) => setName(e.target.value)}
                variant='standard'
                inputProps={{ style: { fontWeight: 'bold', fontSize: 20 } }}
                data-testid='name'
              />
            </Grid>
            <FileField show handleSetFile={handleSetFile} fileType={ProjectSourceType.Csv} />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
          <LcaButton onClick={downloadTemplate} data-testid='downloadTemplate' sx={{ marginRight: 'auto' }}>
            <Typography>Download template</Typography>
          </LcaButton>
          <LcaButton onClick={handleCancel}>
            <Typography>Cancel</Typography>
          </LcaButton>
          <LcaButton disabled={!file || !name} onClick={() => (name && file ? handleAdd() : handleFormIncomplete())}>
            <Typography>Add</Typography>
          </LcaButton>
        </DialogActions>
      </Dialog>
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
    </>
  )
}
