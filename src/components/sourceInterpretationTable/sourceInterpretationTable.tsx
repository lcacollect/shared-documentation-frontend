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
import { useState } from 'react'
import { SourceInterpretationDialog } from '../../components'
import { Unit, useGetProjectSourceDataQuery } from '../../dataAccess'
import { DataFetchWrapper, NoRowsOverlay } from '@lcacollect/components'
import { useParams } from 'react-router-dom'
import { SourceData } from '../sourceInterpretationDialog/types'

export const SourceInterpretationTable = () => {
  const { projectId = '' } = useParams()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [openInterpretationDialogId, setOpenInterpretationDialogId] = useState('')
  const [editRow, setEditRow] = useState<SourceData | null | undefined>()

  const handleCloseSnackbar = () => setSnackbar(null)

  const {
    data: sourceData,
    loading: sourceDataLoading,
    error: sourceDataError,
  } = useGetProjectSourceDataQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })

  const sourceFiles = sourceData ? [...sourceData.projectSources] : undefined

  const handleRowClick = (params: GridRowParams) => {
    setOpenInterpretationDialogId(params.row.id)
    setEditRow(sourceFiles?.find((sourceFile) => sourceFile.id === params.id))
  }

  const handleEditClick = (id: GridRowId) => () => {
    setOpenInterpretationDialogId(id.toString())
    setEditRow(sourceFiles?.find((sourceFile) => sourceFile.id === id))
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

  if (!editRow) {
    sourceFiles?.map((source) => {
      const copySource = { ...source }
      let data: {
        name?: string
        description?: string
        M?: string
        M2?: string
        M3?: string
        KG?: string
        PCS?: string
      } = {}
      columns.map((column) => {
        copySource.data?.headers.map((header) => {
          if (header.toLocaleLowerCase() == column.field.toLocaleLowerCase()) {
            const fieldName = column.field
            data = { ...data, [fieldName]: header }
          }
        })
      })
      copySource.interpretation = { ...source.interpretation, ...data }
      return copySource
    })
  }

  return (
    <div style={{ height: 400 }} data-testid='source-interpretation-table'>
      <DataFetchWrapper error={sourceDataError}>
        <DataGridPro
          loading={sourceDataLoading}
          rows={sourceFiles || []}
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
