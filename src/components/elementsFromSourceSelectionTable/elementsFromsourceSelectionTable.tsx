import { DataGridPro, GridColumns } from '@mui/x-data-grid-pro'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { SourceRow } from '../addElementFromSourceDialog'
import { SourceData } from '../sourceInterpretationDialog/types'

type ElementsFromSourceSelectionTableProps = {
  selectedRows: SourceRow[]
  handleChangeSelectedRow: (rowId: string) => void
  handleChangeAllSelectedRows: () => void
  selectedSourceFile?: SourceData
  setSelectedSourceFile: Dispatch<SetStateAction<SourceData | undefined>>
}

export const ElementsFromSourceSelectionTable = ({
  selectedRows,
  handleChangeSelectedRow,
  handleChangeAllSelectedRows,
  selectedSourceFile,
}: ElementsFromSourceSelectionTableProps) => {
  const [rows, setRows] = useState<SourceRow[]>([])

  useEffect(() => {
    setRows(selectedSourceFile?.data?.rows || [])
  }, [selectedSourceFile])

  const handleOnChangeCheckbox = (rowId: string) => {
    handleChangeSelectedRow(rowId)
  }

  const checkboxColumn: GridColumns = [
    {
      field: 'checkbox',
      flex: 0.25,
      sortable: false,
      hideSortIcons: true,
      disableReorder: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isRowSelected = !!selectedRows.find((row) => row?.id == params.row.id)
        return (
          <Checkbox
            checked={isRowSelected}
            title={'Click to (de)select this row'}
            onChange={() => handleOnChangeCheckbox(params.row.id)}
          />
        )
      },
      renderHeader: () => {
        const isAllRowsSelected = selectedRows.length === selectedSourceFile?.data?.rows.length
        const isSomeRowsSelected =
          !!selectedRows.length && selectedRows.length !== selectedSourceFile?.data?.rows.length
        return (
          <Checkbox
            checked={isAllRowsSelected}
            indeterminate={isSomeRowsSelected}
            title={'Click to (de)select all rows'}
            onChange={() => handleChangeAllSelectedRows()}
          />
        )
      },
    },
  ]
  const headerColumns: GridColumns = useMemo(
    () =>
      selectedSourceFile?.data?.headers.map((header: string) => ({
        field: header,
        headerName: header,
        flex: 1,
      })) || [],
    [selectedSourceFile],
  )
  const columns = checkboxColumn.concat(headerColumns)

  return (
    <>
      {selectedSourceFile && rows.length ? (
        <div style={{ height: 600, width: '100%' }} data-testid='elements-from-source-selection-table'>
          <DataGridPro
            columns={columns}
            rows={rows}
            loading={!(selectedSourceFile && rows)}
            columnVisibilityModel={{
              id: false,
            }}
          />
        </div>
      ) : null}
    </>
  )
}
