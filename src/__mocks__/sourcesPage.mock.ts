import getProjectSourcesResponse from './getProjectSources'
import { MockedResponse } from '@apollo/client/testing'
import { GetProjectSourcesDocument } from '../dataAccess'

export const sourcesPageMock: MockedResponse[] = [
  {
    request: {
      query: GetProjectSourcesDocument,
      variables: { projectId: '741dfc36-23fa-4582-8746-1879fddab9c7' },
    },
    result: getProjectSourcesResponse,
  },
]
