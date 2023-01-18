import { CommentsBubble, DataFetchWrapper, NoRowsOverlay } from '@lcacollect/components'
import Link from '@mui/icons-material/Link'
import { IconButton, LinearProgress } from '@mui/material'
import { DataGridPro, GridColumns, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid-pro'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraphQlTask, useGetTasksForTasksPageQuery } from '../../dataAccess'
import { TaskState } from '../taskState'
import { TaskDialog } from '../taskDialog'

export interface SimplifiedProjectMember {
  name?: string | null
  id?: string | null
}
export interface Task
  extends Omit<
    GraphQlTask,
    | 'authorId'
    | 'author'
    | 'commits'
    | 'dueDate'
    | 'reportingSchema'
    | 'assignee'
    | 'assignedGroup'
    | 'comments'
    | 'item'
  > {
  author: SimplifiedProjectMember
  assignee?: SimplifiedProjectMember | null
  assignedGroup?: SimplifiedProjectMember | null
  comments?: { id: string; text: string; authorId: string; task: { id: string } }[] | null
  item: { __typename: string; id: string; name: string }
}

interface TasksTableProps {
  reportingSchemaId: string | null | undefined
}

export const TasksTable = (props: TasksTableProps) => {
  const { reportingSchemaId } = props
  const [openDialogId, setOpenDialogId] = useState('')

  const { data, loading, error } = useGetTasksForTasksPageQuery({
    variables: { reportingSchemaId: reportingSchemaId as string },
    skip: !reportingSchemaId,
  })

  const tasks = useMemo(() => data?.tasks, [data])

  const handleRowClick = (params: GridRowParams<Task>) => {
    setOpenDialogId(params.row.id)
  }

  const handleDialogClose = () => {
    setOpenDialogId('')
  }

  const getAssignee = (cell: GridValueGetterParams) => {
    if (cell.value.id === '') {
      return cell.row.assignedGroup
    }
    return cell.value
  }

  const navigate = useNavigate()
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      align: 'left',
      headerName: 'Title',
      flex: 2,
    },
    {
      field: 'assignee',
      align: 'left',
      headerName: 'Assigned to',
      valueGetter: getAssignee,
      valueFormatter: (cell) => cell.value?.name,
      flex: 1.25,
    },
    {
      field: 'status',
      align: 'left',
      headerName: 'State',
      renderCell: (params) => <TaskState status={params.value} isFilled={true} />,
      flex: 1,
    },
    {
      field: 'item',
      align: 'left',
      headerName: 'Item',
      valueFormatter: (cell) => cell.value?.name,
      flex: 2,
    },
    {
      field: 'link',
      headerName: '',
      flex: 0.1,
      align: 'center',
      renderCell: (params) => (
        <IconButton onClick={() => navigate('../components', { state: params.value })}>
          <Link />
        </IconButton>
      ),
      hideSortIcons: true,
      disableReorder: true,
      disableColumnMenu: true,
    },
    {
      field: 'comments',
      headerName: 'Comments',
      headerAlign: 'center',
      align: 'center',
      flex: 0.6,
      renderCell: (params) => <CommentsBubble comments={params.value} />,
      hideSortIcons: true,
      disableReorder: true,
      disableColumnMenu: true,
    },
  ]

  return (
    <div style={{ height: 600, width: '100%' }} data-testid='tasks-table'>
      <DataFetchWrapper error={error}>
        <DataGridPro
          aria-label='tasks-table'
          loading={loading}
          rows={tasks || []}
          columns={columns}
          onRowClick={handleRowClick}
          components={{ LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay }}
          componentsProps={{
            noRowsOverlay: { text: 'No tasks added' },
          }}
          columnVisibilityModel={{ id: false }}
          sx={{
            border: 0,
            '.MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }}
        />
      </DataFetchWrapper>
      <Dialog
        show={!!tasks && !!openDialogId}
        taskId={openDialogId}
        handleDialogClose={handleDialogClose}
        reportingSchemaId={reportingSchemaId as string}
      />
    </div>
  )
}

interface DialogProps {
  show: boolean
  taskId: string
  handleDialogClose: () => void
  reportingSchemaId: string
}
const Dialog = ({ show, taskId, handleDialogClose, reportingSchemaId }: DialogProps) => {
  if (!show) {
    return null
  }

  return (
    <TaskDialog
      open={taskId !== ''}
      handleClose={handleDialogClose}
      taskId={taskId}
      reportingSchemaId={reportingSchemaId}
    />
  )
}
