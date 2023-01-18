import { Box, Grid, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { CardTitle, DataFetchWrapper } from '@lcacollect/components'
import { GraphQlComment, useGetCommentsForTaskQuery } from '../../dataAccess'
import { AddComment } from './addComment'
import { Comment } from './comment'
import { SimplifiedProjectMember, Task } from '../tasksTable'

interface TaskCommentsProps {
  task?: Task
}

export interface IComment extends Omit<GraphQlComment, 'task' | 'author' | 'authorId'> {
  author: SimplifiedProjectMember
}

export const TaskComments = (props: TaskCommentsProps) => {
  const { task } = props
  const { data, loading, error } = useGetCommentsForTaskQuery({
    variables: { taskId: task?.id as string },
    skip: !task,
  })
  const comments = useMemo(() => data?.comments as IComment[], [data])

  if (!task) {
    return null
  }

  return (
    <DataFetchWrapper loading={loading} error={error}>
      <CardTitle title={'Comments'} size={'medium'} />
      <Grid>
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {!comments || comments.length === 0 ? (
          <Box sx={{ paddingY: 2 }}>
            <Typography fontSize={14} fontStyle='italic'>
              {task ? 'Be the first one to add a comment' : 'Add task to activate comments'}
            </Typography>
          </Box>
        ) : null}
      </Grid>
      <AddComment show={!!task} taskId={task?.id} />
    </DataFetchWrapper>
  )
}
