import { CardTitle, DataFetchWrapper, LcaButton, PaperPage, PaperPageStack } from '@lcacollect/components'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { SchemaTemplatesTable } from '../../components'
import { useGetSchemaTemplatesQuery } from '../../dataAccess'

export const AdminPage = () => {
  const [openCreateTemplateDialogId, setOpenCreateTemplateDialogId] = useState('')
  const [openAddTypecodeDialog, setOpenAddTypecodeDialog] = useState(false)

  const { data, loading, error } = useGetSchemaTemplatesQuery()
  const schemaTemplates = data?.schemaTemplates

  return (
    <PaperPageStack>
      <PaperPage data-testid='admin-page' sx={{ paddingTop: 5 }}>
        <CardTitle title={'Template management'} size={'large'} />
        <DataFetchWrapper loading={loading} error={error}>
          <SchemaTemplatesTable
            schemaTemplates={schemaTemplates}
            loading={loading}
            openCreateTemplateDialogId={openCreateTemplateDialogId}
            setOpenCreateTemplateDialogId={setOpenCreateTemplateDialogId}
            openAddTypecodeDialog={openAddTypecodeDialog}
            setOpenAddTypecodeDialog={setOpenAddTypecodeDialog}
          />
        </DataFetchWrapper>
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <LcaButton onClick={() => setOpenCreateTemplateDialogId('new template')}>Create Template</LcaButton>
          <LcaButton onClick={() => setOpenAddTypecodeDialog(true)}>Add Typecode</LcaButton>
        </Stack>
      </PaperPage>
    </PaperPageStack>
  )
}
