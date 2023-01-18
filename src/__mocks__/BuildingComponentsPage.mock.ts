import getProjectSourcesResult from './getProjectSources'
import { MockedResponse } from '@apollo/client/testing'
import { GetProjectSourcesDocument } from '../dataAccess'

export const projectSources: MockedResponse[] = [
  {
    request: {
      query: GetProjectSourcesDocument,
      variables: { projectId: 'null' },
    },
    result: getProjectSourcesResult,
  },
]

export const projectSourcesError: MockedResponse[] = [
  {
    request: {
      query: GetProjectSourcesDocument,
      variables: { projectId: 'null' },
    },
    error: new Error('An error occurred'),
  },
]
