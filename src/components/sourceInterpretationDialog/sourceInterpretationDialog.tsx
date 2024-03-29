import { CardTitle, LcaButton } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SourceElementsTable } from '../../components'
import { GetProjectSourcesDocument, Unit, useUpdateProjectSourceInterpretationMutation } from '../../dataAccess'
import { SourceData } from './types'

interface InterpretationSelectionDialogProps {
  openDialog: boolean
  handleDialogClose: () => void
  editRow?: SourceData | null
  setEditRow: Dispatch<SetStateAction<SourceData | null | undefined>>
  setSourceId?: Dispatch<SetStateAction<string | undefined>>
}

export interface ParameterColumnMapping {
  [parameter: string]: string
}

export const SourceInterpretationDialog = (props: InterpretationSelectionDialogProps) => {
  const { projectId = '' } = useParams()
  const { openDialog, handleDialogClose, editRow, setEditRow, setSourceId } = props

  const initialParameterOptions = [
    { value: 'id', label: 'Id' },
    { value: 'interpretationName', label: 'Name' },
    { value: 'description', label: 'Description' },
    { value: 'typeCode', label: 'Type Code' },
    { value: Unit.M, label: 'm' },
    { value: Unit.M2, label: 'm²' },
    { value: Unit.M3, label: 'm³' },
    { value: Unit.Kg, label: 'kg' },
    { value: Unit.Pcs, label: 'pcs.' },
  ]
  const initialParameterValues = Object.values(initialParameterOptions).reduce(
    (prev, cur) => ({ ...prev, [cur.value]: '' }),
    {},
  )

  const [selectedParameter, setSelectedParameter] = useState('interpretationName')
  const [selectedColumn, setSelectedColumn] = useState('')
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [parameterColumnMapping, setParameterColumnMapping] = useState<ParameterColumnMapping>(initialParameterValues)
  const [updateProjectSourceInterpretationMutation] = useUpdateProjectSourceInterpretationMutation({
    refetchQueries: [{ query: GetProjectSourcesDocument, variables: { projectId } }],
  })

  useEffect(() => {
    setParameterColumnMapping(editRow?.interpretation || initialParameterValues)
    setSelectedColumn(editRow?.interpretation.interpretationName || '')
  }, [editRow])

  useEffect(() => {
    updateMapping()
  }, [selectedColumn])

  const updateMapping = () => {
    const newMapping: ParameterColumnMapping = { [selectedParameter]: selectedColumn }
    setParameterColumnMapping((prevState) => ({ ...prevState, ...newMapping }))
    return newMapping
  }

  const handleChangeParameter = (event: MouseEvent<HTMLElement>, newParameter: string) => {
    setSelectedParameter(newParameter)
  }

  const handleUpdateSelectedColumn = (newColumn: string) => {
    setSelectedColumn(newColumn)
  }

  const handleClose = () => {
    // Reset states
    if (setSourceId) setSourceId(undefined)
    handleDialogClose()
    setSelectedParameter('interpretationName')
    setSelectedColumn('')
    setParameterColumnMapping(initialParameterValues)
  }

  const handleDone = async () => {
    if (!editRow?.id) {
      return
    }
    if (!parameterColumnMapping.interpretationName) {
      setSnackbar({ children: 'You must provide a column for the name parameter', severity: 'error' })
      return
    }
    const response = await updateProjectSourceInterpretationMutation({
      variables: { id: editRow.id, interpretation: parameterColumnMapping },
    })

    if (response.errors) {
      response.errors.forEach((error) => console.error(error))
      setSnackbar({ children: response.errors[0].message, severity: 'error' })
    } else {
      handleClose()
    }
  }

  return (
    <Dialog
      data-testid='source-interpretation-dialog'
      open={openDialog}
      onClose={handleDialogClose}
      maxWidth={'xl'}
      fullWidth
      PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
    >
      <DialogTitle>
        <CardTitle title='Add Source Interpretation' size='medium' />
      </DialogTitle>
      <DialogTitle>
        <CardTitle title='Parameter to import' size='small' />
      </DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          exclusive
          value={selectedParameter}
          onChange={handleChangeParameter}
          aria-label='text button group'
        >
          {initialParameterOptions.map((option) => (
            <ToggleButton key={option.value} value={option.value} sx={{ minWidth: '75px' }}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div style={{ marginTop: '40px' }}>
          <CardTitle title='Choose a column for the parameter' size='small' />
        </div>
        {editRow ? (
          <SourceElementsTable
            setEditRow={setEditRow}
            editRow={editRow}
            handleUpdateSelectedColumn={handleUpdateSelectedColumn}
            selectedParameter={selectedParameter}
            parameterColumnMapping={parameterColumnMapping}
          />
        ) : (
          ''
        )}
      </DialogContent>
      <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
        <LcaButton onClick={handleClose} data-testid='source-interpretation-button-cancel'>
          <Typography>Cancel</Typography>
        </LcaButton>
        <LcaButton onClick={handleDone} data-testid='source-interpretation-button-done'>
          <Typography>Done</Typography>
        </LcaButton>
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
