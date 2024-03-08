import { GraphQLErrors } from '@apollo/client/errors'
import { LcaButton, DataFetchWrapper } from '@lcacollect/components'
import {
  Alert,
  AlertProps,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import React, { Dispatch, SetStateAction, useState, useEffect, useMemo } from 'react'
import {
  GetSchemaTemplatesDocument,
  GraphQlTypeCodeElement,
  GraphQlTypeCodeElementInput,
  useAddSchemaTemplateMutation,
  useUpdateSchemaTemplateMutation,
  useGetTypeCodesQuery,
  GraphQlTypeCode,
} from '../../dataAccess'
import { SchemaTemplate } from '../schemaTemplatesTable'
import { TypecodeSelectionTable } from '../typecodeSelectionTable'
import { useSettingsContext } from '@lcacollect/core'

type CreateTemplateDialogProps = {
  open: boolean
  handleClose: () => void
  editTemplate: SchemaTemplate | null | undefined
  setEditTemplate: Dispatch<SetStateAction<SchemaTemplate | null | undefined>>
}

export const CreateTemplateDialog = ({
  open,
  handleClose,
  editTemplate,
  setEditTemplate,
}: CreateTemplateDialogProps) => {
  const [updateSchemaTemplate, { loading: updateTemplateLoading }] = useUpdateSchemaTemplateMutation({
    refetchQueries: [{ query: GetSchemaTemplatesDocument }],
  })
  const [addSchemaTemplate, { loading: addTemplateLoading }] = useAddSchemaTemplateMutation({
    refetchQueries: [{ query: GetSchemaTemplatesDocument }],
  })

  const { domainName } = useSettingsContext()

  const {
    data: typeCodeData,
    error: typeCodeError,
    loading: typeCodeLoading,
  } = useGetTypeCodesQuery({
    variables: { filters: { domain: { isAnyOf: ['default', domainName || ''] } } },
    skip: !open,
  })

  const [name, setName] = useState<string>('')
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [selectedRows, setSelectedRows] = useState<GraphQlTypeCodeElement[]>([])
  const [selectedTemplateRows, setSelectedTemplateRows] = useState<GraphQlTypeCodeElement[]>([])
  const [dataRows, setDataRows] = useState<GraphQlTypeCodeElement[]>([])
  const [templateRows, setTemplateRows] = useState<GraphQlTypeCodeElement[]>([])
  const [selectedTypeCode, setSelectedTypeCode] = useState<number>(0)

  const typeCodes: { [key: string]: GraphQlTypeCode } = useMemo(
    () =>
      typeCodeData?.typeCodes.reduce(
        (acc, typeCode, index) => ({
          ...acc,
          [index]: typeCode,
        }),
        {},
      ) || {},
    [typeCodeData],
  )

  useEffect(() => {
    if (editTemplate && typeCodes[selectedTypeCode]) {
      const editTypeCodes = typeCodes[selectedTypeCode]?.elements?.filter((row) => {
        if (editTemplate?.original)
          return !!editTemplate?.original.categories.find((category) => {
            return row.id === category.typeCodeElement.id
          })
      })

      const notAddedTypeCodes: GraphQlTypeCodeElement[] = typeCodes[selectedTypeCode]?.elements?.filter((row) => {
        return !editTypeCodes.find(({ id }) => {
          return row.id === id
        })
      })

      setTemplateRows(editTypeCodes)
      setDataRows(notAddedTypeCodes)
    } else if (typeCodes && typeCodes[selectedTypeCode]?.elements?.length) {
      const notAddedTypeCodes: GraphQlTypeCodeElement[] = typeCodes[selectedTypeCode]?.elements?.filter((row) => {
        let result = true
        if (templateRows) {
          templateRows.find(({ id }) => {
            result = !(row.id === id)
            return row.id === id
          })
        }
        return result
      })
      setDataRows(notAddedTypeCodes)
    }

    setName(editTemplate?.name || '')
  }, [typeCodeData, editTemplate, selectedTypeCode])

  const handleChangeSelectedRow = (row: GraphQlTypeCodeElement) => {
    const selectedRow = selectedRows.find((selectRow) => selectRow.id === row.id)
    if (selectedRow) {
      setSelectedRows(selectedRows.filter((selectRow) => selectRow.id !== row.id))
    } else {
      setSelectedRows((prevState) => [...prevState, row])
    }
  }

  const handleChangeAllSelectedRows = () => {
    if (selectedRows.length) {
      setSelectedRows([])
    } else {
      if (typeCodeData) setSelectedRows(dataRows)
    }
  }

  const handleChangeSelectedTemplateRow = (row: GraphQlTypeCodeElement) => {
    const selectedRow = selectedTemplateRows.find((selectRow) => selectRow.id === row.id)
    if (selectedRow) {
      setSelectedTemplateRows(selectedRows.filter((selectRow) => selectRow.id !== row.id))
    } else {
      setSelectedTemplateRows((prevState) => [...prevState, row])
    }
  }

  const handleChangeAllSelectedTemplateRows = () => {
    if (selectedTemplateRows.length) {
      setSelectedTemplateRows([])
    } else {
      setSelectedTemplateRows(templateRows)
    }
  }

  const handleCheckedRight = () => {
    if (selectedRows.length) {
      const notAddedRows = dataRows.filter((dataRow) => {
        return !selectedRows.find(({ id }) => {
          return dataRow.id === id
        })
      })
      setTemplateRows((prevState) => [...prevState, ...selectedRows])
      setDataRows(notAddedRows)
      setSelectedRows([])
    }
  }

  const handleCheckedLeft = () => {
    if (selectedTemplateRows.length) {
      const notAddedRows = templateRows.filter((templateRow) => {
        return !selectedTemplateRows.find(({ id }) => {
          return templateRow.id === id
        })
      })
      setTemplateRows(notAddedRows)
      setDataRows((prevState) => [...prevState, ...selectedTemplateRows])
      setSelectedTemplateRows([])
    }
  }

  const handleSchemaTemplate = async () => {
    setSnackbar({ children: 'Saving template...', severity: 'info' })
    const typeCodes = templateRows.map((row) => {
      return {
        id: row.id,
        parentPath: row.parentPath,
      }
    }) as GraphQlTypeCodeElementInput[]
    let error = null
    if (editTemplate) {
      const { errors } = await updateSchemaTemplate({
        variables: {
          id: editTemplate.id,
          name: name as string,
          typeCodes: typeCodes,
          domain: domainName,
        },
      })
      error = errors
    } else {
      const { errors } = await addSchemaTemplate({
        variables: {
          name: name as string,
          typeCodes: typeCodes,
          domain: domainName,
        },
      })
      error = errors
    }

    if (error) {
      handleErrors(error)
    } else {
      setSnackbar({ children: 'Template saved', severity: 'success' })
      resetValue()
      handleClose()
    }
  }

  const handleErrors = (errors: GraphQLErrors) => {
    console.error(errors)
    setSnackbar({ children: errors[0].message, severity: 'error' })
  }

  const resetValue = () => {
    setName('')
    setSelectedRows([])
    setSelectedTemplateRows([])

    if (typeCodes && typeCodes[selectedTypeCode]?.elements?.length) {
      setDataRows(typeCodes[selectedTypeCode]?.elements)
    }
    setTemplateRows([])
    setEditTemplate(null)
  }

  const handleCancel = () => {
    resetValue()
    handleClose()
  }

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTypeCode(newValue)
    // remove template tabs from data tabs
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: 5, paddingX: 3, paddingY: 3 } }}
      >
        <DialogTitle>{!editTemplate ? 'Create new template' : 'Edit template'}</DialogTitle>
        <DialogContent>
          <Grid paddingBottom={3}>
            <TextField
              label='Name'
              helperText='Name for template'
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant='standard'
              inputProps={{ style: { fontWeight: 'bold', fontSize: 20 } }}
            />
          </Grid>
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item sx={{ width: '45%' }}>
              <DataFetchWrapper loading={typeCodeLoading} error={typeCodeError}>
                <Typography fontWeight='bold'>Typecode</Typography>
                {Object.keys(typeCodes).length && (
                  <Tabs value={selectedTypeCode} onChange={handleTabsChange} variant='scrollable' scrollButtons='auto'>
                    {Object.keys(typeCodes)?.map((typeCodeIndex, index) => (
                      <Tab label={typeCodes[typeCodeIndex].name} key={index} component={LcaButton} />
                    ))}
                  </Tabs>
                )}
                <TypecodeSelectionTable
                  selectedRows={selectedRows}
                  handleChangeSelectedRow={handleChangeSelectedRow}
                  handleChangeAllSelectedRows={handleChangeAllSelectedRows}
                  typeCodeData={dataRows}
                  typeCodeLoading={typeCodeLoading}
                />
              </DataFetchWrapper>
            </Grid>
            <Grid item sx={{ width: '10%' }}>
              <Grid container direction='column' alignItems='center'>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedRight}
                  aria-label='move selected right'
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedLeft}
                  aria-label='move selected left'
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item sx={{ width: '45%' }}>
              <Typography fontWeight='bold'>Template</Typography>
              <DataFetchWrapper loading={typeCodeLoading} error={typeCodeError}>
                <TypecodeSelectionTable
                  selectedRows={selectedTemplateRows}
                  handleChangeSelectedRow={handleChangeSelectedTemplateRow}
                  handleChangeAllSelectedRows={handleChangeAllSelectedTemplateRows}
                  typeCodeData={templateRows}
                  typeCodeLoading={typeCodeLoading}
                />
              </DataFetchWrapper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1rem 1rem 0' }}>
          <LcaButton onClick={handleCancel}>
            <Typography>Cancel</Typography>
          </LcaButton>
          <LcaButton onClick={handleSchemaTemplate} disabled={addTemplateLoading || updateTemplateLoading || !name}>
            {addTemplateLoading || updateTemplateLoading ? <CircularProgress size='small' /> : null}
            <Typography>Done</Typography>
          </LcaButton>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </>
  )
}
