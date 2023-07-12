import { useState, useEffect } from 'react'
import { GraphQlAssembly } from '../../dataAccess'
import { Typography, Divider } from '@mui/material'
import { DataGrid, GridRowModel, GridColumns } from '@mui/x-data-grid'

interface AssemblyDetailProps {
  assembly: GraphQlAssembly | undefined
}

interface AssemblyLayer {
  id: string
  name: string
  conversion: string
  conversionFactor: number
  epdName: string
  referenceServiceLife: number | null
  description: string
}

export const AssemblyDetail = (props: AssemblyDetailProps) => {
  const { assembly } = props

  const [rows, setRows] = useState<GridRowModel<AssemblyLayer[]>>([])

  useEffect(() => {
    if (assembly && assembly.layers) setRows(assembly.layers as unknown as AssemblyLayer[])
  }, [assembly])

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, hide: true },
    {
      field: 'name',
      flex: 1,
      sortable: false,
      renderHeader: () => <strong>{'Part'}</strong>,
    },
    {
      field: 'conversionFactor',
      // headerName: 'Factor',
      flex: 0.5,
      type: 'number',
      sortable: false,
      renderHeader: () => <strong>{'Factor'}</strong>,
    },
    {
      field: 'epdName',
      sortable: false,
      flex: 2,
      type: 'string',
      renderHeader: () => <strong>{'Environmental Data'}</strong>,
    },
    {
      field: 'referenceServiceLife',
      flex: 0.7,
      sortable: false,
      type: 'number',
      renderHeader: () => <strong>{'RSL'}</strong>,
    },
    {
      field: 'description',
      flex: 1.5,
      sortable: false,
      type: 'string',
      renderHeader: () => <strong>{'Description'}</strong>,
    },
  ]

  return assembly ? (
    <>
      <Typography variant='h6' sx={{ fontSize: '1rem', marginBottom: '10px', marginTop: '20px' }}>
        category: <b>{assembly.category}</b>&nbsp;&nbsp; description: <b>{assembly.description}</b>&nbsp;&nbsp; life
        time: <b>{assembly.lifeTime}</b>&nbsp;&nbsp; conversion factor: <b>{assembly.conversionFactor}</b>&nbsp;&nbsp;
      </Typography>
      <DataGrid
        autoHeight={true}
        columns={columns}
        rows={rows}
        hideFooter={true}
        rowHeight={25}
        sx={{
          marginBottom: '50px',
        }}
      />
      <Divider />
    </>
  ) : null
}
