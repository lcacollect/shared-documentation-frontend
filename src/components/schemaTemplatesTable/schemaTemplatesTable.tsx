import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, AlertProps, LinearProgress, Snackbar } from '@mui/material'
import { DataGridPro, GridActionsCellItem, GridColumns, GridRowId, GridRowModel } from '@mui/x-data-grid-pro'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { GraphQlSchemaTemplate, useDeleteSchemaTemplateMutation, GetSchemaTemplatesDocument } from '../../dataAccess'
import { AddTypecodeDialog } from '../addTypecodeDialog'
import { CreateTemplateDialog } from '../createTemplateDialog'
import { NoRowsOverlay } from '@lcacollect/components'
import { useSettingsContext } from '@lcacollect/core'

interface TypeCodeElement {
  id: string
  code: string
  name: string
  level: number
  parentPath: string
}

interface Categories {
  id: string
  typeCodeElement: TypeCodeElement
}

interface ReportingSchema {
  id: string
  name: string
  categories: Categories[]
}

export interface SchemaTemplate {
  id: string
  name: string
  original: ReportingSchema | undefined
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

  const { domainName } = useSettingsContext()

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

  // const getTypecode = (cell: GridValueGetterParams) => {
  //   return cell.row.original.name
  // }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      align: 'left',
      headerName: 'Name',
      flex: 2,
    },
    {
      field: 'domain',
      align: 'left',
      headerName: 'Domain',
      flex: 1.25,
    },
    // {
    //   field: 'typecode',
    //   align: 'left',
    //   headerName: 'Typecode',
    //   valueGetter: getTypecode,
    //   flex: 1.25,
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }: { id: GridRowId }) => {
        const template = schemaTemplates?.find((template) => template.id === id)
        const disabled = template?.domain !== domainName
        return [
          <GridActionsCellItem
            key={0}
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            disabled={disabled}
            color='inherit'
            placeholder={''}
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => handleDeleteClick(id)}
            disabled={disabled}
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
      <AddTypecodeDialog
        open={openAddTypecodeDialog}
        handleClose={handleAddTypecodeDialogClose}
        domain={domainName || ''}
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
    </div>
  )
}
