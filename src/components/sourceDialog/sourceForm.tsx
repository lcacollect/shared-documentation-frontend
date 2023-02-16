import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { ProjectSourceType } from '../../dataAccess'

interface SourceFormProps {
  type: ProjectSourceType | null | undefined
  setType: Dispatch<SetStateAction<ProjectSourceType | null | undefined>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  setFile: Dispatch<SetStateAction<File | null | undefined>>
}
export const SourceForm: React.FC<SourceFormProps> = (props) => {
  const { type, setType, name, setName, setFile } = props

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) {
      return
    }

    const newFile = event.currentTarget.files[0]
    setFile(newFile)
  }

  return (
    <Grid container spacing={2} sx={{ paddingTop: 5, paddingBottom: 2 }} data-testid='source-form'>
      <Grid item xs={true}>
        <TextField
          data-testid='source-name'
          onChange={(event) => setName(event.target.value)}
          value={name}
          label='Name'
        />
      </Grid>
      <Grid item xs={true}>
        <FormControl fullWidth data-testid='form-control-select' data-cy={'form-control-cy'}>
          <InputLabel id='type-select-label'>Type</InputLabel>
          <Select
            labelId='type-select-label'
            data-testid='source-type'
            data-cy={'source-type-cy'}
            value={type}
            label='Type'
            onChange={(event) => setType(event.target.value as ProjectSourceType)}
          >
            {/* <MenuItem value='speckle'>Speckle</MenuItem> */}
            <MenuItem value={ProjectSourceType.Csv} data-testid='csv-option' data-cy={'csv-option-cy'}>
              *.CSV
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <SpeckleField show={false} />

      <CsvField show={type === ProjectSourceType.Csv} handleSetFile={handleSetFile} data-testid='csv-field' />
    </Grid>
  )
}

export interface CsvFieldProps {
  show: boolean
  handleSetFile: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CsvField: React.FC<CsvFieldProps> = (props) => {
  const uploadRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | undefined>('')
  const { show, handleSetFile } = props

  const handleFieldClick = () => {
    uploadRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedData = uploadRef.current?.value

    const fileName = uploadedData?.slice(uploadedData?.lastIndexOf('\\') + 1)
    setFileName(fileName)
    handleSetFile(event)
  }

  if (!show) {
    return null
  }

  return (
    <Grid item xs={true}>
      <Tooltip
        placement='top'
        title={
          <React.Fragment>
            Make sure your CSV file is:
            <ul>
              <li>utf-8 formatted</li>
              <li>comma (,) separated</li>
              <li>dot (.) decimal divided</li>
              <li>using double quoted (&quot;) strings</li>
            </ul>
          </React.Fragment>
        }
      >
        <TextField
          data-testid='source-csv-file'
          onClick={handleFieldClick}
          placeholder='File to Upload'
          label='File'
          value={fileName}
          variant='outlined'
        />
      </Tooltip>
      <input type='file' hidden ref={uploadRef} accept='.csv' onChange={handleFileChange} />
    </Grid>
  )
}

interface SpeckleFieldProps {
  show: boolean
}

const SpeckleField: React.FC<SpeckleFieldProps> = (props) => {
  const { show } = props

  if (!show) {
    return null
  }
  return (
    <Grid item xs={true} aria-label='speckle-server-text'>
      <TextField label='Server URL' itemType='url' variant='outlined' />
      <InputLabel id='speckle-bonus-label' sx={{ fontSize: 12 }}>
        Speckle server URL
      </InputLabel>
    </Grid>
  )
}
