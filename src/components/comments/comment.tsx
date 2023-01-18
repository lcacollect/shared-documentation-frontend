import { Avatar, Box, Grid, Typography } from '@mui/material'
import { theme } from '@lcacollect/components'
import React from 'react'
import { useMsal } from '@azure/msal-react'
import { stringAvatar } from '../taskDialog/stringAvatar'
import { IComment } from './taskComments'

interface CommentProps {
  comment: IComment
}

export const Comment = ({ comment }: CommentProps) => {
  const msal = useMsal()
  const activeAccount = msal.instance.getAllAccounts().length > 0 ? msal.instance.getAllAccounts()[0] : msal.accounts[0]
  const isOwnComment = (authorId: string | null | undefined) => authorId === activeAccount.localAccountId

  return (
    <Grid item key={comment.id} display='flex' justifyContent='flex-end' sx={{ paddingBottom: '1rem' }}>
      <Grid display='inline-flex' alignItems='center'>
        <Avatar {...stringAvatar(comment.author?.name as string)} />
        <Box
          sx={{
            backgroundColor: isOwnComment(comment.author.id) ? theme.palette.primary.dark : theme.palette.grey[200],
            margin: '0 1rem',
            borderRadius: 4,
            padding: '0.5rem',
            color: theme.palette.common.white,
          }}
        >
          <Typography fontWeight='bold' fontSize={14}>
            {isOwnComment(comment.author?.id) ? 'You' : comment?.author?.name}
          </Typography>
          <Typography fontSize={14}>{comment.text}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
