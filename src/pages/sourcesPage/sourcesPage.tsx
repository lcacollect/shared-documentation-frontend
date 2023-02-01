import { CardTitle, PaperPage } from '@lcacollect/components'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectSource, SourceDialog, SourceInterpretationTable, SourceTable } from '../../components'

export const SourcesPage = () => {
  const { projectId = '' } = useParams()
  const [openSourceDialog, setOpenSourceDialog] = useState(false)
  const [editRow, setEditRow] = useState<ProjectSource | null | undefined>()

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
        <SourceTable />
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
        <SourceInterpretationTable />
      </PaperPage>
    </Stack>
  )
}
