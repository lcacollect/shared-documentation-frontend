import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AddTypecodeDialog } from '.'
import { MockedProvider } from '@apollo/client/testing'
import React from 'react'

describe('TypeCode Dialog', () => {
  it('should display Add Typecode dialog', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddTypecodeDialog open={true} handleClose={() => ({})} domain='' />
      </MockedProvider>,
    )

    expect(await screen.findByText('Add Typecode')).toBeInTheDocument()
    expect(await screen.findByTestId('name')).toBeInTheDocument()
    expect(await screen.findByTestId('source-csv-file')).toBeInTheDocument()
    expect(await screen.findByTestId('downloadTemplate')).toBeInTheDocument()
  })
})
