import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { CreateTemplateDialog } from './createTemplateDialog'
import { TypeCodes } from '../../__mocks__/schemaTemplate.mock'
import data from '../../__mocks__/schemaTemplates'

describe('CreateTemplateDialog', () => {
  it('should render Create dialog', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={[TypeCodes]} addTypename={false}>
        <CreateTemplateDialog
          open={true}
          handleClose={() => {
            ;('')
          }}
          editTemplate={null}
          setEditTemplate={() => {
            ;('')
          }}
        />
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    expect(await screen.findByText('Create new template')).toBeInTheDocument()
    expect(await screen.findByText('Name for template')).toBeInTheDocument()
    expect(await screen.findByText('Typecode')).toBeInTheDocument()
    expect(await screen.findByText('Template')).toBeInTheDocument()
  }),
    it('should render Edit dialog', async () => {
      const { baseElement } = render(
        <MockedProvider mocks={[TypeCodes]} addTypename={false}>
          <CreateTemplateDialog
            open={true}
            handleClose={() => {
              ;('')
            }}
            editTemplate={data.schemaTemplates[1]}
            setEditTemplate={() => {
              ;('')
            }}
          />
        </MockedProvider>,
      )
      expect(baseElement).toBeDefined()
      expect(await screen.findByText('Edit template')).toBeInTheDocument()
      expect(await screen.findByText('Name for template')).toBeInTheDocument()
      expect(await screen.findByText('Typecode')).toBeInTheDocument()
      expect(await screen.findByText('Template')).toBeInTheDocument()
    })
})
