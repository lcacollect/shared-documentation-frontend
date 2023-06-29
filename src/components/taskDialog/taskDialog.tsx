import { GraphQLErrors } from '@apollo/client/errors'
import { DataFetchWrapper, LcaButton } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import {
  AssigneeType,
  GetSingleTaskDocument,
  GetTasksForTasksPageDocument,
  TaskItem,
  TaskStatus,
  useAddTaskMutation,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
} from '../../dataAccess'
import { TaskComments } from '../comments'
import { Task } from '../tasksTable'
import { IAssignee, TaskDialogMemberRow } from './taskDialogMemberRow'
import { TaskStatusRow } from './taskStatus'

export const AssigneeTypeMap = {
  GraphQLProjectMember: 'PROJECT_MEMBER',
  GraphQLProjectGroup: 'PROJECT_GROUP',
  User: 'USER',
}

type TaskDialogProps = {
  open: boolean
  handleClose: () => void
  taskId?: string
  reportingSchemaId: string | null | undefined
  item?: TaskItem | null
}

export const TaskDialog = (props: TaskDialogProps) => {
  const { open, handleClose, taskId, reportingSchemaId, item } = props
  const { data, loading, error } = useGetSingleTaskQuery({
    variables: { taskId: taskId as string, reportingSchemaId: reportingSchemaId as string },
    skip: !(reportingSchemaId && taskId),
  })

  const [updateTask, { loading: updateTaskLoading }] = useUpdateTaskMutation({
    refetchQueries: [
      { query: GetSingleTaskDocument, variables: { reportingSchemaId: reportingSchemaId, taskId: taskId } },
      { query: GetTasksForTasksPageDocument, variables: { reportingSchemaId: reportingSchemaId } },
    ],
  })
  const [addTask, { loading: addTaskLoading }] = useAddTaskMutation({
    refetchQueries: [{ query: GetTasksForTasksPageDocument, variables: { reportingSchemaId: reportingSchemaId } }],
  })

  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Pending)
  const [assignee, setAssignee] = useState<IAssignee | null | undefined>()
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  useEffect(() => {
    if (error || loading || !data) {
      return
    }
    const task = data.tasks[0]
    setName(task.name)
    setDescription(task.description)
    setStatus(task.status)
    setAssignee({
      name: task.assignee.name,
      id: task.assignee.id,
      type: AssigneeTypeMap[task.assignee.__typename] as AssigneeType,
    } as IAssignee)
  }, [data, error, loading])

  const task = useMemo(() => data?.tasks[0] as unknown as Task, [data])

  const handleUpdateTask = async () => {
    const { errors } = await updateTask({
      variables: {
        taskId: taskId as string,
        name: name,
        description: description,
        status: status,
        assignee: {
          id: assignee?.id as string,
          type: assignee?.type as AssigneeType,
        },
      },
    })
    if (errors) {
      handleErrors(errors)
    } else {
      resetValue()
      handleClose()
    }
  }
  const handleCancel = () => {
    resetValue()
    handleClose()
  }

  const handleAddTask = async () => {
    const dueDate = new Date()

    const { errors } = await addTask({
      variables: {
        reportingSchemaId: reportingSchemaId as string,
        dueDate: dueDate.toISOString().split('T')[0],
        name: name as string,
        item: item as TaskItem,
        description: description as string,
        status: status,
        assignee: {
          id: assignee?.id as string,
          type: assignee?.type as AssigneeType,
        },
      },
    })
    if (errors) {
      handleErrors(errors)
    } else {
      resetValue()
      handleClose()
    }
  }

  const handleErrors = (errors: GraphQLErrors) => {
    console.error(errors)
    setSnackbar({ children: errors[0].message, severity: 'error' })
  }

  const resetValue = () => {
    setName(undefined)
    setDescription(undefined)
    setStatus(TaskStatus.Pending)
    setAssignee(null)
  }

  return (
    <>
      <Dialog
        open={open}
        maxWidth={'sm'}
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
      >
        <DialogContent>
          <DataFetchWrapper error={error} loading={loading}>
            <Grid paddingBottom={3}>
              <TextField
                label='Title'
                value={name ?? ''}
                onChange={(e) => setName(e.target.value)}
                variant='standard'
                fullWidth
                inputProps={{ style: { fontWeight: 'bold', fontSize: 20 } }}
              />
            </Grid>

            <Grid paddingBottom={3}>
              <TextField
                label='Description'
                value={description ?? ''}
                onChange={(e) => setDescription(e.target.value)}
                variant='standard'
                fullWidth
              />
            </Grid>

            <TaskDialogMemberRow task={task} handleSetAssignee={setAssignee} assignee={assignee} />

            <TaskStatusRow status={status} handleClickStatus={setStatus} />

            <TaskComments task={task} />
          </DataFetchWrapper>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
          <LcaButton onClick={handleCancel}>
            <Typography>Cancel</Typography>
          </LcaButton>
          <Tooltip
            placement='top-end'
            title={!name || !description || !assignee?.id ? 'Complete the form to submit task' : null}
          >
            <Box sx={{ ml: 1 }}>
              <LcaButton
                onClick={() => (task ? handleUpdateTask() : handleAddTask())}
                disabled={addTaskLoading || updateTaskLoading || !name || !description || !assignee?.id}
              >
                {addTaskLoading || updateTaskLoading ? <CircularProgress size='small' /> : null}
                <Typography>Done</Typography>
              </LcaButton>
            </Box>
          </Tooltip>
        </DialogActions>
      </Dialog>
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
    </>
  )
}
