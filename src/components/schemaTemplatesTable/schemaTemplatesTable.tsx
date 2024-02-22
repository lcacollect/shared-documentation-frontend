import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, AlertProps, LinearProgress, Snackbar } from '@mui/material'
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
  GridValueGetterParams,
} from '@mui/x-data-grid-pro'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { GraphQlSchemaTemplate, useDeleteSchemaTemplateMutation, GetSchemaTemplatesDocument } from '../../dataAccess'
import { AddTypecodeDialog } from '../addTypecodeDialog'
import { CreateTemplateDialog } from '../createTemplateDialog'
import { NoRowsOverlay } from '@lcacollect/components'

interface Categories {
  id: string
  name: string
  path: string
  depth: number
}

interface ReportingSchema {
  id: string
  name: string
  categories: Categories[]
}

export interface SchemaTemplate {
  id: string
  name: string
  schemas: ReportingSchema[] | undefined
}

interface SchemaTemplatesTableProps {
  schemaTemplates: GraphQlSchemaTemplate[]
  loading: boolean
  openCreateTemplateDialog: boolean
  setOpenCreateTemplateDialog: Dispatch<SetStateAction<boolean>>
  openAddTypecodeDialog: boolean
  setOpenAddTypecodeDialog: Dispatch<SetStateAction<boolean>>
}

export const SchemaTemplatesTable = (props: SchemaTemplatesTableProps) => {
  const {
    schemaTemplates,
    loading,
    openCreateTemplateDialog,
    setOpenCreateTemplateDialog,
    openAddTypecodeDialog,
    setOpenAddTypecodeDialog,
  } = props
  const [deleteSchemaTemplate] = useDeleteSchemaTemplateMutation({
    refetchQueries: [{ query: GetSchemaTemplatesDocument }],
  })
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [editTemplate, setEditTemplate] = useState<SchemaTemplate | null | undefined>()
  const [rows, setRows] = useState<GridRowModel<SchemaTemplate[]>>([])

  useEffect(() => {
    if (schemaTemplates) {
      setRows(schemaTemplates as SchemaTemplate[])
    }
  }, [schemaTemplates])

  const handleCreateTemplateDialogClose = () => {
    setEditTemplate(null)
    setOpenCreateTemplateDialog(false)
  }

  const handleAddTypecodeDialogClose = () => {
    setOpenAddTypecodeDialog(false)
  }

  const handleDeleteClick = async (id: GridRowId) => {
    setSnackbar({ children: 'Deleting template...', severity: 'info' })
    const { errors } = await deleteSchemaTemplate({
      variables: { id: id as string },
    })
    if (errors) {
      errors.forEach((error) => console.error(error))
      setSnackbar({ children: errors[0].message, severity: 'error' })
    } else {
      setSnackbar({ children: 'Template deleted!', severity: 'success' })
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setEditTemplate(schemaTemplates?.find((template) => template.id === id) as unknown as SchemaTemplate)
    setOpenCreateTemplateDialog(true)
  }

  const getTypecode = (cell: GridValueGetterParams) => {
    return cell.row.schemas[0]?.name
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
            placeholder={''}
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => handleDeleteClick(id)}
            color='inherit'
            placeholder={''}
          />,
        ]
      },
    },
  ]

  return (
    <div style={{ height: 600, width: '100%' }} data-testid='templates-table'>
      <DataGridPro
        aria-label='templates-table'
        loading={loading}
        rows={rows}
        columns={columns}
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
        open={openCreateTemplateDialog}
        handleClose={handleCreateTemplateDialogClose}
        editTemplate={editTemplate}
        setEditTemplate={setEditTemplate}
      />
      <AddTypecodeDialog open={openAddTypecodeDialog} handleClose={handleAddTypecodeDialogClose} />
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
