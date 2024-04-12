import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { sourcesPageMock } from '../../__mocks__'
import { SourcesPage } from './sourcesPage'
import React from 'react'

describe('Project Source Page', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/projects/741dfc36-23fa-4582-8746-1879fddab9c7/sources']}>
        <MockedProvider mocks={sourcesPageMock}>
          <Routes>
            <Route path={'/projects/:projectId/sources'} element={<SourcesPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('sources-title')).toBeInTheDocument()
    expect(await screen.findByTestId('sources-table')).toBeInTheDocument()
  })

  it('should render dialog on button click', async () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/projects/741dfc36-23fa-4582-8746-1879fddab9c7/sources']}>
        <MockedProvider mocks={sourcesPageMock}>
          <Routes>
            <Route path={'/projects/:projectId/sources'} element={<SourcesPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(baseElement).toBeDefined()
    const iconButton = screen.getByTestId('AddIcon')
    fireEvent.click(iconButton)

    expect(await screen.findByTestId('sources-dialog')).toBeInTheDocument()
  })
})
