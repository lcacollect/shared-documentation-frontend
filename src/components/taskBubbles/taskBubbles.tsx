import { Box, Typography } from '@mui/material'
import { Task } from '../tasksTable'
import { Dispatch, SetStateAction } from 'react'
import { theme } from '@lcacollect/components'

interface TaskBubblesProps {
  tasks?: Task[]
  elementId: string
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
}
export const TaskBubbles = (props: TaskBubblesProps) => {
  const { tasks, elementId, setSelectedTask, setIsAddTaskDialogOpen } = props
  const filteredTasks = tasks?.filter((task) => {
    if (task.status === 'APPROVED') {
      return false
    }
    return !(elementId && task.item.id !== elementId)
  })

  const numberOfTasks = filteredTasks?.length
  if (!numberOfTasks || !filteredTasks) {
    return <NoTasks />
  }

  const isTaskTypeUnique = filteredTasks.every((task) => task.item.__typename === filteredTasks[0].item.__typename)
  if (!isTaskTypeUnique) {
    alert('Provide unique task types')
    return <NoTasks />
  }
  const handleClick = (taskId: string) => {
    setIsAddTaskDialogOpen(true)
    setSelectedTask(tasks?.find((task) => task.id === taskId))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginLeft: 'auto', alignSelf: 'center' }}>
      {filteredTasks.map((task, index) => (
        <TaskBubble key={index} handleClick={handleClick} title={task.name} taskId={task.id} />
      ))}
    </Box>
  )
}

const NoTasks = () => (
  <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginLeft: 'auto', alignSelf: 'center' }}>
    <Typography>No tasks</Typography>
  </Box>
)

interface TaskBubbleProps {
  handleClick: (taskId: string) => void
  title: string
  taskId: string
}
const TaskBubble = ({ handleClick, taskId, title }: TaskBubbleProps) => (
  <Box
    onClick={() => handleClick(taskId as string)}
    key={(Math.random() + 1).toString(36)}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      borderRadius: '100%',
      border: `2px solid ${theme.palette.common.white}`,
      backgroundColor: theme.palette.grey[100],
      marginRight: '-6px',
    }}
  >
    <Typography title={title ? title : ''} color={theme.palette.common.white}>
      {title.substring(0, 1)}
    </Typography>
  </Box>
)
