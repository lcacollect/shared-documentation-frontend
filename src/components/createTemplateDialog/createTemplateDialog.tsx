import { GraphQLErrors } from '@apollo/client/errors'
import { LcaButton } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  GetSchemaTemplatesDocument,
  useAddSchemaTemplateMutation,
  useUpdateSchemaTemplateMutation,
} from '../../dataAccess'
import { SchemaTemplate } from '../schemaTemplatesTable'

export const AssigneeTypeMap = {
  GraphQLProjectMember: 'PROJECT_MEMBER',
  GraphQLProjectGroup: 'PROJECT_GROUP',
  User: 'USER',
}

type CreateTemplateDialogProps = {
  open: boolean
  handleClose: () => void
  templateId?: string
  editRow: SchemaTemplate | null | undefined
  setEditRow: Dispatch<SetStateAction<SchemaTemplate | null | undefined>>
  loading: boolean
}

export const CreateTemplateDialog = ({
  open,
  handleClose,
  templateId,
  editRow,
  setEditRow,
  loading,
}: CreateTemplateDialogProps) => {
  const [updateSchemaTemplate, { loading: updateTaskLoading }] = useUpdateSchemaTemplateMutation({
    refetchQueries: [{ query: GetSchemaTemplatesDocument }],
  })
  const [addSchemaTemplate, { loading: addTaskLoading }] = useAddSchemaTemplateMutation({
    refetchQueries: [{ query: GetSchemaTemplatesDocument }],
  })

  const [name, setName] = useState<string>()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const handleUpdateSchemaTemplate = async () => {
    setSnackbar({ children: 'Adding template...', severity: 'info' })
    return
    // const { errors } = await updateSchemaTemplate({
    //   variables: {
    //     id: templateId as string,
    //     name: name as string,
    //   },
    // })
    // if (errors) {
    //   handleErrors(errors)
    // } else {
    //   resetValue()
    //   handleClose()
    // }
  }

  const handleAddSchemaTemplate = async () => {
    setSnackbar({ children: 'Adding template...', severity: 'info' })
    return
    // const { errors } = await addSchemaTemplate({
    //   variables: {
    //     name: name as string,
    //   },
    // })
    // if (errors) {
    //   handleErrors(errors)
    // } else {
    //   resetValue()
    //   handleClose()
    // }
  }

  const handleErrors = (errors: GraphQLErrors) => {
    console.error(errors)
    setSnackbar({ children: errors[0].message, severity: 'error' })
  }

  const resetValue = () => {
    setName(undefined)
  }

  const handleCancel = () => {
    resetValue()
    handleClose()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
      >
        <DialogTitle>Create new template</DialogTitle>
        <DialogContent>
          <Grid paddingBottom={3}>
            <TextField
              label='Name'
              helperText='Name for template'
              value={name ?? ''}
              onChange={(e) => setName(e.target.value)}
              variant='standard'
              inputProps={{ style: { fontWeight: 'bold', fontSize: 20 } }}
            />
          </Grid>
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item>
              <Typography fontWeight='bold'>Typecode</Typography>
            </Grid>
            <Grid item>
              <Grid container direction='column' alignItems='center'>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  // onClick={handleAllRight}
                  // disabled={left.length === 0}
                  aria-label='move all right'
                >
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  // onClick={handleCheckedRight}
                  // disabled={leftChecked.length === 0}
                  aria-label='move selected right'
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  // onClick={handleCheckedLeft}
                  // disabled={rightChecked.length === 0}
                  aria-label='move selected left'
                >
                  &lt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  // onClick={handleAllLeft}
                  // disabled={right.length === 0}
                  aria-label='move all left'
                >
                  ≪
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography fontWeight='bold'>Required</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
          <LcaButton onClick={handleCancel}>
            <Typography>Cancel</Typography>
          </LcaButton>
          <LcaButton
            onClick={() => (name ? handleUpdateSchemaTemplate() : handleAddSchemaTemplate())}
            disabled={addTaskLoading || updateTaskLoading}
          >
            {addTaskLoading || updateTaskLoading ? <CircularProgress size='small' /> : null}
            <Typography>Done</Typography>
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
