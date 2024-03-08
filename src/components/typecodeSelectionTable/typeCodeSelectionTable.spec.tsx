import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TypecodeSelectionTable } from '.'
import { MockedProvider } from '@apollo/client/testing'
import data from '../../__mocks__/typeCodes'
import { GraphQlTypeCodeElement } from '../../dataAccess'

describe('TypeCodeSelectionTable', () => {
  it('should display typeCode table', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TypecodeSelectionTable
          selectedRows={[]}
          handleChangeSelectedRow={() => {
            ;('')
          }}
          handleChangeAllSelectedRows={() => {
            ;('')
          }}
          typeCodeData={data.data.typeCodes[0].elements as GraphQlTypeCodeElement[]}
          typeCodeLoading={false}
        />
      </MockedProvider>,
    )
    expect(await screen.findByTestId('type-code-selection-table')).toBeInTheDocument()
    // expect(await screen.findByText('/')).toBeInTheDocument()
    // expect(await screen.findByText('/code')).toBeInTheDocument()
    expect(await screen.findByText('s2')).toBeInTheDocument()
    expect(await screen.findByText('s3')).toBeInTheDocument()
    expect(await screen.findByText('code')).toBeInTheDocument()
    expect(await screen.findByText('code2')).toBeInTheDocument()
  })
})
