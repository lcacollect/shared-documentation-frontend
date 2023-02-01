import { GraphQlProjectSource } from '../../dataAccess'

export type SourceData = Pick<GraphQlProjectSource, 'id' | 'name' | 'data' | 'interpretation' | 'type'>
