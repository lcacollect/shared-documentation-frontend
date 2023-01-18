import { LcaButton, Loading } from '@lcacollect/components'
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
} from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  GetSchemaElementsDocument,
  GraphQlProjectSourceFile,
  useAddSchemaElementFromSourceMutation,
  useGetProjectSourceFilesQuery,
  useGetProjectSourcesQuery,
} from '../../dataAccess'
import { NestedCategory } from '../buildingComponentAccordions'
import { ElementsFromSourceSelectionTable } from '../elementsFromSourceSelectionTable'
import { ElementsFromSourceShowSelectedTable, SourceInterpretationRow } from '../elementsFromSourceShowSelectedTable'
import { UnitOptions } from '../schemaElementsTable'

type AddElementsFromSourceProps = {
  open: boolean
  handleClose: () => void
  category: NestedCategory
  unitOptions: UnitOptions
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
}: AddElementsFromSourceProps) => {
  const { projectId = '' } = useParams()
  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = useState<SourceRow[]>([])
  const [selectedInterpretationRows, setSelectedInterpretationRows] = useState<SourceInterpretationRow[]>([])
  const [selectedSourceFile, setSelectedSourceFile] = useState<GraphQlProjectSourceFile>()
  const [isInterpretationEmpty, setIsInterpretationEmpty] = useState<boolean>()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const [addSchemaElementFromSourceMutation] = useAddSchemaElementFromSourceMutation({
    refetchQueries: [
      {
        query: GetSchemaElementsDocument,
        variables: { schemaCategoryIds: Object.values(category.children).map((child) => child.id) as string[] },
      },
    ],
  })
  const { data, error, loading } = useGetProjectSourcesQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })
  const projectSources = data?.projectSources.filter((source) => source.dataId)
  const dataIds = projectSources?.map((source) => source.dataId ?? '')

  const { data: sourceFilesData, loading: sourceFilesLoading } = useGetProjectSourceFilesQuery({
    variables: {
      dataIds: dataIds,
    },
    skip: !dataIds?.length,
  })
  const sourceFiles = sourceFilesData?.projectSourceFiles
  const selectedSource = projectSources?.find((source) => source.dataId === selectedSourceFile?.dataId)

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
    resetValue()
    handleClose()
  }

  const handleAdd = () => {
    resetValue()
    setSnackbar({ children: 'Adding schema element from source...', severity: 'info' })

    const objectIds = selectedInterpretationRows.map((row) => row.id.toString())
    const quantities = selectedInterpretationRows.map((row) => row.quantity)
    const units = selectedInterpretationRows.map((row) => row.unit)
    const schemaCategoryId = Object.keys(category.children)[0] // Add elements to first child
    const sourceId = selectedSource?.id

    if (!sourceId) {
      console.log('sourceId is falsy | value is:', sourceId)
      return
    }

    addSchemaElementFromSourceMutation({
      variables: {
        schemaCategoryId: schemaCategoryId,
        sourceId: sourceId,
        objectIds: objectIds,
        quantities: quantities,
        units: units,
      },
    })
    handleClose()
  }

  const handleFormIncomplete = () => {
    setSnackbar({ children: 'Add rows from the source', severity: 'warning' })
  }

  const handleChangeSelectedRow = (rowId: string) => {
    const selectedRow = selectedRows.find((row) => row.id === rowId)
    if (selectedRow) {
      setSelectedRows(selectedRows.filter((row) => row.id !== rowId))
    } else {
      const rowToSelect = selectedSourceFile?.rows.find((row: SourceRow) => row.id === rowId)
      setSelectedRows((prevState) => [...prevState, rowToSelect])
    }
  }

  const handleChangeAllSelectedRows = () => {
    if (selectedRows.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(selectedSourceFile?.rows)
    }
  }

  const handleChangeFile = (event: MouseEvent<HTMLElement>, selectedDataId: string) => {
    const sourceFile = sourceFiles?.find((sourceFile) => sourceFile.dataId === selectedDataId)
    if (!sourceFile) {
      console.log('No source file for selectedDataId:', selectedDataId)
      return
    }
    setSelectedSourceFile(sourceFile)
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
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item sx={{ width: '50%' }}>
              {selectedSourceFile && sourceFiles ? (
                <>
                  <ToggleButtonGroup
                    exclusive
                    value={selectedSourceFile.dataId}
                    onChange={handleChangeFile}
                    aria-label='text button group'
                  >
                    {projectSources?.map((source) => (
                      <ToggleButton key={source.dataId} value={source.dataId}>
                        {source.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
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
                    <ElementsFromSourceSelectionTable
                      selectedRows={selectedRows}
                      handleChangeSelectedRow={handleChangeSelectedRow}
                      handleChangeAllSelectedRows={handleChangeAllSelectedRows}
                      selectedSourceFile={selectedSourceFile}
                      setSelectedSourceFile={setSelectedSourceFile}
                    />
                  )}
                </>
              ) : (
                <Loading />
              )}
            </Grid>
            {isInterpretationEmpty ? null : (
              <Grid item sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  label='Category Name'
                  value={category.name}
                  variant='standard'
                  inputProps={{ style: { fontSize: 20 } }}
                />
                {selectedSourceFile ? (
                  <ElementsFromSourceShowSelectedTable
                    selectedRows={selectedRows}
                    handleChangeSelectedRow={handleChangeSelectedRow}
                    handleChangeAllSelectedRows={handleChangeAllSelectedRows}
                    selectedSourceFile={selectedSourceFile}
                    selectedSource={selectedSource}
                    unitOptions={unitOptions}
                    setSelectedInterpretationRows={setSelectedInterpretationRows}
                  />
                ) : (
                  <Loading />
                )}
              </Grid>
            )}
          </Grid>
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
