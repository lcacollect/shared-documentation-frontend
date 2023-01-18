import InputBase, { InputBaseProps } from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-pro'
import React from 'react'

export const EditTextArea = (props: GridRenderEditCellParams<string>) => {
  const { id, field, value, colDef } = props
  const [valueState, setValueState] = React.useState(value)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>()
  const apiRef = useGridApiContext()

  const handleRef = React.useCallback((el: HTMLElement | null) => {
    setAnchorEl(el)
  }, [])

  const handleChange = React.useCallback<NonNullable<InputBaseProps['onChange']>>(
    (event) => {
      const newValue = event.target.value
      setValueState(newValue)
      apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 }, event)
    },
    [apiRef, field, id],
  )

  const handleKeyDown = React.useCallback<NonNullable<InputBaseProps['onKeyDown']>>(
    (event) => {
      if (event.key === 'Escape' || (event.key === 'Enter' && !event.shiftKey && (event.ctrlKey || event.metaKey))) {
        const params = apiRef.current.getCellParams(id, field)
        apiRef.current.publishEvent('cellKeyDown', params, event)
      }
    },
    [apiRef, id, field],
  )

  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div
        ref={handleRef}
        style={{
          height: 1,
          width: colDef.computedWidth,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      {anchorEl && (
        <Popper open anchorEl={anchorEl} placement='bottom-start' disablePortal={true}>
          <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth * 0.9 }}>
            <InputBase
              multiline
              rows={1}
              value={valueState}
              sx={{ textarea: { resize: 'vertical' }, width: '100%' }}
              onChange={handleChange}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </Paper>
        </Popper>
      )}
    </div>
  )
}
