import { ErrorBoundary, LcaButton, Unit, DataFetchWrapper } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Link,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useAddSchemaElementFromSourceMutation,
  useGetProjectSourceDataQuery,
  GraphQlSchemaCategory,
} from '../../dataAccess'
import { NestedCategory } from '../buildingComponentAccordions'
import { ElementsFromSourceSelectionTable } from '../elementsFromSourceSelectionTable'
import { ElementsFromSourceShowSelectedTable, SourceInterpretationRow } from '../elementsFromSourceShowSelectedTable'
import { UnitOptions } from '../schemaElementsTable'
import { SourceData } from '../sourceInterpretationDialog/types'
import AddIcon from '@mui/icons-material/Add'

type AddElementsFromSourceProps = {
  open: boolean
  handleClose: () => void
  category: NestedCategory | GraphQlSchemaCategory[]
  unitOptions: UnitOptions
  addSource: () => void
  handleRowUpdateFromSource: () => void
}

export type SourceRow = {
  id: string
  [key: string]: string
}

export const AddElementsFromSourceDialog = ({
  open,
  handleClose,
  category,
  unitOptions,
  addSource,
  handleRowUpdateFromSource,
}: AddElementsFromSourceProps) => {
  const { projectId = '' } = useParams()
  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = useState<SourceRow[]>([])
  const [selectedInterpretationRows, setSelectedInterpretationRows] = useState<SourceInterpretationRow[]>([])
  const [selectedSourceFile, setSelectedSourceFile] = useState<SourceData>()
  const [isInterpretationEmpty, setIsInterpretationEmpty] = useState<boolean>()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [categoryId, setCategoryId] = useState<string>('')

  const [addSchemaElementFromSourceMutation] = useAddSchemaElementFromSourceMutation()

  const {
    data: sourceFilesData,
    loading,
    error,
  } = useGetProjectSourceDataQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })
  const sourceFiles = sourceFilesData?.projectSources
  const selectedSource = sourceFiles?.find((source) => source.id === selectedSourceFile?.id)

  useEffect(() => {
    if (sourceFiles?.length) {
      setSelectedSourceFile(sourceFiles[0])
    }
  }, [sourceFiles])

  useEffect(() => {
    if (selectedSourceFile) {
      const isInterpretationEmpty = Object.keys(selectedSource?.interpretation).length === 0
      setIsInterpretationEmpty(isInterpretationEmpty)
    }
  }, [selectedSourceFile])

  const resetValue = () => {
    setSelectedRows([])
    setSnackbar(null)
  }

  const handleCancel = () => {
    setCategoryId('')
    resetValue()
    handleClose()
  }

  const handleAdd = async () => {
    if (selectedRows.length === 0) {
      setSnackbar({ children: 'Select some rows!', severity: 'warning' })
      return
    }
    resetValue()

    const objectIds = selectedInterpretationRows.map((row) => row.id.toString())
    const quantities = selectedInterpretationRows.map((row) => row.quantity)
    const units = selectedInterpretationRows.map((row) => {
      if (row.unit === 'NONE') {
        return Unit.M
      } else {
        return row.unit
      }
    })

    const schemaCategoryId = Array.isArray(category) ? categoryId : Object.keys(category.children)[0]
    const sourceId = selectedSource?.id

    if (!schemaCategoryId) {
      setSnackbar({ children: 'Please select category!', severity: 'warning' })
      return
    }

    if (!sourceId) {
      console.log('sourceId is falsy | value is:', sourceId)
      return
    }

    setSnackbar({ children: 'Adding schema element from source...', severity: 'info' })

    const { errors } = await addSchemaElementFromSourceMutation({
      variables: {
        schemaCategoryId: schemaCategoryId,
        sourceId: sourceId,
        objectIds: objectIds,
        quantities: quantities,
        units: units,
      },
    })
    if (errors) {
      errors.forEach((error) => {
        console.error(error)
        setSnackbar({ children: error.message, severity: 'error' })
      })
    } else {
      handleCancel()
      handleRowUpdateFromSource()
    }
  }

  const handleFormIncomplete = () => {
    setSnackbar({ children: 'Add rows from the source', severity: 'warning' })
  }

  const handleChangeSelectedRow = (rowId: string) => {
    const selectedRow = selectedRows.find((row) => row.id === rowId)
    if (selectedRow) {
      setSelectedRows(selectedRows.filter((row) => row.id !== rowId))
    } else {
      const rowToSelect = selectedSourceFile?.data?.rows[rowId]
      setSelectedRows((prevState) => [...prevState, rowToSelect])
    }
  }

  const handleChangeAllSelectedRows = () => {
    if (selectedRows.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(selectedSourceFile?.data?.rows)
    }
  }

  const handleChangeFile = (event: MouseEvent<HTMLElement>, selectedDataId: string) => {
    const sourceFile = sourceFiles?.find((sourceFile) => sourceFile.id === selectedDataId)
    if (!sourceFile) {
      console.log('No source file for selectedDataId:', selectedDataId)
      return
    }
    setSelectedSourceFile(sourceFile)
  }

  const getMeniuCategories = () => {
    if (Array.isArray(category)) {
      const menuItems = category.map((child) => (
        <MenuItem value={child.id} key={child.id}>
          {child.name}
        </MenuItem>
      ))
      return menuItems
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={isInterpretationEmpty ? 'md' : 'xl'}
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
      >
        <DialogContent>
          <DataFetchWrapper error={error} loading={loading}>
            {selectedSourceFile ? (
              <>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                  <Grid item sx={{ width: '50%' }}>
                    <ToggleButtonGroup
                      exclusive
                      value={selectedSourceFile.id}
                      onChange={handleChangeFile}
                      aria-label='text button group'
                    >
                      {sourceFiles?.map((source) => (
                        <ToggleButton key={source.id} value={source.id}>
                          {source.name}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    <IconButton
                      data-testid='add-source-icon-button'
                      onClick={addSource}
                      sx={{
                        padding: 'unset',
                        marginLeft: '10px',
                        width: `${11 * 1.5}px`,
                        height: `${11 * 1.5}px`,
                      }}
                    >
                      <AddIcon
                        sx={{
                          boxShadow: '0px 1px 2px #00000061',
                          fill: '#333',
                          borderRadius: '100%',
                          height: `${11}px`,
                          width: `${11}px`,
                          padding: `${11 / 4}px`,
                        }}
                      />
                    </IconButton>
                    {isInterpretationEmpty ? (
                      <Grid container sx={{ paddingTop: '1rem' }}>
                        <Typography>
                          Add a{' '}
                          <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('../sources')}>
                            source interepretation
                          </Link>{' '}
                          for <i>{selectedSource?.name}</i> to allow adding elements
                        </Typography>
                      </Grid>
                    ) : (
                      <ErrorBoundary>
                        <ElementsFromSourceSelectionTable
                          selectedRows={selectedRows}
                          handleChangeSelectedRow={handleChangeSelectedRow}
                          handleChangeAllSelectedRows={handleChangeAllSelectedRows}
                          selectedSourceFile={selectedSourceFile}
                          setSelectedSourceFile={setSelectedSourceFile}
                        />
                      </ErrorBoundary>
                    )}
                  </Grid>

                  {isInterpretationEmpty ? null : (
                    <Grid item sx={{ width: '50%' }}>
                      {!Array.isArray(category) ? (
                        <TextField
                          fullWidth
                          label='Category Name'
                          value={category.name}
                          variant='standard'
                          inputProps={{ style: { fontSize: 20 } }}
                        />
                      ) : (
                        <FormControl fullWidth>
                          <InputLabel id='category'>Select Category</InputLabel>
                          <Select
                            labelId='category'
                            value={categoryId}
                            label='Category'
                            onChange={(event) => setCategoryId(event.target.value as string)}
                          >
                            {getMeniuCategories()}
                          </Select>
                        </FormControl>
                      )}

                      <ErrorBoundary>
                        <ElementsFromSourceShowSelectedTable
                          selectedRows={selectedRows}
                          handleChangeSelectedRow={handleChangeSelectedRow}
                          handleChangeAllSelectedRows={handleChangeAllSelectedRows}
                          selectedSourceFile={selectedSourceFile}
                          selectedSource={selectedSource}
                          unitOptions={unitOptions}
                          setSelectedInterpretationRows={setSelectedInterpretationRows}
                        />
                      </ErrorBoundary>
                    </Grid>
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                  <Grid item sx={{ width: '50%' }}>
                    <Typography sx={{ display: 'inline', 'font-size': '1.25rem', 'font-weight': 'bold' }}>
                      There is no soure! Add source first
                    </Typography>

                    <IconButton
                      data-testid='add-source-icon-button'
                      onClick={addSource}
                      sx={{
                        padding: 'unset',
                        marginLeft: '10px',
                        marginBottom: '9px',
                        width: `${12 * 1.5}px`,
                        height: `${12 * 1.5}px`,
                      }}
                    >
                      <AddIcon
                        sx={{
                          boxShadow: '0px 1px 2px #00000061',
                          fill: '#333',
                          borderRadius: '100%',
                          height: `${17}px`,
                          width: `${17}px`,
                          padding: `${11 / 4}px`,
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            )}
          </DataFetchWrapper>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
          <LcaButton onClick={handleCancel}>
            <Typography>Cancel</Typography>
          </LcaButton>
          <LcaButton onClick={() => (selectedInterpretationRows.length ? handleAdd() : handleFormIncomplete())}>
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
