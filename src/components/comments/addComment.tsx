import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { GetCommentsForTaskDocument, GraphQlComment, useAddCommentMutation } from '../../dataAccess'
import { Grid, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

interface AddCommentProps {
  show: boolean
  taskId?: string
}

export const AddComment = (props: AddCommentProps) => {
  const { show, taskId } = props
  const [newComment, setNewComment] = useState<string>()
  const [addCommentMutation] = useAddCommentMutation({
    refetchQueries: [{ query: GetCommentsForTaskDocument, variables: { taskId: taskId } }],
  })
  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    const comment = event.target.value
    setNewComment(comment)
  }

  const handleKeyDownComment = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddComment()
    }
  }

  const handleAddComment = () => {
    if (!newComment || !taskId) {
      return
    }
    addCommentMutation({
      variables: {
        taskId: taskId,
        text: newComment,
      },
    }).then((response) => {
      const addedComment = response.data?.addComment as GraphQlComment
      if (addedComment) {
        setNewComment('')
      }
    })
  }

  if (!show) {
    return null
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={10}>
        <TextField
          fullWidth
          value={newComment}
          placeholder='Add new comment'
          onChange={handleChangeComment}
          onKeyDown={handleKeyDownComment}
        />
      </Grid>
      <Grid item sm={2}>
        <IconButton disabled={!newComment} onClick={handleAddComment}>
          <SendIcon
            sx={{
              boxShadow: '0px 1px 2px #00000061',
              fill: '#333',
              borderRadius: '100%',
              padding: 1,
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  )
}
