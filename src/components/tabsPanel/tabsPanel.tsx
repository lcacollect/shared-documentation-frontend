import { Box, Typography } from '@mui/material'
import React from 'react'
import { TabPanelProps } from './types'

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
