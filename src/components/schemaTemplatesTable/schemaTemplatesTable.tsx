import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, AlertProps, LinearProgress, Snackbar } from '@mui/material'
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid-pro'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { GraphQlReportingSchema, GraphQlSchemaTemplate, useDeleteSchemaTemplateMutation } from '../../dataAccess'
import { AddTypecodeDialog } from '../addTypecodeDialog'
import { CreateTemplateDialog } from '../createTemplateDialog'
import { NoRowsOverlay } from '@lcacollect/components'

type SimplifiedSchema = Omit<GraphQlReportingSchema, 'projectId'>

export interface SchemaTemplate extends Omit<GraphQlSchemaTemplate, 'schema'> {
  schema?: SimplifiedSchema | null | undefined
}

interface SchemaTemplatesTableProps {
  schemaTemplates: SchemaTemplate[] | null | undefined
  loading: boolean
  openCreateTemplateDialogId: string
  setOpenCreateTemplateDialogId: Dispatch<SetStateAction<string>>
  openAddTypecodeDialog: boolean
  setOpenAddTypecodeDialog: Dispatch<SetStateAction<boolean>>
}

export const SchemaTemplatesTable = (props: SchemaTemplatesTableProps) => {
  const {
    schemaTemplates,
    loading,
    openCreateTemplateDialogId,
    setOpenCreateTemplateDialogId,
    openAddTypecodeDialog,
    setOpenAddTypecodeDialog,
  } = props
  const [deleteSchemaTemplate] = useDeleteSchemaTemplateMutation()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [editRow, setEditRow] = useState<SchemaTemplate | null | undefined>()

  const rows = useMemo(() => schemaTemplates, [schemaTemplates])

  const handleRowClick = (params: GridRowParams<GraphQlSchemaTemplate>) => {
    setOpenCreateTemplateDialogId(params.row.id)
  }

  const handleCreateTemplateDialogClose = () => {
    setOpenCreateTemplateDialogId('')
  }

  const handleAddTypecodeDialogClose = () => {
    setOpenAddTypecodeDialog(false)
  }

  const handleDeleteClick = async (id: GridRowId) => {
    setSnackbar({ children: 'Deleting template...', severity: 'info' })
    return
    // const { errors } = await deleteSchemaTemplate({
    //   variables: { id: id as string },
    //   refetchQueries: [GetSchemaTemplatesDocument],
    // })
    // if (errors) {
    //   errors.forEach((error) => console.error(error))
    //   setSnackbar({ children: errors[0].message, severity: 'error' })
    // }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setOpenCreateTemplateDialogId(id.toString())
    setEditRow(schemaTemplates?.find((template) => template.id === id))
  }

  const getTypecode = (cell: GridValueGetterParams) => {
    return cell.row.schema.name
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      align: 'left',
      headerName: 'Name',
      flex: 2,
    },
    {
      field: 'typecode',
      align: 'left',
      headerName: 'Typecode',
      valueGetter: getTypecode,
      flex: 1.25,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }: { id: GridRowId }) => {
        return [
          <GridActionsCellItem
            key={0}
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => handleDeleteClick(id)}
            color='inherit'
          />,
        ]
      },
    },
  ]

  return (
    <div style={{ height: 600, width: '100%' }} data-testid='tasks-table'>
      <DataGridPro
        aria-label='tasks-table'
        loading={loading}
        rows={rows || []}
        columns={columns}
        onRowClick={handleRowClick}
        components={{ LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay }}
        componentsProps={{
          noRowsOverlay: { text: 'No templates added' },
        }}
        columnVisibilityModel={{ id: false }}
        sx={{
          border: 0,
          '.MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
      />
      <CreateTemplateDialog
        open={!!rows && !!openCreateTemplateDialogId}
        templateId={openCreateTemplateDialogId}
        handleClose={handleCreateTemplateDialogClose}
        editRow={editRow}
        setEditRow={setEditRow}
        loading={loading}
      />
      <AddTypecodeDialog open={!!rows && !!openAddTypecodeDialog} handleClose={handleAddTypecodeDialogClose} />
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
    </div>
  )
}
