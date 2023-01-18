import { DataFetchWrapper, NoRowsOverlay } from '@lcacollect/components'
import { getDifference } from '@lcacollect/core'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import CancelIcon from '@mui/icons-material/Close'
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { Alert, AlertProps, IconButton, LinearProgress, Radio, Snackbar } from '@mui/material'
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueFormatterParams,
  MuiEvent,
} from '@mui/x-data-grid-pro'
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import {
  GraphQlSchemaCategory,
  GraphQlSchemaElement,
  Unit,
  useAddSchemaElementMutation,
  useDeleteSchemaElementMutation,
  useGetSchemaElementsQuery,
  useUpdateSchemaElementMutation,
} from '../../dataAccess'
import { AddElementsFromSourceDialog } from '../addElementFromSourceDialog'
import { NestedCategory } from '../buildingComponentAccordions'
import { ProjectSource } from '../sourceTable'
import { TaskBubbles } from '../taskBubbles'
import { Task } from '../tasksTable'
import { EditTextArea } from './multilineTextEdit'

interface SchemaElementsTableProps {
  category: NestedCategory
  tasks: Task[] | undefined // GraphQlTask[];
  isAddingTasks: boolean
  schemaId: string | null | undefined
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: Dispatch<SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
}

export type SchemaElement = Omit<GraphQlSchemaElement, 'commits'>

export type UnitOptions = {
  [Unit.M]: string
  [Unit.M2]: string
  [Unit.M3]: string
  [Unit.Kg]: string
  [Unit.Pcs]: string
}

export const SchemaElementsTable = (props: SchemaElementsTableProps) => {
  const { category, tasks, isAddingTasks, refToAddTaskTo, setRefToAddTaskTo, setSelectedTask, setIsAddTaskDialogOpen } =
    props
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [rows, setRows] = useState<GridRowModel<SchemaElement[]>>([])
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [openElementsFromSourceDialogId, setOpenElementsFromSourceDialogId] = useState('')
  const { data, error, loading } = useGetSchemaElementsQuery({
    variables: { schemaCategoryIds: Object.values(category.children).map((child) => child.id) as string[] },
  })

  useEffect(() => {
    if (error || loading) {
      return
    }
    setRows(data?.schemaElements as SchemaElement[])
  }, [data, error, loading])

  const [addSchemaElement] = useAddSchemaElementMutation()

  const [updateSchemaElementMutation] = useUpdateSchemaElementMutation()

  const [deleteSchemaElementMutation] = useDeleteSchemaElementMutation()

  const handleAddRow = () => {
    if (rows.find((row) => row.id === '' && row.name === '')) {
      setSnackbar({ children: 'You can only add 1 row at a time', severity: 'info' })
      return
    }
    setRows((oldRows) => [
      ...oldRows,
      {
        id: '',
        name: '',
        unit: Unit.M,
        schemaCategory: Object.values(category.children).find((child) => child.name.includes('x')),
        description: '',
        source: null,
        quantity: 0,
      } as SchemaElement,
    ])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      '': { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }))
  }

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    },
    [rowModesModel],
  )

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    },
    [rowModesModel],
  )

  const handleDeleteClick = useCallback(
    (id: GridRowId) => async () => {
      setRows(rows?.filter((row: GridRowModel) => row.id !== id))
      const { errors } = await deleteSchemaElementMutation({ variables: { id: id.toString() } })
      if (errors) {
        errors.forEach((error) => console.error(error))
        setSnackbar({ children: errors[0].message, severity: 'error' })
      }
    },
    [rows, deleteSchemaElementMutation],
  )

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    },
    [rowModesModel],
  )

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    if (newRow.id === '') {
      return await saveRow(newRow as SchemaElement)
    }
    return await updateRow(newRow as SchemaElement, oldRow)
  }

  const saveRow = async (newRow: SchemaElement) => {
    const { errors, data } = await addSchemaElement({
      variables: {
        schemaCategoryId: newRow.schemaCategory as unknown as string,
        name: newRow.name,
        quantity: newRow.quantity,
        unit: newRow.unit,
        description: newRow.description as string,
      },
    })
    if (errors) {
      throw new Error(errors[0].message)
    }
    const schemaElement = data?.addSchemaElement || { id: '' }
    setRows((rows) => rows.map((row) => (row.id === '' ? (schemaElement as SchemaElement) : row)))
    const newRowModes = {
      ...rowModesModel,
      [schemaElement.id]: { mode: GridRowModes.View },
    }
    delete newRowModes['']
    setRowModesModel(newRowModes)
    return schemaElement
  }

  const updateRow = async (newRow: SchemaElement, oldRow: GridRowModel) => {
    const changeObject = getDifference(oldRow, newRow)
    if (typeof changeObject.schemaCategory !== 'string') {
      delete changeObject.schemaCategory
    }
    const { errors, data } = await updateSchemaElementMutation({ variables: { ...changeObject, id: oldRow.id } })
    if (errors) {
      throw new Error(errors[0].message)
    }
    const schemaElement = data?.updateSchemaElement
    const updatedRow = { ...newRow, schemaCategory: schemaElement?.schemaCategory as GraphQlSchemaCategory }
    setRows((rows) => rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)))
    const newRowModes = {
      ...rowModesModel,
      [schemaElement?.id ?? newRow.id]: { mode: GridRowModes.View },
    }
    delete newRowModes['']
    setRowModesModel(newRowModes)
    return updatedRow
  }

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<SyntheticEvent>) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    console.error(error)
    setSnackbar({ children: error.message, severity: 'error' })
  }, [])

  const handleChangeSelectedTask = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setRefToAddTaskTo(rows.find((row) => row.id === value))
  }

  const handleOpenMultipleElementsDialog = () => {
    setOpenElementsFromSourceDialogId(category.id)
  }

  const handleCloseElementsFromSourceDialog = () => {
    setOpenElementsFromSourceDialogId('')
  }

  const unitOptions: UnitOptions = {
    [Unit.M]: 'm',
    [Unit.M2]: 'm²',
    [Unit.M3]: 'm³',
    [Unit.Kg]: 'kg',
    [Unit.Pcs]: 'pcs',
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, editable: false },
    {
      field: 'classification',
      headerName: 'Class',
      flex: 1,
      valueFormatter: () => category.name,
    },
    {
      field: 'schemaCategory',
      headerName: 'Subclass',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: Object.values(category.children).map((child) => ({ value: child.id, label: child.name as string })),
      valueFormatter: (params) => params.value.name,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      editable: true,
    },
    {
      field: 'source',
      headerName: 'Source',
      flex: 1.25,
      valueFormatter: (params: GridValueFormatterParams<ProjectSource>) =>
        params.value ? `${params.value?.type as string}: ${params.value?.name}` : 'Typed in',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1.25,
      editable: true,
      type: 'number',
      valueParser: (value) => (value <= 0 ? 0 : Number(value)),
    },
    {
      field: 'unit',
      headerName: 'Unit',
      editable: true,
      flex: 1,
      type: 'singleSelect',
      valueOptions: Object.entries(unitOptions).map(([key, value]) => ({ value: key, label: value })),
      valueFormatter: (params: GridValueFormatterParams<Unit>) => unitOptions[params.value as keyof typeof unitOptions],
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2.0,
      editable: true,
      type: 'string',
      renderEditCell: (params) => <EditTextArea {...params} />,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }: { id: GridRowId }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem key={0} icon={<SaveIcon />} label='Save' onClick={handleSaveClick(id)} />,
            <GridActionsCellItem
              key={1}
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ]
        }

        return [
          <GridActionsCellItem
            key={2}
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={3}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ]
      },
    },
    {
      field: 'tasks',
      headerName: 'Tasks',
      type: 'actions',
      flex: 1,
      editable: false,
      getActions: (cell) => {
        return [
          <GridActionsCellItem
            key={0}
            label='tasks'
            icon={
              <TaskBubbles
                tasks={tasks}
                elementId={cell.id as string}
                setSelectedTask={setSelectedTask}
                setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
              />
            }
            showInMenu={false}
          />,
        ]
      },
      hideSortIcons: true,
      disableReorder: true,
      disableColumnMenu: true,
    },
    {
      field: 'selectRow',
      align: 'center',
      headerName: '',
      flex: 0.1,
      editable: false,
      renderCell: (params) => (
        <Radio
          name='select-ref-to-add-task-to'
          checked={params.id === refToAddTaskTo?.id}
          value={params.id}
          onChange={handleChangeSelectedTask}
          size='small'
        />
      ),
    },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataFetchWrapper error={error}>
        <DataGridPro
          columns={columns}
          rows={rows}
          editMode='row'
          loading={loading}
          columnVisibilityModel={{
            id: false,
            selectRow: isAddingTasks,
          }}
          components={{ Toolbar: ElementToolbar, LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay }}
          componentsProps={{
            toolbar: { handleAddRow, handleOpenMultipleElementsDialog },
            noRowsOverlay: { text: 'No building components added' },
          }}
          experimentalFeatures={{ newEditingApi: true }}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          rowModesModel={rowModesModel}
          sx={{ border: 0 }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          getRowHeight={(params) => (rowModesModel[params.id]?.mode === GridRowModes.Edit ? 'auto' : null)}
        />
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
        <AddElementsFromSourceDialog
          open={!!openElementsFromSourceDialogId}
          handleClose={handleCloseElementsFromSourceDialog}
          category={category}
          unitOptions={unitOptions}
        />
      </DataFetchWrapper>
    </div>
  )
}

interface ElementToolbarProps {
  handleAddRow: () => void
  handleOpenMultipleElementsDialog: () => void
}

const ElementToolbar = ({ handleAddRow, handleOpenMultipleElementsDialog }: ElementToolbarProps) => {
  const color = 'black'

  const fontWeight = 'bold'

  return (
    <GridToolbarContainer data-testid='table-toolbar'>
      <GridToolbarColumnsButton
        sx={{
          color,
          fontWeight,
        }}
      />
      <GridToolbarFilterButton sx={{ color, fontWeight }} />
      <IconButton aria-label='addSource' onClick={handleAddRow} sx={{ color }}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <IconButton aria-label='addMultipleSourceElements' onClick={handleOpenMultipleElementsDialog} sx={{ color }}>
        {/* TODO - rotate 180 degrees */}
        <ControlPointDuplicateOutlinedIcon />
      </IconButton>
    </GridToolbarContainer>
  )
}
