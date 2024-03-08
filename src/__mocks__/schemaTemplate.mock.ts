import typeCodes from './typeCodes'
import { MockedResponse } from '@apollo/client/testing'
import { GetTypeCodesDocument } from '../dataAccess'

export const TypeCodes: MockedResponse = {
  request: {
    query: GetTypeCodesDocument,
    variables: { filters: { domain: { isAnyOf: ['default', ''] } } },
  },
  result: typeCodes,
}
