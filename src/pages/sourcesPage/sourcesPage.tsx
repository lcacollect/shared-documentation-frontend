import { CardTitle, DataFetchWrapper, PaperPage } from '@lcacollect/components'
import { Stack } from '@mui/material'
import { useGetProjectSourcesQuery } from '../../dataAccess'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectSource, SourceDialog, SourceInterpretationTable, SourceTable } from '../../components'

export const SourcesPage = () => {
  const { projectId = '' } = useParams()
  const [openSourceDialog, setOpenSourceDialog] = useState(false)
  const [editRow, setEditRow] = useState<ProjectSource | null | undefined>()

  const { data, error, loading } = useGetProjectSourcesQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })
  const projectSources = data?.projectSources

  const handleAddSource = () => {
    setOpenSourceDialog(true)
  }

  const handleSourceDialogClose = () => {
    setOpenSourceDialog(false)
  }

  return (
    <Stack spacing={2} alignItems='stretch' width='100%'>
      <PaperPage>
        <CardTitle title={'Sources'} size={'large'} onClickHandler={handleAddSource} data-testid='sources-title' />
        <DataFetchWrapper error={error}>
          <SourceTable projectSources={projectSources} loading={loading} />
        </DataFetchWrapper>
        <SourceDialog
          openDialog={openSourceDialog}
          handleDialogClose={handleSourceDialogClose}
          projectId={projectId}
          editRow={editRow}
          setEditRow={setEditRow}
        />
      </PaperPage>
      <PaperPage>
        <CardTitle title={'Source Interpretation'} size={'large'} />
        <DataFetchWrapper error={error}>
          <SourceInterpretationTable setEditRow={setEditRow} projectSources={projectSources} loading={loading} />
        </DataFetchWrapper>
      </PaperPage>
    </Stack>
  )
}
