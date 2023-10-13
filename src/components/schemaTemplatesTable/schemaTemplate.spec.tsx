import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { SchemaTemplatesTable } from './schemaTemplatesTable'

describe('SchemaTemplate', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SchemaTemplatesTable
          schemaTemplates={[]}
          loading={false}
          openCreateTemplateDialog={false}
          setOpenCreateTemplateDialog={() => {
            ;('')
          }}
          openAddTypecodeDialog={false}
          setOpenAddTypecodeDialog={() => {
            ;('')
          }}
        />
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('templates-table')).toBeDefined()
  })
})
