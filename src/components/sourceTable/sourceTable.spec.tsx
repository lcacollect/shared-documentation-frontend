import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import projectSourceData from '../../__mocks__/getProjectSources'
import { ProjectSource, SourceTable } from './sourceTable'
import { MockedProvider } from '@apollo/client/testing'

describe('Source Table', () => {
  it('should render no rows', async () => {
    const { baseElement } = render(
      <MockedProvider>
        <SourceTable />
      </MockedProvider>,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('sources-table')).toBeInTheDocument()
    expect(screen.getByText('No sources added')).toBeInTheDocument()
  })

  it('should render rows', async () => {
    const { baseElement } = render(
      <MockedProvider>
        <SourceTable projectSources={projectSourceData.data.projectSources as ProjectSource[]} />
      </MockedProvider>,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('sources-table')).toBeInTheDocument()
    expect(await screen.findByText('s2')).toBeInTheDocument()
    expect(await screen.findByText('s5')).toBeInTheDocument()
    expect(await screen.findByText('s4')).toBeInTheDocument()
  })
})
