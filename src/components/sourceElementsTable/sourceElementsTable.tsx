import { Alert, AlertProps, Checkbox, LinearProgress, Snackbar } from '@mui/material'
import { DataGridPro, GridColumnHeaderParams, GridColumns } from '@mui/x-data-grid-pro'
import { ParameterColumnMapping } from 'components/sourceInterpretationDialog'
import { Dispatch, SetStateAction, useState } from 'react'
import { GraphQlProjectSourceFile } from '../../dataAccess'
import { NoRowsOverlay } from '@lcacollect/components'

interface SourceElementsTableProps {
  setEditRow: Dispatch<SetStateAction<GraphQlProjectSourceFile | null | undefined>>
  editRow: GraphQlProjectSourceFile
  handleUpdateSelectedColumn: (newColumn: string) => void
  selectedParameter: string
  parameterColumnMapping: ParameterColumnMapping
}

export const SourceElementsTable = ({
  editRow,
  handleUpdateSelectedColumn,
  selectedParameter,
  parameterColumnMapping,
}: SourceElementsTableProps) => {
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const handleCloseSnackbar = () => setSnackbar(null)

  const rows = editRow?.rows || []

  const isColumnSelected = (columnName: string) => Object.values(parameterColumnMapping).includes(columnName)

  const handleChangeSelectedColumn = (field: string) => () => {
    if (isColumnSelected(field)) {
      handleUpdateSelectedColumn('')
    } else {
      handleUpdateSelectedColumn(field)
    }
  }

  const Header = (params: GridColumnHeaderParams) => {
    const columnHeader = params.field
    const isColumnInMapping = isColumnSelected(columnHeader)
    const currentColumnForSelectedParameter = parameterColumnMapping[selectedParameter]
    const isCurrentColumn = columnHeader === currentColumnForSelectedParameter
    return (
      <div>
        <Checkbox
          checked={isColumnInMapping}
          disabled={isColumnInMapping && !isCurrentColumn}
          title={
            currentColumnForSelectedParameter
              ? isColumnInMapping
                ? 'Click to deselect this column for the selected parameter'
                : 'Column is disabled since it was selected for another parameter'
              : 'Click to select this column for the selected parameter'
          }
          onChange={handleChangeSelectedColumn(params.field)}
        />
        {params.colDef.headerName}
      </div>
    )
  }

  const columns: GridColumns = editRow.headers.map((header: string) => {
    return { field: header, headerName: header, flex: 1, sortable: false, renderHeader: Header }
  })

  return (
    <div style={{ height: 400 }} data-testid='sources-elements-table'>
      <DataGridPro
        rows={rows}
        sx={{ border: 0 }}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay }}
        componentsProps={{
          noRowsOverlay: { text: 'No elements in source' },
        }}
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
