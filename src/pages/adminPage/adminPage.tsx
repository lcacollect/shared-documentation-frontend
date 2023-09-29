import { CardTitle, DataFetchWrapper, LcaButton, PaperPage, PaperPageStack } from '@lcacollect/components'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { SchemaTemplatesTable } from '../../components'
import { useGetSchemaTemplatesQuery, GraphQlSchemaTemplate } from '../../dataAccess'

export const AdminPage = () => {
  const [openCreateTemplateDialog, setOpenCreateTemplateDialog] = useState(false)
  const [openAddTypecodeDialog, setOpenAddTypecodeDialog] = useState(false)

  const { data, loading, error } = useGetSchemaTemplatesQuery()
  const schemaTemplates = data?.schemaTemplates

  return (
    <PaperPageStack>
      <PaperPage data-testid='admin-page' sx={{ paddingTop: 5 }}>
        <CardTitle title={'Template management'} size={'large'} />
        <DataFetchWrapper loading={loading} error={error}>
          <SchemaTemplatesTable
            schemaTemplates={schemaTemplates as GraphQlSchemaTemplate[]}
            loading={loading}
            openCreateTemplateDialog={openCreateTemplateDialog}
            setOpenCreateTemplateDialog={setOpenCreateTemplateDialog}
            openAddTypecodeDialog={openAddTypecodeDialog}
            setOpenAddTypecodeDialog={setOpenAddTypecodeDialog}
          />
        </DataFetchWrapper>
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <LcaButton onClick={() => setOpenCreateTemplateDialog(true)}>Create Template</LcaButton>
          <LcaButton onClick={() => setOpenAddTypecodeDialog(true)}>Add Typecode</LcaButton>
        </Stack>
      </PaperPage>
    </PaperPageStack>
  )
}
