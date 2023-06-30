import { formatStringAsDate } from '@lcacollect/core'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { Alert, AlertProps, LinearProgress, Snackbar } from '@mui/material'
import { DataGridPro, GridActionsCellItem, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid-pro'
import React, { useState } from 'react'
import {
  GetProjectSourcesDocument,
  GraphQlProjectSource,
  Unit,
  useDeleteProjectSourceMutation,
  useGetProjectSchemasWithCategoriesLazyQuery,
  useGetProjectSourcesQuery,
} from '../../dataAccess'
import { DataFetchWrapper, GraphQlSchemaCategory, NoRowsOverlay } from '@lcacollect/components'
import { useParams } from 'react-router-dom'
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined'
import { AddElementsFromSourceDialog } from '../addElementFromSourceDialog'
import { UnitOptions } from '../schemaElementsTable'

export interface ProjectSource extends Omit<GraphQlProjectSource, 'projectId' | 'authorId' | 'author'> {
  author: { name: string }
}

export const SourceTable = () => {
  const { projectId = '' } = useParams()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [openElementsFromSourceDialog, setOpenElementsFromSourceDialog] = useState<boolean>(false)
  const { data, error, loading } = useGetProjectSourcesQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })
  const projectSources = data?.projectSources

  const [getProjectCategories, { data: categoriesData }] = useGetProjectSchemasWithCategoriesLazyQuery({
    variables: { projectId: projectId as string },
  })
  const [deleteProjectSource] = useDeleteProjectSourceMutation()
  const handleCloseSnackbar = () => setSnackbar(null)

  const handleDeleteClick = async (id: GridRowId) => {
    const { errors } = await deleteProjectSource({
      variables: { id: id as string },
      refetchQueries: [GetProjectSourcesDocument],
    })
    if (errors) {
      errors.forEach((error) => console.error(error))
      setSnackbar({ children: errors[0].message, severity: 'error' })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 3 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'author',
      headerName: 'Uploaded By',
      flex: 2,
      valueFormatter: (cell: GridValueFormatterParams) => cell.value?.name || '',
    },
    { field: 'status', headerName: 'Status', flex: 1, valueFormatter: () => 'Uploaded' },
    {
      field: 'updated',
      headerName: 'Last Updated',
      flex: 2,
      valueFormatter: (cell: GridValueFormatterParams) => formatStringAsDate(cell.value).toDateString(),
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
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => handleDeleteClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={1}
            icon={<ControlPointDuplicateOutlinedIcon />}
            label='Add building components from the source'
            onClick={() => {
              getProjectCategories()
              setOpenElementsFromSourceDialog(true)
            }}
            color='inherit'
          />,
        ]
      },
    },
  ]

  const unitOptions: UnitOptions = {
    [Unit.M]: 'm',
    [Unit.M2]: 'm²',
    [Unit.M3]: 'm³',
    [Unit.Kg]: 'kg',
    [Unit.Pcs]: 'pcs',
  }

  const getSchemCategories = () => {
    const categories = categoriesData?.reportingSchemas[0]?.categories
    return categories?.filter((child) => child.depth === 2)
  }

  return (
    <div style={{ height: 400 }} data-testid='sources-table'>
      <DataFetchWrapper error={error}>
        <DataGridPro
          loading={loading}
          rows={projectSources || []}
          sx={{ border: 0 }}
          columnVisibilityModel={{ id: false }}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay }}
          componentsProps={{
            noRowsOverlay: { text: 'No sources added' },
          }}
        />
        <AddElementsFromSourceDialog
          open={openElementsFromSourceDialog}
          handleClose={() => setOpenElementsFromSourceDialog(false)}
          addSource={() => undefined}
          category={(getSchemCategories() as unknown as GraphQlSchemaCategory[]) || []}
          unitOptions={unitOptions}
          handleRowUpdateFromSource={() => undefined}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </DataFetchWrapper>
    </div>
  )
}
