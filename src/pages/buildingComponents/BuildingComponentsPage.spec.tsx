import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { projectSources } from '../../__mocks__'
import { BuildingComponentsPage } from './BuildingComponentsPage'

describe('Building Components Page', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={projectSources} addTypename={false}>
        <BuildingComponentsPage />
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    expect(screen.getByTestId('building-components-page')).toBeDefined()
    expect(await screen.findByText('Building Components')).toBeInTheDocument()
    expect(baseElement).toBeTruthy()
  })
})
