import { CardTitle, DataFetchWrapper, PaperPage, theme } from '@lcacollect/components'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { Box, Grid, IconButton, Paper, styled, Tooltip } from '@mui/material'
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SchemaElement, SchemasAccordion, Task, TaskDialog } from '../../components'
import {
  GraphQlReportingSchema,
  GraphQlSchemaCategory,
  TaskItemType,
  useGetProjectSchemasWithCategoriesQuery,
} from '../../dataAccess'

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 110,
  },
})

export const BuildingComponentsPage = () => {
  const { projectId } = useParams()
  const [isAddingTasks, setIsAddingTasks] = useState(false)
  const [refToAddTaskTo, setRefToAddTaskTo] = useState<GraphQlSchemaCategory | SchemaElement>()
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task>()

  const { data, loading, error } = useGetProjectSchemasWithCategoriesQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })

  const reportingSchemaExists = data?.reportingSchemas[0] !== undefined && data.reportingSchemas.length > 0
  const reportingSchemaId = data?.reportingSchemas[0]?.id

  const handleClickTaskIcon = () => {
    if (isAddingTasks) {
      if (refToAddTaskTo) {
        setIsAddTaskDialogOpen(true)
      } else {
        setIsAddingTasks(false)
      }
    } else {
      setIsAddingTasks(true)
    }
  }

  const handleCloseDialog = () => {
    setIsAddTaskDialogOpen(false)
    setIsAddingTasks(false)
    setRefToAddTaskTo(undefined)
  }

  return (
    <PaperPage data-testid='building-components-page'>
      <Grid container alignItems='center' justifyContent='space-between' pb={1}>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CardTitle title='Building Components' size='large' />
          </Box>
        </Grid>
        <Grid item>
          <CustomWidthTooltip
            open={isAddingTasks}
            title='Select items to add task to, then click here'
            placement='top-start'
            arrow
          >
            <Paper sx={{ backgroundColor: isAddingTasks ? theme.palette.primary.main : theme.palette.common.white }}>
              <IconButton onClick={handleClickTaskIcon}>
                <AddTaskIcon sx={{ color: isAddingTasks ? theme.palette.common.white : theme.palette.common.black }} />
              </IconButton>
            </Paper>
          </CustomWidthTooltip>
        </Grid>
      </Grid>

      <DataFetchWrapper error={error} loading={loading}>
        {reportingSchemaExists ? (
          <>
            <SchemasAccordion
              schema={data.reportingSchemas[0] as GraphQlReportingSchema}
              isAddingTasks={isAddingTasks}
              refToAddTaskTo={refToAddTaskTo}
              setRefToAddTaskTo={setRefToAddTaskTo}
              setSelectedTask={setSelectedTask}
              setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
            />
            <TaskDialog
              open={isAddTaskDialogOpen}
              handleClose={handleCloseDialog}
              reportingSchemaId={reportingSchemaId}
              taskId={selectedTask?.id}
              item={{
                id: refToAddTaskTo?.id as string,
                type:
                  refToAddTaskTo?.__typename === 'GraphQLSchemaCategory' ? TaskItemType.Category : TaskItemType.Element,
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              fontSize: 28,
              fontWeight: 700,
              display: 'flex',
              minHeight: 400,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            No Reporting Schema found. Please select one on the settings page!
          </Box>
        )}
      </DataFetchWrapper>
    </PaperPage>
  )
}
