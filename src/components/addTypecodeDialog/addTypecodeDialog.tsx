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

  const resetValue = () => {
    setName(undefined)
    setFile(undefined)
  }

  const handleCancel = () => {
    resetValue()
    handleClose()
  }

  const handleAdd = () => {
    resetValue()
    setSnackbar({ children: 'Adding typecode...', severity: 'info' })
    handleClose()
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
              />
            </Grid>
            {/* <FileField show handleSetFile={handleSetFile} fileType={} />*/}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
          <LcaButton onClick={handleCancel}>
            <Typography>Cancel</Typography>
          </LcaButton>
          <LcaButton onClick={() => (name && file ? handleAdd : handleFormIncomplete)}>
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
