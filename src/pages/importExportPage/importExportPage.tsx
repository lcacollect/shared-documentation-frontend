import { CardTitle, DropDown, InnerPaper, LcaButton, PaperPage } from '@lcacollect/components'
import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ExportFormat,
  useExportReportingSchemaQuery,
  useGetProjectNameQuery,
  useGetProjectSchemasQuery,
} from '../../dataAccess'

export const ImportExportPage = () => {
  const { projectId } = useParams()
  const [exportFormat, setExportFormat] = useState<ExportFormat>(ExportFormat.Csv)
  const [clicked, setClicked] = useState(false)

  const {
    data: projectSchemas,
    loading: projectSchemasLoading,
    error: projectSchemasError,
  } = useGetProjectSchemasQuery({ variables: { projectId: projectId as string }, skip: !projectId })
  const { data: projectData } = useGetProjectNameQuery({
    variables: { projectId: projectId as string },
    skip: !projectId,
  })

  const {
    data: base64File,
    loading: base64Loading,
    error: base64Error,
  } = useExportReportingSchemaQuery({
    variables: {
      reportingSchemaId: projectSchemas?.reportingSchemas.length
        ? (projectSchemas?.reportingSchemas[0].id as string)
        : '',
      exportFormat: exportFormat,
    },
    skip: !projectSchemas?.reportingSchemas[0]?.id && !clicked,
  })

  useEffect(() => {
    if (!base64Loading && base64File && clicked) {
      if (base64Loading || base64Error) {
        console.log('Error retrieving export file')
        return
      }
      const downloadLink = document.createElement('a')
      const fileName = `${projectData?.projects[0].name}.${
        exportFormat !== ExportFormat.Csv ? 'json' : exportFormat.toLowerCase()
      }`

      downloadLink.href = ('data:text/plain;base64,' + base64File?.exportReportingSchema) as string
      downloadLink.download = fileName
      downloadLink.click()

      setClicked(false)
    }
  }, [base64File, base64Loading, base64Error, exportFormat, clicked])

  const handleChangeExportFormat = (value: string) => {
    switch (value) {
      case 'csv':
        setExportFormat(ExportFormat.Csv)
        break
      case 'lcabyg':
        setExportFormat(ExportFormat.Lcabyg)
        break
      case 'lcax':
        setExportFormat(ExportFormat.Lcax)
        break
      default:
        console.log('Unknown export format:', value, 'setting format to ExportFormat.Csv')
        setExportFormat(ExportFormat.Csv)
        break
    }
  }

  const sxInner = { display: 'flex', width: '300px', flexDirection: 'column', height: '18rem' }
  const options = Object.values(ExportFormat)

  return (
    <PaperPage>
      <CardTitle title='Export Project' size='large' />
      <InnerPaper sx={sxInner}>
        <Stack direction='column' justifyContent='space-between' sx={{ height: '100%' }}>
          <CardTitle title='Choose format' size='medium' />
          <DropDown inputLabel='Format' options={options} setSelected={handleChangeExportFormat} />
          <LcaButton
            onClick={() => setClicked(true)}
            disabled={projectSchemasLoading || projectSchemasError !== undefined}
          >
            Export
          </LcaButton>
        </Stack>
      </InnerPaper>
    </PaperPage>
  )
}
