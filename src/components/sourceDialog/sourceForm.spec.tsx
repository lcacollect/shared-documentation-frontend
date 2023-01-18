import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { SourceForm } from './sourceForm'
import { ProjectSourceType } from '../../dataAccess'

describe('Source Form', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <SourceForm type={undefined} setType={() => ({})} name={''} setName={() => ({})} setFile={() => ({})} />,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('source-form')).toBeInTheDocument()
    expect(screen.getByTestId('source-name')).toBeInTheDocument()
    expect(screen.getByTestId('source-type')).toBeInTheDocument()
    // expect(screen.getByTestId("source-csv-file")).not.toBeInTheDocument();
  })

  it('should render file field', async () => {
    const { baseElement } = render(
      <SourceForm
        type={ProjectSourceType.Csv}
        setType={() => ({})}
        name={''}
        setName={() => ({})}
        setFile={() => ({})}
      />,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('source-form')).toBeInTheDocument()
    expect(screen.getByTestId('source-type')).toHaveTextContent('*.CSVType')
    expect(screen.getByTestId('source-csv-file')).toBeInTheDocument()
  })
})
