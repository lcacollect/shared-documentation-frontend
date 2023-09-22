import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AddTypecodeDialog } from '.'
import { MockedProvider } from '@apollo/client/testing'

describe('TypeCode Dialog', () => {
  it('should display Add Typecode dialog', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddTypecodeDialog open={true} handleClose={() => ({})} />
      </MockedProvider>,
    )

    expect(await screen.findByText('Add Typecode')).toBeInTheDocument()
    expect(await screen.findByTestId('name')).toBeInTheDocument()
    expect(await screen.findByTestId('file')).toBeInTheDocument()
    expect(await screen.findByTestId('downloadTemplate')).toBeInTheDocument()
  })
})
