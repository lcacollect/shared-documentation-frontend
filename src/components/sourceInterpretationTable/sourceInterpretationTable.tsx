import { formatStringAsDate } from '@lcacollect/core'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, AlertProps, LinearProgress, Snackbar } from '@mui/material'
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid-pro'
import { Dispatch, SetStateAction, useState } from 'react'
import { ProjectSource, SourceInterpretationDialog } from '../../components'
import { GraphQlProjectSourceFile, Unit, useGetProjectSourceFilesQuery } from '../../dataAccess'
import { NoRowsOverlay } from '@lcacollect/components'

interface SourceInterpretationTableProps {
  setEditRow: Dispatch<SetStateAction<ProjectSource | null | undefined>>
  projectSources?: ProjectSource[]
  loading?: boolean
}

export const SourceInterpretationTable = (props: SourceInterpretationTableProps) => {
  const { projectSources, loading } = props
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [openInterpretationDialogId, setOpenInterpretationDialogId] = useState('')
  const [editRow, setEditRow] = useState<GraphQlProjectSourceFile | null | undefined>()

  const handleCloseSnackbar = () => setSnackbar(null)
  const dataIds = projectSources?.map((source) => source.dataId ?? '')

  const { data: sourceFilesData, loading: sourceFilesLoading } = useGetProjectSourceFilesQuery({
    variables: {
      dataIds: dataIds,
    },
    skip: !dataIds?.length,
  })
  const sourceFiles = sourceFilesData?.projectSourceFiles

  const rows = projectSources

  const handleRowClick = (params: GridRowParams) => {
    setOpenInterpretationDialogId(params.row.id)
    const activeProjectSource = projectSources?.find((source) => source.id === params.id)
    if (activeProjectSource) {
      setEditRow(sourceFiles?.find((sourceFile) => sourceFile.dataId === activeProjectSource.dataId))
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setOpenInterpretationDialogId(id.toString())
    const activeProjectSource = projectSources?.find((source) => source.id === id)
    if (activeProjectSource) {
      setEditRow(sourceFiles?.find((sourceFile) => sourceFile.dataId === activeProjectSource.dataId))
    }
  }

  const handleInterpretationDialogClose = () => {
    setOpenInterpretationDialogId('')
  }

  const ParameterCell = (params: GridRenderCellParams) => (
    <div>{params.row.interpretation[params.field] ?? 'No reference'}</div>
  )

  const columns: GridColumns = [
    { field: 'name', headerName: 'Source', flex: 1 },
    {
      field: 'interpretationName',
      headerName: 'Name',
      flex: 1,
      renderCell: ParameterCell,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: ParameterCell,
    },
    { field: Unit.M, headerName: 'm', flex: 1, renderCell: ParameterCell },
    { field: Unit.M2, headerName: 'm²', flex: 1, renderCell: ParameterCell },
    { field: Unit.M3, headerName: 'm³', flex: 1, renderCell: ParameterCell },
    { field: Unit.Kg, headerName: 'kg', flex: 1, renderCell: ParameterCell },
    { field: Unit.Pcs, headerName: 'pcs.', flex: 1, renderCell: ParameterCell },
    {
      field: 'updated',
      headerName: 'Last Updated',
      flex: 1,
      valueFormatter: (cell) => formatStringAsDate(cell.value).toDateString(),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      cellClassName: 'actions',
      getActions: ({ id }: { id: GridRowId }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
        ]
      },
    },
  ]

  return (
    <div style={{ height: 400 }} data-testid='source-interpretation-table'>
      <DataGridPro
        loading={loading || sourceFilesLoading}
        rows={rows || []}
        rowHeight={35}
        sx={{
          border: 0,
          '.MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay }}
        componentsProps={{
          noRowsOverlay: { text: 'No sources added' },
        }}
        onRowClick={handleRowClick}
      />
      <SourceInterpretationDialog
        openDialog={openInterpretationDialogId !== '' && !!editRow}
        handleDialogClose={handleInterpretationDialogClose}
        editRow={editRow}
        setEditRow={setEditRow}
        projectSources={projectSources}
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
    </div>
  )
}
