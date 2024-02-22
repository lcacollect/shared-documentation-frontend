import { NoRowsOverlay } from '@lcacollect/components'
import { SourceDialog, SourceInterpretationDialog } from '../../components'
import { getDifference } from '@lcacollect/core'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import CancelIcon from '@mui/icons-material/Close'
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import Tooltip from '@mui/material/Tooltip'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Alert, AlertProps, Autocomplete, IconButton, LinearProgress, Radio, Snackbar, TextField } from '@mui/material'
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridEditSingleSelectCellProps,
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
  GridRenderCellParams,
  MuiEvent,
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  useGridApiContext,
} from '@mui/x-data-grid-pro'
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import {
  GetSchemaElementsDocument,
  GraphQlSchemaCategory,
  GraphQlSchemaElement,
  Unit,
  useAddSchemaElementMutation,
  useDeleteSchemaElementMutation,
  useUpdateSchemaElementsMutation,
  useGetProjectSourceDataQuery,
  useGetAssembliesQuery,
  useGetSingleProjectQuery,
} from '../../dataAccess'
import { AddElementsFromSourceDialog } from '../addElementFromSourceDialog'
import { NestedCategory } from '../buildingComponentAccordions'
import { ProjectSource } from '../sourceTable'
import { TaskBubbles } from '../taskBubbles'
import { Task } from '../tasksTable'
import { EditTextArea } from './multilineTextEdit'
import { useParams } from 'react-router-dom'
import { SourceData } from '../sourceInterpretationDialog/types'
import { AssemblyDetail } from './assemblyDetailGrid'

interface SchemaElementsTableProps {
  category: NestedCategory | GraphQlSchemaCategory[]
  tasks: Task[] | undefined // GraphQlTask[];
  elements: SchemaElement[]
  isAddingTasks: boolean
  categoriesId: string[]
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: Dispatch<SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
  refetchElements: () => void
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
  const {
    categoriesId,
    elements,
    category,
    tasks,
    isAddingTasks,
    refToAddTaskTo,
    setRefToAddTaskTo,
    setSelectedTask,
    setIsAddTaskDialogOpen,
    refetchElements,
  } = props

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [rows, setRows] = useState<GridRowModel<SchemaElement[]>>([])
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [openElementsFromSourceDialogId, setOpenElementsFromSourceDialogId] = useState('')
  const [sourceId, setSourceId] = useState<string | undefined>('') // set to null again once finished
  const [openInterpretationDialogId, setOpenInterpretationDialogId] = useState('')
  const [openSourceDialog, setOpenSourceDialog] = useState(false)
  const [editRow, setEditRow] = useState<ProjectSource | null | undefined>()
  const [editInterpretationRow, setEditInterpretationRow] = useState<SourceData | null | undefined>()

  const { projectId = '' } = useParams()

  const { data: projectData } = useGetSingleProjectQuery({ variables: { id: projectId }, skip: !projectId })

  const getSchemaCategories = () => {
    if (Array.isArray(category)) {
      return category.filter((child) => child.depth === 2)
    } else {
      return Object.values(category.children)
    }
  }

  const schemaCategories = getSchemaCategories()

  const handleInterpretationDialogClose = () => {
    setOpenInterpretationDialogId('')
    setEditInterpretationRow(undefined)
    handleOpenMultipleElementsDialog()
  }

  const handleAddSource = () => {
    setOpenSourceDialog(true)
  }

  const { data: assemblyData } = useGetAssembliesQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })

  const assemblies = assemblyData ? [...assemblyData.projectAssemblies] : []

  const sortedAssemblies = useMemo(() => assemblies.sort((a, b) => a.name.localeCompare(b.name)), [assemblies])

  const { data: sourceData } = useGetProjectSourceDataQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })
  const sourceFiles = sourceData?.projectSources

  const handleSourceDialogClose = () => {
    setOpenSourceDialog(false)
    sourceId ? handleOpenMultipleElementsDialog() : setOpenElementsFromSourceDialogId(projectId)
  }

  useEffect(() => {
    setRows(elements as SchemaElement[])
  }, [elements])

  const refetchUpdateQueries = [
    {
      query: GetSchemaElementsDocument,
      variables: { schemaCategoryIds: categoriesId },
    },
  ]
  const [addSchemaElement] = useAddSchemaElementMutation({ refetchQueries: refetchUpdateQueries })

  const [updateSchemaElementsMutation] = useUpdateSchemaElementsMutation({ refetchQueries: refetchUpdateQueries })

  const [deleteSchemaElementMutation] = useDeleteSchemaElementMutation({ refetchQueries: refetchUpdateQueries })

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
        schemaCategory: schemaCategories.find((child) => child.name.includes('x')),
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
    (id: GridRowId) => async () => {
      if (id === '') {
        setRows(rows?.filter((row: GridRowModel) => row.id !== id))
        return
      }
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    },
    [rowModesModel, rows, deleteSchemaElementMutation],
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
        quantity: newRow.quantity <= 0 ? 0 : newRow.quantity,
        unit: newRow.unit,
        description: newRow.description as string,
        assemblyId: newRow.assemblyId,
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

    if (changeObject.quantity) {
      changeObject.quantity = changeObject.quantity <= 0 ? 0 : changeObject.quantity
    }
    const { errors, data } = await updateSchemaElementsMutation({
      variables: { elements: [{ ...changeObject, id: oldRow.id }] },
    })

    if (errors) {
      throw new Error(errors[0].message)
    }

    const schemaElement = data?.updateSchemaElements[0]
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
    setOpenElementsFromSourceDialogId('open')
  }

  const handleCloseElementsFromSourceDialog = () => {
    setOpenElementsFromSourceDialogId('')
  }

  const handleRowUpdateFromSource = () => {
    refetchElements()
  }

  const openSourceInterpretationDialog = (id: GridRowId) => {
    setOpenInterpretationDialogId(id.toString())
    setEditInterpretationRow(sourceFiles?.find((sourceFile) => sourceFile.id === id))
  }

  const addSource = () => {
    handleCloseElementsFromSourceDialog()
    handleAddSource()
  }

  useEffect(() => {
    if (sourceId) {
      const id: GridRowId = sourceId
      openSourceInterpretationDialog(id)
    }
  }, [sourceData, sourceId])

  const unitOptions: UnitOptions = {
    [Unit.M]: 'm',
    [Unit.M2]: 'm²',
    [Unit.M3]: 'm³',
    [Unit.Kg]: 'kg',
    [Unit.Pcs]: 'pcs',
  }

  const CustomTypeEditComponent = (props: GridEditSingleSelectCellProps) => {
    const [search, setSearch] = useState(props.valueLabel || '')
    const apiRef = useGridApiContext()

    const handleValueChange = async (
      event: MuiEvent<SyntheticEvent>,
      value: {
        value: string
        label: string
      } | null,
    ) => {
      const assembly = sortedAssemblies.find((assembly) => assembly.id === value?.value)

      await apiRef.current.setEditCellValue({
        id: props.id,
        field: 'assemblyId',
        value: assembly?.id,
      })
      await apiRef.current.setEditCellValue({
        id: props.id,
        field: 'unit',
        value: assembly?.unit.toUpperCase(),
      })
    }

    const assemblyName = useMemo(
      () => sortedAssemblies.find((assembly) => assembly.id === props.value)?.name || '',
      [props.value],
    )

    return (
      <Autocomplete
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={assemblyName}
        inputValue={search}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue)
        }}
        id='EPD box'
        options={sortedAssemblies.map((assembly) => ({ value: assembly.id, label: assembly.name })) || []}
        fullWidth
        onChange={handleValueChange}
        renderInput={(params) => <TextField {...params} sx={{ marginTop: 1 }} />}
      />
    )
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, editable: false },
    {
      field: 'schemaCategory',
      headerName: 'Subclass',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: schemaCategories.map((child) => ({ value: child.id, label: child.name as string })),
      valueGetter: (param) => {
        return param.value?.id
      },
      valueFormatter: (params) => {
        return rows.find((row) => row.id == params.id)?.schemaCategory?.name
      },
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
      field: 'assemblyId',
      headerName: 'Assembly',
      flex: 2.0,
      editable: true,
      // type: 'singleSelect',
      // valueOptions: sorted_assemblies.map((assembly) => ({ value: assembly.id, label: assembly.name })),
      renderEditCell: (params) => (
        <CustomTypeEditComponent
          {...params}
          valueLabel={sortedAssemblies.find((assembly) => assembly.id == params.value)?.name}
        />
      ),
      valueFormatter: (params) => {
        return assemblies?.find((assembly) => assembly.id === params.value)?.name
      },
    },
    {
      ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
      renderCell: (params) => {
        const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit
        const disabled = isInEditMode ? '' : params.row.assemblyId
        return <CustomDetailPanelToggle id={disabled} value={params.value} />
      },
    },
    {
      field: 'result',
      headerName: 'Result',
      flex: 1.5,
      type: 'number',
      description: 'kgCO₂Eq',
      valueFormatter: (params: GridValueFormatterParams<{ [key: string]: { [key: string]: number } }>) => {
        return `${
          params.value?.gwp
            ? Object.values(params.value.gwp)
                .reduce((sum, current) => sum + current, 0)
                .toFixed(2)
            : 'Not Counted' // (0).toFixed(2)
        }` // kgCO₂Eq
      },
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
            <GridActionsCellItem
              key={0}
              icon={<SaveIcon />}
              label='Save'
              onClick={handleSaveClick(id)}
              placeholder={''}
            />,
            <GridActionsCellItem
              key={1}
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
              placeholder={''}
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
            placeholder={''}
          />,
          <GridActionsCellItem
            key={3}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
            placeholder={''}
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
            placeholder={''}
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
      renderCell: (params) => {
        if (params.id === '') {
          return null
        }
        return (
          <Radio
            name='select-ref-to-add-task-to'
            checked={params.id === refToAddTaskTo?.id}
            value={params.id}
            onChange={handleChangeSelectedTask}
            size='small'
          />
        )
      },
    },
  ]

  if (!Array.isArray(category)) {
    columns.splice(1, 0, {
      field: 'classification',
      headerName: 'Class',
      flex: 1,
      valueFormatter: () => category.name,
    })
  }

  const getDetailPanelContent = useCallback(({ row }: GridRowParams) => {
    return <AssemblyDetail assembly={row.assembly} />
  }, [])

  const getDetailPanelHeight = useCallback(() => 'auto', [])

  return (
    <div style={{ height: Array.isArray(category) ? 'auto' : 400, width: '100%' }}>
      <DataGridPro
        autoHeight={Array.isArray(category) ? true : false}
        columns={columns}
        rows={rows}
        editMode='row'
        loading={false}
        columnVisibilityModel={{
          id: false,
          selectRow: isAddingTasks,
          result: !!projectData?.projects[0].metaFields.lcaResults,
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
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
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
        addSource={addSource}
        category={Array.isArray(category) ? schemaCategories : category}
        unitOptions={unitOptions}
        handleRowUpdateFromSource={handleRowUpdateFromSource}
      />
      <SourceDialog
        openDialog={openSourceDialog}
        handleDialogClose={handleSourceDialogClose}
        projectId={projectId}
        editRow={editRow}
        setEditRow={setEditRow}
        setSourceId={setSourceId}
      />
      <SourceInterpretationDialog
        openDialog={openInterpretationDialogId !== '' && !!editInterpretationRow}
        handleDialogClose={handleInterpretationDialogClose}
        editRow={editInterpretationRow}
        setEditRow={setEditInterpretationRow}
        setSourceId={setSourceId}
      />
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
        placeholder={''}
      />
      <GridToolbarFilterButton sx={{ color, fontWeight }} placeholder={''} />
      <Tooltip title='Add new building component'>
        <IconButton aria-label='addSource' onClick={handleAddRow} sx={{ color }}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Add building components from a source'>
        <IconButton
          aria-label='addMultipleSourceElements'
          onClick={handleOpenMultipleElementsDialog}
          sx={{ color }}
          data-testid='addMultipleSourceElementsButton'
        >
          <ControlPointDuplicateOutlinedIcon />
        </IconButton>
      </Tooltip>
    </GridToolbarContainer>
  )
}

const CustomDetailPanelToggle = (props: Pick<GridRenderCellParams, 'id' | 'value'>) => {
  const { id, value: isExpanded } = props

  return (
    <IconButton size='small' tabIndex={-1} disabled={!id} aria-label={isExpanded ? 'Close' : 'Open'}>
      <ExpandMoreIcon
        sx={{
          transform: `rotateZ(${isExpanded ? 180 : 0}deg)`,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        }}
        fontSize='inherit'
      />
    </IconButton>
  )
}
