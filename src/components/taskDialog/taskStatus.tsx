import { TaskStatus } from '../../dataAccess'
import { ButtonBase, Grid } from '@mui/material'
import { CardTitle } from '@lcacollect/components'
import { TaskState } from '../taskState'
import React from 'react'

interface TaskStatusProps {
  status?: string
  handleClickStatus: (status: TaskStatus) => void
}
export const TaskStatusRow = ({ handleClickStatus, status }: TaskStatusProps) => (
  <Grid paddingBottom={3}>
    <CardTitle title={'Status'} size={'medium'} />
    <Grid
      container
      display='flex'
      alignItems='center'
      justifyContent='space-around'
      flexWrap='nowrap'
      sx={{ paddingTop: 2 }}
    >
      {Object.values(TaskStatus)
        .reverse()
        .map((taskStatus) => (
          <ButtonBase key={taskStatus} onClick={() => handleClickStatus(taskStatus)} disableRipple>
            <TaskState
              status={taskStatus}
              isFilled={taskStatus === status}
              isStackedInColumn={true}
              sx={{ justifyContent: 'center' }}
            />
          </ButtonBase>
        ))}
    </Grid>
  </Grid>
)
