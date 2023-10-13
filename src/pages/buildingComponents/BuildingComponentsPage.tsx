import { CardTitle, DataFetchWrapper, ErrorBoundary, PaperPage, theme } from '@lcacollect/components'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { Box, Grid, IconButton, Paper, styled, Tooltip, alpha } from '@mui/material'
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SchemaElement, SchemasAccordion, Task, TaskDialog, SchemaElementsTable } from '../../components'
import {
  GraphQlReportingSchema,
  GraphQlSchemaCategory,
  TaskItemType,
  useGetProjectSchemasWithCategoriesQuery,
  useGetSchemaElementsQuery,
  useGetTasksQuery,
} from '../../dataAccess'

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 110,
  },
})

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#97A6B4',
    '&:hover': {
      backgroundColor: alpha('#97A6B4', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#97A6B4',
  },
}))

export const BuildingComponentsPage = () => {
  const { projectId } = useParams()
  const [isAddingTasks, setIsAddingTasks] = useState(false)
  const [refToAddTaskTo, setRefToAddTaskTo] = useState<GraphQlSchemaCategory | SchemaElement>()
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [isTableView, setIsTableView] = useState(false)

  const { data, loading, error } = useGetProjectSchemasWithCategoriesQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })

  const reportingSchemaExists = !!data?.reportingSchemas[0]
  const reportingSchemaId = data?.reportingSchemas[0]?.id || ''

  const categoriesId = data?.reportingSchemas[0]?.categories?.map((category) => category.id) || []

  const { data: elements, refetch: refetchElements } = useGetSchemaElementsQuery({
    variables: { schemaCategoryIds: categoriesId },
    skip: !reportingSchemaExists,
  })

  const { data: tasks } = useGetTasksQuery({
    variables: { reportingSchemaId: reportingSchemaId },
    skip: !reportingSchemaExists,
  })

  const allElements = elements?.schemaElements || []
  const allTasks = tasks?.tasks || []

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

  const handleChangeView = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTableView(event.target.checked)
  }

  return (
    <PaperPage data-testid='building-components-page'>
      <Grid container alignItems='center' justifyContent='space-between' pb={1}>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CardTitle title='Building Components' size='large' />
          </Box>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto', marginRight: '2%' }}>
          <FormControlLabel
            control={<StyledSwitch checked={isTableView} onChange={handleChangeView} />}
            label={isTableView ? 'Grouped' : 'Table'}
            labelPlacement={isTableView ? 'start' : 'end'}
          />
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
            {!isTableView ? (
              <>
                <SchemasAccordion
                  schema={data.reportingSchemas[0] as GraphQlReportingSchema}
                  categoriesId={categoriesId}
                  projElements={allElements as unknown as SchemaElement[]}
                  projTasks={allTasks as unknown as Task[]}
                  isAddingTasks={isAddingTasks}
                  refToAddTaskTo={refToAddTaskTo}
                  setRefToAddTaskTo={setRefToAddTaskTo}
                  setSelectedTask={setSelectedTask}
                  setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
                  refetchElements={refetchElements}
                />
              </>
            ) : (
              <ErrorBoundary>
                <SchemaElementsTable
                  categoriesId={categoriesId}
                  category={data.reportingSchemas[0].categories as GraphQlSchemaCategory[]}
                  tasks={allTasks as unknown as Task[]}
                  elements={allElements as unknown as SchemaElement[]}
                  isAddingTasks={isAddingTasks}
                  refToAddTaskTo={refToAddTaskTo}
                  setRefToAddTaskTo={setRefToAddTaskTo}
                  setSelectedTask={setSelectedTask}
                  setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
                  refetchElements={refetchElements}
                />
              </ErrorBoundary>
            )}

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
