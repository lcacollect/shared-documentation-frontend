import { TaskStatus } from '../../dataAccess'
import { Grid, SxProps, Typography } from '@mui/material'
import { theme } from '@lcacollect/components'

interface TaskStatusProps {
  status: TaskStatus | null | undefined
  sx?: SxProps
  isFilled?: boolean
  isStackedInColumn?: boolean
}

const colors = {
  [TaskStatus.Approved]: theme.palette.success.main,
  [TaskStatus.Completed]: theme.palette.warning.main,
  [TaskStatus.Pending]: theme.palette.error.main,
}

const statusText = {
  [TaskStatus.Approved]: 'Approved',
  [TaskStatus.Completed]: 'Done',
  [TaskStatus.Pending]: 'Pending',
}

export const TaskState = (props: TaskStatusProps) => {
  const { status, sx, isFilled, isStackedInColumn } = props
  if (!status) {
    return <Typography>No status</Typography>
  }
  const stringToShow = statusText[status]
  const color = colors[status]
  const size = 12

  return (
    <Grid
      container
      alignItems='center'
      columnSpacing={1}
      sx={sx}
      flexDirection={isStackedInColumn ? 'column-reverse' : 'initial'}
      rowGap={isStackedInColumn ? '0.5rem' : ''}
    >
      <Grid
        item
        key={(Math.random() + 1).toString(36)}
        sx={{
          width: size,
          height: size,
          borderRadius: '100%',
          border: `2px solid ${color}`,
          backgroundColor: isFilled ? color : '',
        }}
      />
      <Grid item={!isStackedInColumn} title={stringToShow}>
        <Typography>{stringToShow}</Typography>
      </Grid>
    </Grid>
  )
}
