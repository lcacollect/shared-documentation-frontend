import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SourceTable } from './sourceTable'
import { MockedProvider } from '@apollo/client/testing'
import { emptySourcesPageMock, sourcesPageMock } from '../../__mocks__'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

describe('Source Table', () => {
  it('should render no rows', async () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/projects/741dfc36-23fa-4582-8746-1879fddab9c7/sources']}>
        <MockedProvider mocks={emptySourcesPageMock}>
          <Routes>
            <Route path={'/projects/:projectId/sources'} element={<SourceTable />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('sources-table')).toBeInTheDocument()
    expect(await screen.findByText('No sources added')).toBeInTheDocument()
  })

  it('should render rows', async () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/projects/741dfc36-23fa-4582-8746-1879fddab9c7/sources']}>
        <MockedProvider mocks={sourcesPageMock}>
          <Routes>
            <Route path={'/projects/:projectId/sources'} element={<SourceTable />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('sources-table')).toBeInTheDocument()
    expect(await screen.findByText('s2')).toBeInTheDocument()
    expect(await screen.findByText('s5')).toBeInTheDocument()
    expect(await screen.findByText('s4')).toBeInTheDocument()
  })
})
