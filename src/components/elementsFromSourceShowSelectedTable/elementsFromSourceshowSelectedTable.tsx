import { Checkbox, SelectChangeEvent, Typography } from '@mui/material'
import {
  DataGridPro,
  GridColumns,
  GridEditSingleSelectCell,
  GridEditSingleSelectCellProps,
  useGridApiContext,
} from '@mui/x-data-grid-pro'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Unit } from '../../dataAccess'
import { SourceRow } from '../addElementFromSourceDialog'
import { UnitOptions } from '../schemaElementsTable'
import { SourceData } from '../sourceInterpretationDialog/types'

type ElementsFromSourceShowSelectedTableProps = {
  selectedRows: SourceRow[]
  handleChangeSelectedRow: (rowId: string) => void
  handleChangeAllSelectedRows: () => void
  selectedSourceFile: SourceData
  selectedSource: SourceData | undefined
  unitOptions: UnitOptions
  setSelectedInterpretationRows: Dispatch<SetStateAction<SourceInterpretationRow[]>>
}

export interface SourceInterpretationRow {
  id: string
  unit: Unit
  quantity: number

  [key: string]: string | number
}

export const decorateRow = (row: SourceRow, unitValue?: string, quantityValue?: number): SourceInterpretationRow => ({
  ...row,
  id: row.id,
  unit: (unitValue as Unit) ?? Unit.None,
  quantity: quantityValue || 0.0,
})

export const ElementsFromSourceShowSelectedTable = ({
  selectedRows,
  handleChangeSelectedRow,
  selectedSourceFile,
  selectedSource,
  handleChangeAllSelectedRows,
  unitOptions,
  setSelectedInterpretationRows,
}: ElementsFromSourceShowSelectedTableProps) => {
  const initialRows = getInitialRows()
  const [rows, setRows] = useState<SourceInterpretationRow[]>(initialRows)

  useEffect(() => {
    if (selectedSourceFile) {
      if (!rows?.length) {
        const initialRows = getInitialRows()
        setRows(initialRows)
      } else {
        const decoratedRows = selectedRows.map((selectedRow) => {
          // If selectedRow exists in local rows, then it has already been decorated, and we must persist the quantity and unit
          const decoratedRow = rows.find((row) => row.id === selectedRow.id)
          if (!decoratedRow) {
            // No default values for selectedRow exists, let's decorate it
            const { unitValue, quantityValue } = getDefaultInterpretationRowValues(selectedRow)
            return decorateRow(selectedRow, unitValue, Number(quantityValue))
          } else {
            return decorateRow(selectedRow, decoratedRow?.unit, decoratedRow?.quantity)
          }
        })
        setRows(decoratedRows)
      }
    }
  }, [selectedRows])

  useEffect(() => {
    if (rows.length) {
      // Update parent component version of interpretation rows, to be used for mutation
      setSelectedInterpretationRows(rows)
    }
  }, [rows])

  function getInitialRows(): SourceInterpretationRow[] {
    return selectedRows.map((row) => {
      const { unitValue, quantityValue } = getDefaultInterpretationRowValues(row)
      return decorateRow(row, unitValue, Number(quantityValue))
    })
  }

  function getDefaultInterpretationRowValues(row: SourceRow) {
    const unitValue = Object.keys(unitOptions).find((key) => {
      if (selectedSource && key in selectedSource.interpretation && selectedSource.interpretation[key]) {
        return selectedSource.interpretation[key]
      }
    })
    const interpretationQuantityForUnit = selectedSource?.interpretation[unitValue ?? '']
    const quantityValue = row[interpretationQuantityForUnit]
    return { unitValue, quantityValue }
  }

  const columns: GridColumns = [
    {
      field: 'checkbox',
      headerName: '',
      flex: 0.25,
      sortable: false,
      hideSortIcons: true,
      disableReorder: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isRowSelected = !!selectedRows.find((row) => row.id == params.row.id)
        return (
          <Checkbox
            checked={isRowSelected}
            title={'Click to deselect this row for the selected parameter for id: ' + params.row.id}
            onChange={() => handleChangeSelectedRow(params.row.id)}
          />
        )
      },
      renderHeader: () => {
        const isRowSelected = !!selectedRows.length
        const isAllRowsSelected = selectedRows.length === selectedSourceFile.data?.rows.length
        const isSomeRowsSelected = isRowSelected && selectedRows.length !== selectedSourceFile.data?.rows.length
        return isRowSelected ? (
          <Checkbox
            checked={isAllRowsSelected}
            indeterminate={isSomeRowsSelected}
            title={'Click to select all rows'}
            onChange={() => handleChangeAllSelectedRows()}
          />
        ) : (
          ''
        )
      },
    },
    {
      field: 'interpretationName',
      headerName: 'Name',
      flex: 1,
      valueFormatter: (params) => {
        const selectedRow = selectedRows.find((row) => row.id === params.id)
        if (!selectedRow) {
          return params.value
        }
        const interpretationValue = selectedSource?.interpretation[params.field]
        const valueToShow = selectedRow[interpretationValue]
        return valueToShow
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
    },
    {
      field: 'unit',
      headerName: 'Unit',
      type: 'singleSelect',
      flex: 1,
      editable: true,

      valueOptions: () => {
        return Object.entries(unitOptions)
          .map(([key, value]) => {
            // Filter out units, which have falsy value in source interpretation
            if (selectedSource && key in selectedSource.interpretation && selectedSource.interpretation[key]) {
              return { value: key, label: value }
            } else {
              return { value: '', label: '' }
            }
          })
          .filter((elem) => elem?.label)
      },
      valueFormatter: (params) => unitOptions[params.value as keyof typeof unitOptions],
      renderEditCell: (params) => (
        <UnitEditComponent
          {...params}
          sourceInterpretationRows={rows}
          selectedSource={selectedSource}
          setRows={setRows}
        />
      ),
    },
    {
      field: 'source',
      headerName: 'Source',
      renderCell: () => {
        return (
          <Typography>
            {selectedSource?.type}: {selectedSource?.name}
          </Typography>
        )
      },
      flex: 1,
    },
  ]

  return selectedSourceFile ? (
    <div style={{ height: 600, width: '100%' }} data-testid='elements-from-source-show-selected-table'>
      <DataGridPro
        columns={columns}
        rows={rows}
        loading={!(selectedSourceFile && rows)}
        columnVisibilityModel={{
          id: false,
        }}
      />
    </div>
  ) : null
}

export interface UnitEditComponentProps extends GridEditSingleSelectCellProps {
  sourceInterpretationRows: SourceInterpretationRow[]
  selectedSource: SourceData | undefined
  setRows: Dispatch<SetStateAction<SourceInterpretationRow[]>>
}

export const UnitEditComponent = (props: UnitEditComponentProps) => {
  const apiRef = useGridApiContext()

  const handleValueChange = async (event: SelectChangeEvent<string>, newUnitValue: string) => {
    const { id, sourceInterpretationRows, selectedSource, setRows } = props
    const rowId = id
    const selectedRow = sourceInterpretationRows.find((row) => row.id === rowId)
    if (!selectedRow) {
      console.log('selectedRow in UnitEditComponent.handleValueChange() is falsy | value is:', selectedRow)
      return
    }
    const interpretationQuantityForUnit = selectedSource?.interpretation[newUnitValue]
    const newQuantityValue = Number(selectedRow[interpretationQuantityForUnit])

    const decoratedRows = sourceInterpretationRows.map((row) =>
      row.id === rowId ? decorateRow(row as unknown as SourceRow, newUnitValue, newQuantityValue) : row,
    )
    setRows(decoratedRows)

    await apiRef.current.setEditCellValue({
      id: rowId,
      field: 'quantity',
      value: newQuantityValue,
    })
  }

  return <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />
}
