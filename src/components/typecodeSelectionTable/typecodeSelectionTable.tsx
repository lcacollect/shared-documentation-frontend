import { DataGridPro, GridColumns, GridRowModel } from '@mui/x-data-grid-pro'
import { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { GraphQlTypeCodeElement } from '../../dataAccess'

interface TypecodeSelectionTableProps {
  selectedRows: GraphQlTypeCodeElement[]
  handleChangeSelectedRow: (row: GraphQlTypeCodeElement) => void
  handleChangeAllSelectedRows: () => void
  typeCodeData: GraphQlTypeCodeElement[] | undefined
  typeCodeLoading: boolean
}

export const TypecodeSelectionTable = (props: TypecodeSelectionTableProps) => {
  const { selectedRows, handleChangeSelectedRow, handleChangeAllSelectedRows, typeCodeData, typeCodeLoading } = props

  const [rows, setRows] = useState<GridRowModel<GraphQlTypeCodeElement[]>>([])

  useEffect(() => {
    setRows(typeCodeData as unknown as GraphQlTypeCodeElement[])
  }, [typeCodeData])

  const handleOnChangeCheckbox = (row: GraphQlTypeCodeElement) => {
    handleChangeSelectedRow(row)
  }

  const columns: GridColumns = [
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
            onChange={() => handleOnChangeCheckbox(params.row)}
          />
        )
      },
      renderHeader: () => {
        const isAllRowsSelected = selectedRows.length === 1
        const isSomeRowsSelected = !!selectedRows.length && selectedRows.length !== 0
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
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      type: 'string',
    },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
      type: 'string',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      type: 'string',
    },
    {
      field: 'level',
      headerName: 'Level',
      flex: 1,
      type: 'string',
    },
    {
      field: 'parentPath',
      headerName: 'Path',
      flex: 1,
      type: 'string',
    },
  ]

  return (
    <>
      <div style={{ height: 600, width: '100%' }} data-testid='type-code-selection-table'>
        <DataGridPro columnVisibilityModel={{ id: false }} columns={columns} rows={rows} loading={typeCodeLoading} />
      </div>
    </>
  )
}
