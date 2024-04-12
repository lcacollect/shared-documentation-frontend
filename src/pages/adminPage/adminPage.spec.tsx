import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { AdminPage } from './adminPage'
import React from 'react'

describe('Admin Page', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AdminPage />
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('admin-page')).toBeDefined()
    expect(await screen.findByText('Template management')).toBeInTheDocument()
    expect(await screen.findByText('Create Template')).toBeInTheDocument()
    expect(await screen.findByText('Add Typecode')).toBeInTheDocument()
  })
})
