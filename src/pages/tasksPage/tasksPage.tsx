import { useGetProjectSchemasWithCategoriesQuery } from '../../dataAccess'
import { CardTitle, DataFetchWrapper, PaperPage } from '@lcacollect/components'
import { Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { TasksTable } from '../../components'

export const TasksPage = () => {
  const { projectId } = useParams()

  const { data, loading, error } = useGetProjectSchemasWithCategoriesQuery({
    variables: {
      projectId: projectId as string,
    },
    skip: !projectId,
  })
  const reportingSchema = data?.reportingSchemas[0]

  return (
    <PaperPage data-testid='tasks-page'>
      <CardTitle title={'Tasks'} size={'large'} />
      <DataFetchWrapper loading={loading} error={error}>
        <TasksTable reportingSchemaId={reportingSchema?.id} />
        <MissingReportingSchema show={!reportingSchema?.id} />
      </DataFetchWrapper>
    </PaperPage>
  )
}

const MissingReportingSchema = ({ show }: { show: boolean }) => {
  if (!show) {
    return null
  }
  return (
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
      No Tasks found for Reporting Schema. Please select a Reporting Schema on the settings page and make sure you have
      added tasks to either Categories or Elements!
    </Box>
  )
}
