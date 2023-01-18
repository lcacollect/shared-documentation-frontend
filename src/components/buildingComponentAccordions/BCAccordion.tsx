import { CardTitle, theme } from '@lcacollect/components'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Fab, Radio } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import React, { Dispatch, SetStateAction } from 'react'
import { GraphQlSchemaCategory } from '../../dataAccess'
import { SchemaElement } from '../schemaElementsTable'
import { TaskBubbles } from '../taskBubbles'
import { Task } from '../tasksTable'

interface BCAccordion extends AccordionProps {
  level?: number
}

export const BCAccordion: React.FC<BCAccordion> = (props) => {
  const { level = 0 } = props

  return (
    <MuiAccordion
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      elevation={0}
      square
      sx={{
        padding: 0,
        marginLeft: level * 2,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        ...props.sx,
      }}
      {...props}
    />
  )
}

interface BCAccordionSummaryProps extends AccordionSummaryProps {
  category: GraphQlSchemaCategory
  variant: 'large' | 'medium' | 'small'
  tasks?: any[] | undefined // GraphQlTask[];
  isAddingTasks: boolean
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: Dispatch<SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const BCAccordionSummary = (props: BCAccordionSummaryProps) => {
  const {
    category,
    variant,
    tasks,
    isAddingTasks,
    refToAddTaskTo,
    setRefToAddTaskTo,
    setSelectedTask,
    setIsAddTaskDialogOpen,
  } = props
  const nameToShow = category.name || ''

  const handleChangeSelectedTask = () => {
    setRefToAddTaskTo(category)
  }

  return (
    <MuiAccordionSummary
      expandIcon={
        <Fab
          size='small'
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 1,
          }}
        >
          <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', ...props.sx }} />
        </Fab>
      }
      sx={{
        backgroundColor: theme.palette.common.white,
        flexDirection: 'row-reverse',
        padding: 0,
        '& .MuiAccordionSummary-content': {
          marginLeft: '8px',
          borderBottom: `1px solid ${theme.palette.grey[100]}`,
          paddingBottom: '8px',
          paddingRight: 0,
        },
      }}
      {...props}
    >
      <CardTitle title={nameToShow} size={variant} />
      <TaskBubbles
        tasks={tasks}
        setSelectedTask={setSelectedTask}
        setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
        elementId={category.id}
      />
      {isAddingTasks ? (
        <Radio
          name='select-ref-to-add-task-to'
          checked={category.id === refToAddTaskTo?.id}
          value={category.id}
          onChange={handleChangeSelectedTask}
          onClick={(e) => e.stopPropagation()}
          sx={{ marginRight: 0.5, padding: '4px 9px' }}
          size='small'
        />
      ) : null}
    </MuiAccordionSummary>
  )
}

interface BCAccordionDetailsProps extends AccordionDetailsProps {
  level?: number
}

export const BCAccordionDetails = (props: BCAccordionDetailsProps) => {
  const { level = 0 } = props

  return (
    <MuiAccordionDetails
      sx={{
        padding: 0,
        marginLeft: level,
        '& .MuiAccordionDetails-root': {
          paddingRight: 0,
        },
      }}
      {...props}
    />
  )
}
