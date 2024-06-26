import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date (isoformat) */
  Date: any
  /** Date with time (isoformat) */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  _FieldSet: any
}

export type AssemblyAddInput = {
  category: Scalars['String']
  conversionFactor?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  lifeTime?: InputMaybe<Scalars['Float']>
  metaFields?: InputMaybe<Scalars['JSON']>
  name: Scalars['String']
  source?: InputMaybe<Scalars['String']>
  unit: GraphQlAssemblyUnit
}

export type AssemblyFilters = {
  category?: InputMaybe<FilterOptions>
  description?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  lifeTime?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  source?: InputMaybe<FilterOptions>
}

export type AssemblyLayerInput = {
  conversionFactor?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  epdId: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  referenceServiceLife?: InputMaybe<Scalars['Int']>
  transportConversionFactor?: InputMaybe<Scalars['Float']>
  transportDistance?: InputMaybe<Scalars['Float']>
  transportEpdId?: InputMaybe<Scalars['String']>
}

export type AssemblyLayerUpdateInput = {
  conversionFactor?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  epdId: Scalars['String']
  id: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  referenceServiceLife?: InputMaybe<Scalars['Int']>
  transportConversionFactor?: InputMaybe<Scalars['Float']>
  transportDistance?: InputMaybe<Scalars['Float']>
  transportEpdId?: InputMaybe<Scalars['String']>
}

export type AssemblyUpdateInput = {
  category?: InputMaybe<Scalars['String']>
  conversionFactor?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  lifeTime?: InputMaybe<Scalars['Float']>
  metaFields?: InputMaybe<Scalars['JSON']>
  name?: InputMaybe<Scalars['String']>
  source?: InputMaybe<Scalars['String']>
  unit?: InputMaybe<GraphQlAssemblyUnit>
}

export enum AssigneeType {
  ProjectGroup = 'PROJECT_GROUP',
  ProjectMember = 'PROJECT_MEMBER',
  User = 'USER',
}

export type CommentFilters = {
  added?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  text?: InputMaybe<FilterOptions>
}

export type CommitFilters = {
  added?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  shortId?: InputMaybe<FilterOptions>
}

export type EpdFilters = {
  category?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  isTransport?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  owner?: InputMaybe<FilterOptions>
  region?: InputMaybe<FilterOptions>
  source?: InputMaybe<FilterOptions>
  type?: InputMaybe<FilterOptions>
  unit?: InputMaybe<FilterOptions>
}

export type EpdSort = {
  category?: InputMaybe<SortOptions>
  isTransport?: InputMaybe<SortOptions>
  name?: InputMaybe<SortOptions>
  owner?: InputMaybe<SortOptions>
  region?: InputMaybe<SortOptions>
  source?: InputMaybe<SortOptions>
  type?: InputMaybe<SortOptions>
  unit?: InputMaybe<SortOptions>
}

export type FilterOptions = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equal?: InputMaybe<Scalars['String']>
  isAnyOf?: InputMaybe<Array<Scalars['String']>>
  isEmpty?: InputMaybe<Scalars['Boolean']>
  isNotEmpty?: InputMaybe<Scalars['Boolean']>
  isTrue?: InputMaybe<Scalars['Boolean']>
  jsonContains?: InputMaybe<Scalars['String']>
  startsWith?: InputMaybe<Scalars['String']>
}

export type GraphQlAddEpdInput = {
  ap?: InputMaybe<Scalars['JSON']>
  comment?: InputMaybe<Scalars['String']>
  conversions?: InputMaybe<Scalars['JSON']>
  declaredUnit: GraphQlUnit
  ep?: InputMaybe<Scalars['JSON']>
  gwp?: InputMaybe<Scalars['JSON']>
  id?: InputMaybe<Scalars['String']>
  location: Scalars['String']
  metaData?: InputMaybe<Scalars['JSON']>
  name: Scalars['String']
  odp?: InputMaybe<Scalars['JSON']>
  penre?: InputMaybe<Scalars['JSON']>
  pere?: InputMaybe<Scalars['JSON']>
  pocp?: InputMaybe<Scalars['JSON']>
  publishedDate: Scalars['Date']
  referenceServiceLife?: InputMaybe<Scalars['Int']>
  source: Scalars['JSON']
  subtype: Scalars['String']
  validUntil: Scalars['Date']
  version: Scalars['String']
}

export type GraphQlAssembly = {
  __typename?: 'GraphQLAssembly'
  category: Scalars['String']
  conversionFactor: Scalars['Float']
  description?: Maybe<Scalars['String']>
  gwp: Scalars['Float']
  id: Scalars['String']
  layers: Array<Maybe<GraphQlAssemblyLayer>>
  lifeTime: Scalars['Float']
  metaFields?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  source: Scalars['String']
  unit: GraphQlAssemblyUnit
}

export type GraphQlAssemblyGwpArgs = {
  phases?: InputMaybe<Array<Scalars['String']>>
}

export type GraphQlAssemblyLayer = {
  __typename?: 'GraphQLAssemblyLayer'
  conversionFactor?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  epd: GraphQlProjectEpd
  epdId: Scalars['String']
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  referenceServiceLife?: Maybe<Scalars['Int']>
  transportConversionFactor: Scalars['Float']
  transportDistance?: Maybe<Scalars['Float']>
  transportEpd?: Maybe<GraphQlProjectEpd>
}

export enum GraphQlAssemblyUnit {
  Kg = 'kg',
  M = 'm',
  M2 = 'm2',
  M3 = 'm3',
  Pcs = 'pcs',
}

export type GraphQlAssignee = {
  id: Scalars['String']
  type: AssigneeType
}

export type GraphQlComment = {
  __typename?: 'GraphQLComment'
  added: Scalars['DateTime']
  author?: Maybe<GraphQlProjectMember>
  authorId: Scalars['String']
  id: Scalars['ID']
  task: GraphQlTask
  text: Scalars['String']
}

export type GraphQlCommit = {
  __typename?: 'GraphQLCommit'
  added: Scalars['Date']
  authorId?: Maybe<Scalars['String']>
  id: Scalars['String']
  parentId?: Maybe<Scalars['String']>
  reportingSchemaId: Scalars['String']
  repositoryId: Scalars['String']
  schemaCategories?: Maybe<Array<GraphQlSchemaCategory>>
  schemaElements?: Maybe<Array<GraphQlSchemaElement>>
  shortId: Scalars['String']
  tags?: Maybe<Array<GraphQlTag>>
  tasks?: Maybe<Array<GraphQlTask>>
}

export type GraphQlConversion = {
  __typename?: 'GraphQLConversion'
  to: GraphQlUnit
  value: Scalars['Float']
}

export type GraphQlepd = {
  __typename?: 'GraphQLEPD'
  ap?: Maybe<GraphQlImpactCategories>
  comment?: Maybe<Scalars['String']>
  conversions: Array<GraphQlConversion>
  declaredUnit?: Maybe<Scalars['String']>
  ep?: Maybe<GraphQlImpactCategories>
  gwp?: Maybe<GraphQlImpactCategories>
  id: Scalars['String']
  isTransport: Scalars['Boolean']
  location: Scalars['String']
  metaFields?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  odp?: Maybe<GraphQlImpactCategories>
  originId?: Maybe<Scalars['String']>
  penre?: Maybe<GraphQlImpactCategories>
  pere?: Maybe<GraphQlImpactCategories>
  pocp?: Maybe<GraphQlImpactCategories>
  publishedDate: Scalars['Date']
  referenceServiceLife?: Maybe<Scalars['Int']>
  source: Scalars['String']
  subtype: Scalars['String']
  validUntil: Scalars['Date']
  version: Scalars['String']
}

export type GraphQlepdBase = {
  __typename?: 'GraphQLEPDBase'
  ap?: Maybe<GraphQlImpactCategories>
  comment?: Maybe<Scalars['String']>
  conversions: Array<GraphQlConversion>
  declaredUnit?: Maybe<Scalars['String']>
  ep?: Maybe<GraphQlImpactCategories>
  gwp?: Maybe<GraphQlImpactCategories>
  id: Scalars['String']
  isTransport: Scalars['Boolean']
  location: Scalars['String']
  metaFields?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  odp?: Maybe<GraphQlImpactCategories>
  penre?: Maybe<GraphQlImpactCategories>
  pere?: Maybe<GraphQlImpactCategories>
  pocp?: Maybe<GraphQlImpactCategories>
  publishedDate: Scalars['Date']
  referenceServiceLife?: Maybe<Scalars['Int']>
  source: Scalars['String']
  subtype: Scalars['String']
  validUntil: Scalars['Date']
  version: Scalars['String']
}

export type GraphQlepdConnection = {
  __typename?: 'GraphQLEPDConnection'
  edges: Array<GraphQlepdEdge>
  numEdges: Scalars['Int']
  pageInfo: PageInfo
}

export type GraphQlepdEdge = {
  __typename?: 'GraphQLEPDEdge'
  cursor: Scalars['String']
  node: GraphQlepd
}

export type GraphQlImpactCategories = {
  __typename?: 'GraphQLImpactCategories'
  a1a3?: Maybe<Scalars['Float']>
  a4?: Maybe<Scalars['Float']>
  a5?: Maybe<Scalars['Float']>
  b1?: Maybe<Scalars['Float']>
  b2?: Maybe<Scalars['Float']>
  b3?: Maybe<Scalars['Float']>
  b4?: Maybe<Scalars['Float']>
  b5?: Maybe<Scalars['Float']>
  b6?: Maybe<Scalars['Float']>
  b7?: Maybe<Scalars['Float']>
  c1?: Maybe<Scalars['Float']>
  c2?: Maybe<Scalars['Float']>
  c3?: Maybe<Scalars['Float']>
  c4?: Maybe<Scalars['Float']>
  d?: Maybe<Scalars['Float']>
}

export type GraphQlLifeCycleStage = {
  __typename?: 'GraphQLLifeCycleStage'
  category: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
  phase: Scalars['String']
}

export type GraphQlProject = {
  __typename?: 'GraphQLProject'
  address?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  client?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  domain?: Maybe<ProjectDomain>
  groups?: Maybe<Array<GraphQlProjectGroup>>
  id: Scalars['String']
  imageUrl?: Maybe<Scalars['String']>
  members?: Maybe<Array<GraphQlProjectMember>>
  metaFields?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  projectId?: Maybe<Scalars['ID']>
  public: Scalars['Boolean']
  stages?: Maybe<Array<GraphQlProjectStage>>
}

export type GraphQlProjectAssembly = {
  __typename?: 'GraphQLProjectAssembly'
  category: Scalars['String']
  conversionFactor: Scalars['Float']
  description?: Maybe<Scalars['String']>
  gwp: Scalars['Float']
  id: Scalars['String']
  layers: Array<GraphQlAssemblyLayer>
  lifeTime: Scalars['Float']
  metaFields?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  projectId: Scalars['String']
  unit: GraphQlAssemblyUnit
}

export type GraphQlProjectAssemblyGwpArgs = {
  phases?: InputMaybe<Array<Scalars['String']>>
}

export type GraphQlProjectEpd = {
  __typename?: 'GraphQLProjectEPD'
  ap?: Maybe<GraphQlImpactCategories>
  assemblies?: Maybe<Array<GraphQlProjectAssembly>>
  comment?: Maybe<Scalars['String']>
  conversions: Array<GraphQlConversion>
  declaredUnit?: Maybe<Scalars['String']>
  ep?: Maybe<GraphQlImpactCategories>
  gwp?: Maybe<GraphQlImpactCategories>
  id: Scalars['String']
  isTransport: Scalars['Boolean']
  location: Scalars['String']
  metaFields?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  odp?: Maybe<GraphQlImpactCategories>
  originId: Scalars['String']
  penre?: Maybe<GraphQlImpactCategories>
  pere?: Maybe<GraphQlImpactCategories>
  pocp?: Maybe<GraphQlImpactCategories>
  projectId: Scalars['ID']
  publishedDate: Scalars['Date']
  referenceServiceLife?: Maybe<Scalars['Int']>
  source: Scalars['String']
  subtype: Scalars['String']
  validUntil: Scalars['Date']
  version: Scalars['String']
}

export type GraphQlProjectGroup = {
  __typename?: 'GraphQLProjectGroup'
  id: Scalars['ID']
  lead?: Maybe<GraphQlProjectMember>
  leadId?: Maybe<Scalars['String']>
  members?: Maybe<Array<GraphQlProjectMember>>
  name: Scalars['String']
  projectId: Scalars['String']
}

export type GraphQlProjectMember = {
  __typename?: 'GraphQLProjectMember'
  company?: Maybe<Scalars['String']>
  email: Scalars['String']
  id: Scalars['ID']
  lastLogin?: Maybe<Scalars['Date']>
  leaderOf?: Maybe<Array<GraphQlProjectGroup>>
  name: Scalars['String']
  projectGroups?: Maybe<Array<GraphQlProjectGroup>>
  projectId: Scalars['ID']
  userId: Scalars['String']
}

export type GraphQlProjectMemberGraphQlProjectGroup = GraphQlProjectGroup | GraphQlProjectMember

export type GraphQlProjectSource = {
  __typename?: 'GraphQLProjectSource'
  author: GraphQlProjectMember
  authorId: Scalars['String']
  data?: Maybe<GraphQlSourceFile>
  dataId: Scalars['String']
  elements?: Maybe<Array<GraphQlSchemaElement>>
  fileUrl?: Maybe<Scalars['String']>
  id: Scalars['ID']
  interpretation: Scalars['JSON']
  metaFields: Scalars['JSON']
  name: Scalars['String']
  projectId: Scalars['String']
  type: ProjectSourceType
  updated: Scalars['DateTime']
}

export type GraphQlProjectStage = {
  __typename?: 'GraphQLProjectStage'
  category: Scalars['String']
  name: Scalars['String']
  phase: Scalars['String']
  projectId: Scalars['String']
  stageId: Scalars['String']
}

export type GraphQlReportingCreationSchema = {
  __typename?: 'GraphQLReportingCreationSchema'
  id: Scalars['String']
  name: Scalars['String']
  projectId?: Maybe<Scalars['String']>
}

export type GraphQlReportingSchema = {
  __typename?: 'GraphQLReportingSchema'
  categories?: Maybe<Array<GraphQlSchemaCategory>>
  id: Scalars['String']
  name: Scalars['String']
  projectId: Scalars['String']
  templateId?: Maybe<Scalars['String']>
}

export type GraphQlSchemaCategory = {
  __typename?: 'GraphQLSchemaCategory'
  commits?: Maybe<Array<GraphQlCommit>>
  description?: Maybe<Scalars['String']>
  elements?: Maybe<Array<GraphQlSchemaElement>>
  id: Scalars['ID']
  reportingSchema: GraphQlReportingSchema
  reportingSchemaId?: Maybe<Scalars['String']>
  typeCodeElement?: Maybe<GraphQlTypeCodeElement>
  typeCodeElementId?: Maybe<Scalars['String']>
}

export type GraphQlSchemaElement = {
  __typename?: 'GraphQLSchemaElement'
  assembly?: Maybe<GraphQlProjectAssembly>
  assemblyId?: Maybe<Scalars['String']>
  commits: Array<GraphQlCommit>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  quantity: Scalars['Float']
  result?: Maybe<Scalars['JSON']>
  schemaCategory: GraphQlSchemaCategory
  source?: Maybe<GraphQlProjectSource>
  unit: Unit
}

export type GraphQlSchemaElementGraphQlSchemaCategory = GraphQlSchemaCategory | GraphQlSchemaElement

export type GraphQlSchemaTemplate = {
  __typename?: 'GraphQLSchemaTemplate'
  domain?: Maybe<Scalars['String']>
  id: Scalars['String']
  name: Scalars['String']
  original?: Maybe<GraphQlReportingSchema>
}

export type GraphQlSourceFile = {
  __typename?: 'GraphQLSourceFile'
  headers: Array<Scalars['String']>
  rows: Scalars['JSON']
}

export type GraphQlTag = {
  __typename?: 'GraphQLTag'
  added: Scalars['Date']
  authorId: Scalars['String']
  commit: GraphQlCommit
  commitId: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
  shortId: Scalars['String']
}

export type GraphQlTask = {
  __typename?: 'GraphQLTask'
  assignedGroupId?: Maybe<Scalars['String']>
  assignee: GraphQlProjectMemberGraphQlProjectGroup
  assigneeId?: Maybe<Scalars['String']>
  author: GraphQlProjectMember
  authorId: Scalars['String']
  comments?: Maybe<Array<GraphQlComment>>
  commits: Array<GraphQlCommit>
  description: Scalars['String']
  dueDate: Scalars['Date']
  id: Scalars['ID']
  item: GraphQlSchemaElementGraphQlSchemaCategory
  name: Scalars['String']
  reportingSchema: GraphQlReportingSchema
  reportingSchemaId: Scalars['String']
  status: TaskStatus
}

export type GraphQlTypeCode = {
  __typename?: 'GraphQLTypeCode'
  elements: Array<GraphQlTypeCodeElement>
  id: Scalars['String']
  name: Scalars['String']
}

export type GraphQlTypeCodeElement = {
  __typename?: 'GraphQLTypeCodeElement'
  code: Scalars['String']
  id: Scalars['String']
  level: Scalars['Int']
  name: Scalars['String']
  parentCode: Scalars['String']
  parentPath: Scalars['String']
}

export type GraphQlTypeCodeElementInput = {
  id: Scalars['String']
  parentPath: Scalars['String']
}

export enum GraphQlUnit {
  Kg = 'KG',
  L = 'L',
  M = 'M',
  M2 = 'M2',
  M2R1 = 'M2R1',
  M3 = 'M3',
  Pcs = 'PCS',
  Tones = 'TONES',
  TonesKm = 'TONES_KM',
  Unknown = 'UNKNOWN',
}

export type GraphQlUserAccount = {
  __typename?: 'GraphQLUserAccount'
  blobSasToken: Scalars['String']
  email: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
  roles: Array<Scalars['String']>
  tenantId: Scalars['String']
}

export type LifeCycleStageInput = {
  stageId: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Add Assemblies */
  addAssemblies: Array<GraphQlAssembly>
  /** Add layers to an Assembly */
  addAssemblyLayers: Array<GraphQlAssemblyLayer>
  /** Add a comment to a task */
  addComment: GraphQlComment
  /** Add Global EPDs. */
  addEpds: Array<GraphQlepd>
  /** Add a Project */
  addProject: GraphQlProject
  /** Add Project Assemblies */
  addProjectAssemblies: Array<GraphQlProjectAssembly>
  /** Add Project Assemblies from Assemblies */
  addProjectAssembliesFromAssemblies: Array<GraphQlProjectAssembly>
  /** Add layers to an Assembly */
  addProjectAssemblyLayers: Array<GraphQlAssemblyLayer>
  /** Add Global EPDs to a project. */
  addProjectEpds: Array<GraphQlProjectEpd>
  /** Add a Project Group */
  addProjectGroup: GraphQlProjectGroup
  /** Add a Project Member */
  addProjectMember: GraphQlProjectMember
  /** Add Project Members to an existing Project Group */
  addProjectMembersToGroup: GraphQlProjectGroup
  /** Add a Project Source */
  addProjectSource: GraphQlProjectSource
  /** Add a life cycle stage to a project */
  addProjectStage: GraphQlProjectStage
  /**
   * Add a Reporting Schema to a project.
   * Concurrently updates the Schema Template to
   * hold the Reporting Schema.
   */
  addReportingSchema: GraphQlReportingCreationSchema
  /**
   * Add a Reporting Schema to a project.
   * Concurrently updates the Schema Template to
   * hold the Reporting Schema.
   */
  addReportingSchemaFromTemplate: GraphQlReportingCreationSchema
  /** Add a Schema Category to a Reporting Schema */
  addSchemaCategory: GraphQlSchemaCategory
  /** Add a Schema Element to a Schema Category */
  addSchemaElement: GraphQlSchemaElement
  /** Add a Schema Element to a Schema Category */
  addSchemaElementFromSource: Array<GraphQlSchemaElement>
  /** Add a Schema Template */
  addSchemaTemplate: GraphQlSchemaTemplate
  /** Add a Task to a Reporting Schema */
  addTask: GraphQlTask
  /** Add a new tag. */
  createTag: GraphQlTag
  /** Add a new typeCodeElement */
  createTypeCodeElement: GraphQlTypeCodeElement
  /** Add a new typeCodeElement from csv file */
  createTypeCodeElementFromSource: Scalars['String']
  /** Delete Assemblies */
  deleteAssemblies: Array<Scalars['ID']>
  /** Delete layers from an Assembly */
  deleteAssemblyLayers: Array<Scalars['String']>
  /** Delete a comment */
  deleteComment: Scalars['String']
  /** Delete a global EPD */
  deleteEpds: Array<Scalars['String']>
  /** Delete a project */
  deleteProject: Scalars['String']
  /** Delete Project Assemblies */
  deleteProjectAssemblies: Array<Scalars['ID']>
  /** Delete layers from an Assembly */
  deleteProjectAssemblyLayers: Array<Scalars['String']>
  /** Delete a project EPD */
  deleteProjectEpds: Array<Scalars['String']>
  /** Delete a project group */
  deleteProjectGroup: Scalars['String']
  /** Delete a Project Member */
  deleteProjectMember: Scalars['String']
  /** Delete a project source */
  deleteProjectSource: Scalars['String']
  /** Remove a life cycle stage from a project */
  deleteProjectStage: Scalars['String']
  /** Delete a Reporting Schema */
  deleteReportingSchema: Scalars['String']
  /** Delete a Schema Category */
  deleteSchemaCategory: Scalars['String']
  /** Delete a Schema Element */
  deleteSchemaElement: Scalars['String']
  /** Delete a Schema Template */
  deleteSchemaTemplate: Scalars['String']
  /** Delete a tag */
  deleteTag: Scalars['String']
  /** Delete a Task */
  deleteTask: Scalars['String']
  /** Delete a TypeCodeElement */
  deleteTypeCodeElement: Scalars['String']
  /** Remove Project Members from an existing Project Group */
  removeProjectMembersFromGroup: GraphQlProjectGroup
  /** Update Assemblies */
  updateAssemblies: Array<GraphQlAssembly>
  updateAssemblyLayers: Array<GraphQlAssemblyLayer>
  /** Update a task comment */
  updateComment: GraphQlComment
  /** Update a Project */
  updateProject: GraphQlProject
  /** Update Project Assemblies */
  updateProjectAssemblies: Array<GraphQlProjectAssembly>
  updateProjectAssemblyLayers: Array<GraphQlAssemblyLayer>
  /** Update a Project Group */
  updateProjectGroup: GraphQlProjectGroup
  /** Update a Project Source */
  updateProjectSource: GraphQlProjectSource
  /** Update a Reporting Schema */
  updateReportingSchema: GraphQlReportingSchema
  /** Update a Schema Category */
  updateSchemaCategory: GraphQlSchemaCategory
  /** Update Schema Elements */
  updateSchemaElements: Array<GraphQlSchemaElement>
  /** Update a Schema Template */
  updateSchemaTemplate: GraphQlSchemaTemplate
  /** Change the name of the tag or move it to a different commit. */
  updateTag: GraphQlTag
  /** Update a Task */
  updateTask: GraphQlTask
  /** update typeCodeElement */
  updateTypeCodeElement: GraphQlTypeCodeElement
}

export type MutationAddAssembliesArgs = {
  assemblies: Array<AssemblyAddInput>
}

export type MutationAddAssemblyLayersArgs = {
  id: Scalars['ID']
  layers: Array<AssemblyLayerInput>
}

export type MutationAddCommentArgs = {
  taskId: Scalars['String']
  text: Scalars['String']
}

export type MutationAddEpdsArgs = {
  epds: Array<GraphQlAddEpdInput>
}

export type MutationAddProjectArgs = {
  address?: InputMaybe<Scalars['String']>
  city?: InputMaybe<Scalars['String']>
  client?: InputMaybe<Scalars['String']>
  country?: InputMaybe<Scalars['String']>
  domain?: InputMaybe<ProjectDomain>
  file?: InputMaybe<Scalars['String']>
  groups?: InputMaybe<Array<ProjectGroupInput>>
  members?: InputMaybe<Array<ProjectMemberInput>>
  metaFields?: InputMaybe<Scalars['JSON']>
  name: Scalars['String']
  projectId?: InputMaybe<Scalars['String']>
  public?: InputMaybe<Scalars['Boolean']>
  stages?: InputMaybe<Array<LifeCycleStageInput>>
}

export type MutationAddProjectAssembliesArgs = {
  assemblies: Array<ProjectAssemblyAddInput>
}

export type MutationAddProjectAssembliesFromAssembliesArgs = {
  assemblies: Array<Scalars['ID']>
  projectId: Scalars['ID']
}

export type MutationAddProjectAssemblyLayersArgs = {
  id: Scalars['ID']
  layers: Array<AssemblyLayerInput>
}

export type MutationAddProjectEpdsArgs = {
  epdIds: Array<Scalars['String']>
  projectId: Scalars['String']
}

export type MutationAddProjectGroupArgs = {
  leadId?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  projectId: Scalars['String']
}

export type MutationAddProjectMemberArgs = {
  email: Scalars['String']
  name: Scalars['String']
  projectGroupIds: Array<Scalars['String']>
  projectId: Scalars['String']
}

export type MutationAddProjectMembersToGroupArgs = {
  groupId: Scalars['String']
  memberIds: Array<Scalars['String']>
}

export type MutationAddProjectSourceArgs = {
  dataId?: InputMaybe<Scalars['String']>
  file?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  projectId: Scalars['String']
  speckleUrl?: InputMaybe<Scalars['String']>
  type: ProjectSourceType
}

export type MutationAddProjectStageArgs = {
  projectId: Scalars['String']
  stageId: Scalars['String']
}

export type MutationAddReportingSchemaArgs = {
  name?: InputMaybe<Scalars['String']>
  projectId: Scalars['String']
  templateId: Scalars['String']
}

export type MutationAddReportingSchemaFromTemplateArgs = {
  name?: InputMaybe<Scalars['String']>
  projectId: Scalars['String']
  templateId: Scalars['String']
}

export type MutationAddSchemaCategoryArgs = {
  description?: InputMaybe<Scalars['String']>
  reportingSchemaId: Scalars['String']
  typeCodeElementId: Scalars['String']
}

export type MutationAddSchemaElementArgs = {
  assemblyId?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  name: Scalars['String']
  quantity: Scalars['Float']
  schemaCategoryId: Scalars['String']
  unit: Unit
}

export type MutationAddSchemaElementFromSourceArgs = {
  objectIds: Array<Scalars['String']>
  quantities?: InputMaybe<Array<Scalars['Float']>>
  schemaCategoryIds: Array<Scalars['String']>
  sourceId: Scalars['String']
  units?: InputMaybe<Array<Unit>>
}

export type MutationAddSchemaTemplateArgs = {
  domain?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  typeCodes?: InputMaybe<Array<GraphQlTypeCodeElementInput>>
}

export type MutationAddTaskArgs = {
  assignee?: InputMaybe<GraphQlAssignee>
  description: Scalars['String']
  dueDate: Scalars['Date']
  item: TaskItem
  name: Scalars['String']
  reportingSchemaId: Scalars['String']
  status: TaskStatus
}

export type MutationCreateTagArgs = {
  commitId: Scalars['String']
  name: Scalars['String']
}

export type MutationCreateTypeCodeElementArgs = {
  code: Scalars['String']
  level: Scalars['Int']
  name: Scalars['String']
  parentPath?: Scalars['String']
}

export type MutationCreateTypeCodeElementFromSourceArgs = {
  domain?: InputMaybe<Scalars['String']>
  file: Scalars['String']
  name: Scalars['String']
}

export type MutationDeleteAssembliesArgs = {
  ids: Array<Scalars['ID']>
}

export type MutationDeleteAssemblyLayersArgs = {
  id: Scalars['ID']
  layers: Array<Scalars['ID']>
}

export type MutationDeleteCommentArgs = {
  id: Scalars['String']
}

export type MutationDeleteEpdsArgs = {
  ids: Array<Scalars['String']>
}

export type MutationDeleteProjectArgs = {
  id: Scalars['String']
}

export type MutationDeleteProjectAssembliesArgs = {
  ids: Array<Scalars['ID']>
}

export type MutationDeleteProjectAssemblyLayersArgs = {
  id: Scalars['ID']
  layers: Array<Scalars['ID']>
}

export type MutationDeleteProjectEpdsArgs = {
  ids: Array<Scalars['String']>
}

export type MutationDeleteProjectGroupArgs = {
  id: Scalars['String']
}

export type MutationDeleteProjectMemberArgs = {
  id: Scalars['String']
}

export type MutationDeleteProjectSourceArgs = {
  id: Scalars['String']
}

export type MutationDeleteProjectStageArgs = {
  projectId: Scalars['String']
  stageId: Scalars['String']
}

export type MutationDeleteReportingSchemaArgs = {
  id: Scalars['String']
}

export type MutationDeleteSchemaCategoryArgs = {
  id: Scalars['String']
}

export type MutationDeleteSchemaElementArgs = {
  id: Scalars['String']
}

export type MutationDeleteSchemaTemplateArgs = {
  id: Scalars['String']
}

export type MutationDeleteTagArgs = {
  id: Scalars['String']
}

export type MutationDeleteTaskArgs = {
  id: Scalars['String']
}

export type MutationDeleteTypeCodeElementArgs = {
  id: Scalars['String']
}

export type MutationRemoveProjectMembersFromGroupArgs = {
  groupId: Scalars['String']
  memberIds: Array<Scalars['String']>
}

export type MutationUpdateAssembliesArgs = {
  assemblies: Array<AssemblyUpdateInput>
}

export type MutationUpdateAssemblyLayersArgs = {
  id: Scalars['ID']
  layers: Array<AssemblyLayerUpdateInput>
}

export type MutationUpdateCommentArgs = {
  id: Scalars['String']
  text: Scalars['String']
}

export type MutationUpdateProjectArgs = {
  address?: InputMaybe<Scalars['String']>
  city?: InputMaybe<Scalars['String']>
  client?: InputMaybe<Scalars['String']>
  country?: InputMaybe<Scalars['String']>
  domain?: InputMaybe<ProjectDomain>
  file?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  metaFields?: InputMaybe<Scalars['JSON']>
  name?: InputMaybe<Scalars['String']>
  projectId?: InputMaybe<Scalars['String']>
  public?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateProjectAssembliesArgs = {
  assemblies: Array<ProjectAssemblyUpdateInput>
}

export type MutationUpdateProjectAssemblyLayersArgs = {
  id: Scalars['ID']
  layers: Array<AssemblyLayerUpdateInput>
}

export type MutationUpdateProjectGroupArgs = {
  id: Scalars['String']
  leadId?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type MutationUpdateProjectSourceArgs = {
  dataId?: InputMaybe<Scalars['String']>
  file?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  interpretation?: InputMaybe<Scalars['JSON']>
  metaFields?: InputMaybe<Scalars['JSON']>
  name?: InputMaybe<Scalars['String']>
  speckleUrl?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ProjectSourceType>
}

export type MutationUpdateReportingSchemaArgs = {
  id: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  projectId?: InputMaybe<Scalars['String']>
}

export type MutationUpdateSchemaCategoryArgs = {
  description?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  typeCodeElementId?: InputMaybe<Scalars['String']>
}

export type MutationUpdateSchemaElementsArgs = {
  schemaElements: Array<SchemaElementUpdateInput>
}

export type MutationUpdateSchemaTemplateArgs = {
  domain?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  typeCodes?: InputMaybe<Array<GraphQlTypeCodeElementInput>>
}

export type MutationUpdateTagArgs = {
  commitId?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  name?: InputMaybe<Scalars['String']>
}

export type MutationUpdateTaskArgs = {
  assignedGroupId?: InputMaybe<Scalars['String']>
  assignee?: InputMaybe<GraphQlAssignee>
  description?: InputMaybe<Scalars['String']>
  dueDate?: InputMaybe<Scalars['Date']>
  id: Scalars['String']
  item?: InputMaybe<TaskItem>
  name?: InputMaybe<Scalars['String']>
  status?: InputMaybe<TaskStatus>
}

export type MutationUpdateTypeCodeElementArgs = {
  code?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  level?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  parentPath?: InputMaybe<Scalars['String']>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type ProjectAssemblyAddInput = {
  category: Scalars['String']
  conversionFactor?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  lifeTime?: InputMaybe<Scalars['Float']>
  metaFields?: InputMaybe<Scalars['JSON']>
  name: Scalars['String']
  projectId: Scalars['String']
  unit: GraphQlAssemblyUnit
}

export type ProjectAssemblyUpdateInput = {
  category?: InputMaybe<Scalars['String']>
  conversionFactor?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  lifeTime?: InputMaybe<Scalars['Float']>
  metaFields?: InputMaybe<Scalars['JSON']>
  name?: InputMaybe<Scalars['String']>
  unit?: InputMaybe<GraphQlAssemblyUnit>
}

export enum ProjectDomain {
  Buildings = 'buildings',
  Energy = 'energy',
  Infrastructure = 'infrastructure',
  Tunnels = 'tunnels',
}

export type ProjectEpdFilters = {
  category?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  isTransport?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  owner?: InputMaybe<FilterOptions>
  projectId?: InputMaybe<FilterOptions>
  region?: InputMaybe<FilterOptions>
  source?: InputMaybe<FilterOptions>
  type?: InputMaybe<FilterOptions>
  unit?: InputMaybe<SortOptions>
}

export type ProjectFilters = {
  id?: InputMaybe<FilterOptions>
  metaFields?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  projectId?: InputMaybe<FilterOptions>
}

export type ProjectGroupFilters = {
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  projectId?: InputMaybe<FilterOptions>
}

export type ProjectGroupInput = {
  id: Scalars['String']
  leadId: Scalars['String']
  name: Scalars['String']
}

export type ProjectMemberFilters = {
  company?: InputMaybe<FilterOptions>
  email?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  projectId?: InputMaybe<FilterOptions>
  userId?: InputMaybe<FilterOptions>
}

export type ProjectMemberInput = {
  userId: Scalars['String']
}

export type ProjectSourceFilters = {
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  projectId?: InputMaybe<FilterOptions>
}

export enum ProjectSourceType {
  Csv = 'CSV',
  Speckle = 'SPECKLE',
  Xlsx = 'XLSX',
}

export type Query = {
  __typename?: 'Query'
  /** Get current user */
  account: GraphQlUserAccount
  /** Get assemblies */
  assemblies: Array<GraphQlAssembly>
  /** Query all comments of a task */
  comments: Array<GraphQlComment>
  /** Get all commits of a Reporting Schema */
  commits: Array<GraphQlCommit>
  epds: GraphQlepdConnection
  /** Resolver for exporting the database contents as a base64 encoded string. */
  exportReportingSchema: Scalars['String']
  /** Get all life cycle stages */
  lifeCycleStages: Array<GraphQlLifeCycleStage>
  /** Get project assemblies */
  projectAssemblies: Array<GraphQlProjectAssembly>
  projectEpds: Array<GraphQlProjectEpd>
  /** Query all Project Groups */
  projectGroups: Array<GraphQlProjectGroup>
  /**
   * Query Project Members using ProjectID.
   * Filters can be used to query unique members of the Project
   */
  projectMembers: Array<GraphQlProjectMember>
  /** Get all sources associated with a project */
  projectSources: Array<GraphQlProjectSource>
  /** Get all life cycle stage associated with a project */
  projectStages: Array<GraphQlProjectStage>
  /** Query all Projects user has access to */
  projects: Array<GraphQlProject>
  /** Query a reporting schema using project_id */
  reportingSchemas: Array<GraphQlReportingSchema>
  /** Get all Schema Categories of a Reporting Schema */
  schemaCategories: Array<GraphQlSchemaCategory>
  /** Get all schema elements for a list of categories */
  schemaElements: Array<GraphQlSchemaElement>
  /** Query Schema Templates */
  schemaTemplates: Array<GraphQlSchemaTemplate>
  /** Get all tags */
  tags: Array<GraphQlTag>
  /** Get all tasks connected to a reporting schema */
  tasks: Array<GraphQlTask>
  /** Get typeCodeElements */
  typeCodeElements: Array<GraphQlTypeCodeElement>
  /** Get Type Codes */
  typeCodes: Array<GraphQlTypeCode>
}

export type QueryAssembliesArgs = {
  filters?: InputMaybe<AssemblyFilters>
}

export type QueryCommentsArgs = {
  filters?: InputMaybe<CommentFilters>
  taskId: Scalars['String']
}

export type QueryCommitsArgs = {
  filters?: InputMaybe<CommitFilters>
  reportingSchemaId: Scalars['String']
}

export type QueryEpdsArgs = {
  after?: InputMaybe<Scalars['String']>
  count?: InputMaybe<Scalars['Int']>
  filters?: InputMaybe<EpdFilters>
  sortBy?: InputMaybe<EpdSort>
}

export type QueryExportReportingSchemaArgs = {
  exportFormat: ExportFormat
  reportingSchemaId: Scalars['String']
}

export type QueryProjectAssembliesArgs = {
  filters?: InputMaybe<AssemblyFilters>
  projectId: Scalars['String']
}

export type QueryProjectEpdsArgs = {
  filters?: InputMaybe<ProjectEpdFilters>
  projectId: Scalars['String']
}

export type QueryProjectGroupsArgs = {
  filters?: InputMaybe<ProjectGroupFilters>
  projectId: Scalars['String']
}

export type QueryProjectMembersArgs = {
  filters?: InputMaybe<ProjectMemberFilters>
  projectId: Scalars['String']
}

export type QueryProjectSourcesArgs = {
  filters?: InputMaybe<ProjectSourceFilters>
  projectId: Scalars['String']
}

export type QueryProjectStagesArgs = {
  projectId: Scalars['String']
}

export type QueryProjectsArgs = {
  filters?: InputMaybe<ProjectFilters>
}

export type QueryReportingSchemasArgs = {
  filters?: InputMaybe<ReportingSchemaFilters>
  projectId: Scalars['String']
}

export type QuerySchemaCategoriesArgs = {
  commitId?: InputMaybe<Scalars['String']>
  filters?: InputMaybe<SchemaCategoryFilters>
  reportingSchemaId: Scalars['String']
}

export type QuerySchemaElementsArgs = {
  commitId?: InputMaybe<Scalars['String']>
  elementId?: InputMaybe<Scalars['String']>
  filters?: InputMaybe<SchemaElementFilters>
  schemaCategoryIds: Array<Scalars['String']>
}

export type QuerySchemaTemplatesArgs = {
  filters?: InputMaybe<SchemaTemplateFilters>
}

export type QueryTagsArgs = {
  filters?: InputMaybe<TagFilters>
  reportingSchemaId: Scalars['String']
}

export type QueryTasksArgs = {
  commitId?: InputMaybe<Scalars['String']>
  filters?: InputMaybe<TaskFilters>
  reportingSchemaId: Scalars['String']
}

export type QueryTypeCodeElementsArgs = {
  filters?: InputMaybe<TypeCodeElementFilters>
}

export type QueryTypeCodesArgs = {
  filters?: InputMaybe<TypeCodeFilters>
}

export type ReportingSchemaFilters = {
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  projectId?: InputMaybe<FilterOptions>
}

export type SchemaCategoryFilters = {
  description?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
}

export type SchemaElementFilters = {
  classification?: InputMaybe<FilterOptions>
  description?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
  quantity?: InputMaybe<FilterOptions>
  subclassification?: InputMaybe<FilterOptions>
  unit?: InputMaybe<FilterOptions>
}

export type SchemaElementUpdateInput = {
  assemblyId?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  quantity?: InputMaybe<Scalars['Float']>
  result?: InputMaybe<Scalars['JSON']>
  schemaCategory?: InputMaybe<Scalars['String']>
  unit?: InputMaybe<Unit>
}

export type SchemaTemplateFilters = {
  domain?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
}

export enum SortOptions {
  Asc = 'ASC',
  Dsc = 'DSC',
}

export type TagFilters = {
  added?: InputMaybe<FilterOptions>
  authorId?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  shortId?: InputMaybe<FilterOptions>
}

export type TaskFilters = {
  description?: InputMaybe<FilterOptions>
  dueDate?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  itemId?: InputMaybe<FilterOptions>
  itemType?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
}

export enum TaskItemType {
  Category = 'Category',
  Element = 'Element',
}

export enum TaskStatus {
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
}

export type TypeCodeElementFilters = {
  code?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  level?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
}

export type TypeCodeFilters = {
  domain?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
}

export enum Unit {
  Kg = 'KG',
  L = 'L',
  M = 'M',
  M2 = 'M2',
  M3 = 'M3',
  None = 'NONE',
  Pcs = 'PCS',
  Tonnes = 'TONNES',
  TonnesKm = 'TONNES_KM',
}

export enum ExportFormat {
  Csv = 'CSV',
  Lcabyg = 'LCABYG',
}

export type TaskItem = {
  id: Scalars['String']
  type: TaskItemType
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AssemblyAddInput: AssemblyAddInput
  String: ResolverTypeWrapper<Scalars['String']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  AssemblyFilters: AssemblyFilters
  AssemblyLayerInput: AssemblyLayerInput
  Int: ResolverTypeWrapper<Scalars['Int']>
  AssemblyLayerUpdateInput: AssemblyLayerUpdateInput
  AssemblyUpdateInput: AssemblyUpdateInput
  AssigneeType: AssigneeType
  CommentFilters: CommentFilters
  CommitFilters: CommitFilters
  Date: ResolverTypeWrapper<Scalars['Date']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  EPDFilters: EpdFilters
  EPDSort: EpdSort
  FilterOptions: FilterOptions
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  GraphQLAddEpdInput: GraphQlAddEpdInput
  GraphQLAssembly: ResolverTypeWrapper<GraphQlAssembly>
  GraphQLAssemblyLayer: ResolverTypeWrapper<GraphQlAssemblyLayer>
  GraphQLAssemblyUnit: GraphQlAssemblyUnit
  GraphQLAssignee: GraphQlAssignee
  GraphQLComment: ResolverTypeWrapper<GraphQlComment>
  ID: ResolverTypeWrapper<Scalars['ID']>
  GraphQLCommit: ResolverTypeWrapper<GraphQlCommit>
  GraphQLConversion: ResolverTypeWrapper<GraphQlConversion>
  GraphQLEPD: ResolverTypeWrapper<GraphQlepd>
  GraphQLEPDBase: ResolverTypeWrapper<GraphQlepdBase>
  GraphQLEPDConnection: ResolverTypeWrapper<GraphQlepdConnection>
  GraphQLEPDEdge: ResolverTypeWrapper<GraphQlepdEdge>
  GraphQLImpactCategories: ResolverTypeWrapper<GraphQlImpactCategories>
  GraphQLLifeCycleStage: ResolverTypeWrapper<GraphQlLifeCycleStage>
  GraphQLProject: ResolverTypeWrapper<GraphQlProject>
  GraphQLProjectAssembly: ResolverTypeWrapper<GraphQlProjectAssembly>
  GraphQLProjectEPD: ResolverTypeWrapper<GraphQlProjectEpd>
  GraphQLProjectGroup: ResolverTypeWrapper<GraphQlProjectGroup>
  GraphQLProjectMember: ResolverTypeWrapper<GraphQlProjectMember>
  GraphQLProjectMemberGraphQLProjectGroup:
    | ResolversTypes['GraphQLProjectGroup']
    | ResolversTypes['GraphQLProjectMember']
  GraphQLProjectSource: ResolverTypeWrapper<GraphQlProjectSource>
  GraphQLProjectStage: ResolverTypeWrapper<GraphQlProjectStage>
  GraphQLReportingCreationSchema: ResolverTypeWrapper<GraphQlReportingCreationSchema>
  GraphQLReportingSchema: ResolverTypeWrapper<GraphQlReportingSchema>
  GraphQLSchemaCategory: ResolverTypeWrapper<GraphQlSchemaCategory>
  GraphQLSchemaElement: ResolverTypeWrapper<GraphQlSchemaElement>
  GraphQLSchemaElementGraphQLSchemaCategory:
    | ResolversTypes['GraphQLSchemaCategory']
    | ResolversTypes['GraphQLSchemaElement']
  GraphQLSchemaTemplate: ResolverTypeWrapper<GraphQlSchemaTemplate>
  GraphQLSourceFile: ResolverTypeWrapper<GraphQlSourceFile>
  GraphQLTag: ResolverTypeWrapper<GraphQlTag>
  GraphQLTask: ResolverTypeWrapper<
    Omit<GraphQlTask, 'assignee' | 'item'> & {
      assignee: ResolversTypes['GraphQLProjectMemberGraphQLProjectGroup']
      item: ResolversTypes['GraphQLSchemaElementGraphQLSchemaCategory']
    }
  >
  GraphQLTypeCode: ResolverTypeWrapper<GraphQlTypeCode>
  GraphQLTypeCodeElement: ResolverTypeWrapper<GraphQlTypeCodeElement>
  GraphQLTypeCodeElementInput: GraphQlTypeCodeElementInput
  GraphQLUnit: GraphQlUnit
  GraphQLUserAccount: ResolverTypeWrapper<GraphQlUserAccount>
  JSON: ResolverTypeWrapper<Scalars['JSON']>
  LifeCycleStageInput: LifeCycleStageInput
  Mutation: ResolverTypeWrapper<{}>
  PageInfo: ResolverTypeWrapper<PageInfo>
  ProjectAssemblyAddInput: ProjectAssemblyAddInput
  ProjectAssemblyUpdateInput: ProjectAssemblyUpdateInput
  ProjectDomain: ProjectDomain
  ProjectEPDFilters: ProjectEpdFilters
  ProjectFilters: ProjectFilters
  ProjectGroupFilters: ProjectGroupFilters
  ProjectGroupInput: ProjectGroupInput
  ProjectMemberFilters: ProjectMemberFilters
  ProjectMemberInput: ProjectMemberInput
  ProjectSourceFilters: ProjectSourceFilters
  ProjectSourceType: ProjectSourceType
  Query: ResolverTypeWrapper<{}>
  ReportingSchemaFilters: ReportingSchemaFilters
  SchemaCategoryFilters: SchemaCategoryFilters
  SchemaElementFilters: SchemaElementFilters
  SchemaElementUpdateInput: SchemaElementUpdateInput
  SchemaTemplateFilters: SchemaTemplateFilters
  SortOptions: SortOptions
  TagFilters: TagFilters
  TaskFilters: TaskFilters
  TaskItemType: TaskItemType
  TaskStatus: TaskStatus
  TypeCodeElementFilters: TypeCodeElementFilters
  TypeCodeFilters: TypeCodeFilters
  Unit: Unit
  exportFormat: ExportFormat
  taskItem: TaskItem
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AssemblyAddInput: AssemblyAddInput
  String: Scalars['String']
  Float: Scalars['Float']
  AssemblyFilters: AssemblyFilters
  AssemblyLayerInput: AssemblyLayerInput
  Int: Scalars['Int']
  AssemblyLayerUpdateInput: AssemblyLayerUpdateInput
  AssemblyUpdateInput: AssemblyUpdateInput
  CommentFilters: CommentFilters
  CommitFilters: CommitFilters
  Date: Scalars['Date']
  DateTime: Scalars['DateTime']
  EPDFilters: EpdFilters
  EPDSort: EpdSort
  FilterOptions: FilterOptions
  Boolean: Scalars['Boolean']
  GraphQLAddEpdInput: GraphQlAddEpdInput
  GraphQLAssembly: GraphQlAssembly
  GraphQLAssemblyLayer: GraphQlAssemblyLayer
  GraphQLAssignee: GraphQlAssignee
  GraphQLComment: GraphQlComment
  ID: Scalars['ID']
  GraphQLCommit: GraphQlCommit
  GraphQLConversion: GraphQlConversion
  GraphQLEPD: GraphQlepd
  GraphQLEPDBase: GraphQlepdBase
  GraphQLEPDConnection: GraphQlepdConnection
  GraphQLEPDEdge: GraphQlepdEdge
  GraphQLImpactCategories: GraphQlImpactCategories
  GraphQLLifeCycleStage: GraphQlLifeCycleStage
  GraphQLProject: GraphQlProject
  GraphQLProjectAssembly: GraphQlProjectAssembly
  GraphQLProjectEPD: GraphQlProjectEpd
  GraphQLProjectGroup: GraphQlProjectGroup
  GraphQLProjectMember: GraphQlProjectMember
  GraphQLProjectMemberGraphQLProjectGroup:
    | ResolversParentTypes['GraphQLProjectGroup']
    | ResolversParentTypes['GraphQLProjectMember']
  GraphQLProjectSource: GraphQlProjectSource
  GraphQLProjectStage: GraphQlProjectStage
  GraphQLReportingCreationSchema: GraphQlReportingCreationSchema
  GraphQLReportingSchema: GraphQlReportingSchema
  GraphQLSchemaCategory: GraphQlSchemaCategory
  GraphQLSchemaElement: GraphQlSchemaElement
  GraphQLSchemaElementGraphQLSchemaCategory:
    | ResolversParentTypes['GraphQLSchemaCategory']
    | ResolversParentTypes['GraphQLSchemaElement']
  GraphQLSchemaTemplate: GraphQlSchemaTemplate
  GraphQLSourceFile: GraphQlSourceFile
  GraphQLTag: GraphQlTag
  GraphQLTask: Omit<GraphQlTask, 'assignee' | 'item'> & {
    assignee: ResolversParentTypes['GraphQLProjectMemberGraphQLProjectGroup']
    item: ResolversParentTypes['GraphQLSchemaElementGraphQLSchemaCategory']
  }
  GraphQLTypeCode: GraphQlTypeCode
  GraphQLTypeCodeElement: GraphQlTypeCodeElement
  GraphQLTypeCodeElementInput: GraphQlTypeCodeElementInput
  GraphQLUserAccount: GraphQlUserAccount
  JSON: Scalars['JSON']
  LifeCycleStageInput: LifeCycleStageInput
  Mutation: {}
  PageInfo: PageInfo
  ProjectAssemblyAddInput: ProjectAssemblyAddInput
  ProjectAssemblyUpdateInput: ProjectAssemblyUpdateInput
  ProjectEPDFilters: ProjectEpdFilters
  ProjectFilters: ProjectFilters
  ProjectGroupFilters: ProjectGroupFilters
  ProjectGroupInput: ProjectGroupInput
  ProjectMemberFilters: ProjectMemberFilters
  ProjectMemberInput: ProjectMemberInput
  ProjectSourceFilters: ProjectSourceFilters
  Query: {}
  ReportingSchemaFilters: ReportingSchemaFilters
  SchemaCategoryFilters: SchemaCategoryFilters
  SchemaElementFilters: SchemaElementFilters
  SchemaElementUpdateInput: SchemaElementUpdateInput
  SchemaTemplateFilters: SchemaTemplateFilters
  TagFilters: TagFilters
  TaskFilters: TaskFilters
  TypeCodeElementFilters: TypeCodeElementFilters
  TypeCodeFilters: TypeCodeFilters
  taskItem: TaskItem
}

export type DeferDirectiveArgs = {
  if?: Scalars['Boolean']
  label?: Maybe<Scalars['String']>
}

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type GraphQlAssemblyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLAssembly'] = ResolversParentTypes['GraphQLAssembly'],
> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  conversionFactor?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gwp?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<GraphQlAssemblyGwpArgs, 'phases'>>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  layers?: Resolver<Array<Maybe<ResolversTypes['GraphQLAssemblyLayer']>>, ParentType, ContextType>
  lifeTime?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  metaFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['GraphQLAssemblyUnit'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlAssemblyLayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLAssemblyLayer'] = ResolversParentTypes['GraphQLAssemblyLayer'],
> = {
  conversionFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  epd?: Resolver<ResolversTypes['GraphQLProjectEPD'], ParentType, ContextType>
  epdId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  transportConversionFactor?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  transportDistance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  transportEpd?: Resolver<Maybe<ResolversTypes['GraphQLProjectEPD']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLComment'] = ResolversParentTypes['GraphQLComment'],
> = {
  added?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  author?: Resolver<Maybe<ResolversTypes['GraphQLProjectMember']>, ParentType, ContextType>
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  task?: Resolver<ResolversTypes['GraphQLTask'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlCommitResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLCommit'] = ResolversParentTypes['GraphQLCommit'],
> = {
  added?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  reportingSchemaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  repositoryId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  schemaCategories?: Resolver<Maybe<Array<ResolversTypes['GraphQLSchemaCategory']>>, ParentType, ContextType>
  schemaElements?: Resolver<Maybe<Array<ResolversTypes['GraphQLSchemaElement']>>, ParentType, ContextType>
  shortId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  tags?: Resolver<Maybe<Array<ResolversTypes['GraphQLTag']>>, ParentType, ContextType>
  tasks?: Resolver<Maybe<Array<ResolversTypes['GraphQLTask']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlConversionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLConversion'] = ResolversParentTypes['GraphQLConversion'],
> = {
  to?: Resolver<ResolversTypes['GraphQLUnit'], ParentType, ContextType>
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlepdResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLEPD'] = ResolversParentTypes['GraphQLEPD'],
> = {
  ap?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Array<ResolversTypes['GraphQLConversion']>, ParentType, ContextType>
  declaredUnit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ep?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  gwp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTransport?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  metaFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  odp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  penre?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  pere?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  pocp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  publishedDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  subtype?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  validUntil?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlepdBaseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLEPDBase'] = ResolversParentTypes['GraphQLEPDBase'],
> = {
  ap?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Array<ResolversTypes['GraphQLConversion']>, ParentType, ContextType>
  declaredUnit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ep?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  gwp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTransport?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  metaFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  odp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  penre?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  pere?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  pocp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  publishedDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  subtype?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  validUntil?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlepdConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLEPDConnection'] = ResolversParentTypes['GraphQLEPDConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['GraphQLEPDEdge']>, ParentType, ContextType>
  numEdges?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlepdEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLEPDEdge'] = ResolversParentTypes['GraphQLEPDEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['GraphQLEPD'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlImpactCategoriesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLImpactCategories'] = ResolversParentTypes['GraphQLImpactCategories'],
> = {
  a1a3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b6?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b7?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlLifeCycleStageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLLifeCycleStage'] = ResolversParentTypes['GraphQLLifeCycleStage'],
> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  phase?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProject'] = ResolversParentTypes['GraphQLProject'],
> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  client?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  domain?: Resolver<Maybe<ResolversTypes['ProjectDomain']>, ParentType, ContextType>
  groups?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectGroup']>>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  members?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectMember']>>, ParentType, ContextType>
  metaFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  stages?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectStage']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectAssemblyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectAssembly'] = ResolversParentTypes['GraphQLProjectAssembly'],
> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  conversionFactor?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gwp?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType,
    RequireFields<GraphQlProjectAssemblyGwpArgs, 'phases'>
  >
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  layers?: Resolver<Array<ResolversTypes['GraphQLAssemblyLayer']>, ParentType, ContextType>
  lifeTime?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  metaFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['GraphQLAssemblyUnit'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectEpdResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectEPD'] = ResolversParentTypes['GraphQLProjectEPD'],
> = {
  ap?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  assemblies?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectAssembly']>>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Array<ResolversTypes['GraphQLConversion']>, ParentType, ContextType>
  declaredUnit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ep?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  gwp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTransport?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  metaFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  odp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  originId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  penre?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  pere?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  pocp?: Resolver<Maybe<ResolversTypes['GraphQLImpactCategories']>, ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  publishedDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  subtype?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  validUntil?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectGroup'] = ResolversParentTypes['GraphQLProjectGroup'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  lead?: Resolver<Maybe<ResolversTypes['GraphQLProjectMember']>, ParentType, ContextType>
  leadId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  members?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectMember']>>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectMemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectMember'] = ResolversParentTypes['GraphQLProjectMember'],
> = {
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  lastLogin?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  leaderOf?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectGroup']>>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectGroups?: Resolver<Maybe<Array<ResolversTypes['GraphQLProjectGroup']>>, ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectMemberGraphQlProjectGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectMemberGraphQLProjectGroup'] = ResolversParentTypes['GraphQLProjectMemberGraphQLProjectGroup'],
> = {
  __resolveType: TypeResolveFn<'GraphQLProjectGroup' | 'GraphQLProjectMember', ParentType, ContextType>
}

export type GraphQlProjectSourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectSource'] = ResolversParentTypes['GraphQLProjectSource'],
> = {
  author?: Resolver<ResolversTypes['GraphQLProjectMember'], ParentType, ContextType>
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  data?: Resolver<Maybe<ResolversTypes['GraphQLSourceFile']>, ParentType, ContextType>
  dataId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  elements?: Resolver<Maybe<Array<ResolversTypes['GraphQLSchemaElement']>>, ParentType, ContextType>
  fileUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  interpretation?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  metaFields?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['ProjectSourceType'], ParentType, ContextType>
  updated?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlProjectStageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLProjectStage'] = ResolversParentTypes['GraphQLProjectStage'],
> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  phase?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  stageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlReportingCreationSchemaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLReportingCreationSchema'] = ResolversParentTypes['GraphQLReportingCreationSchema'],
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlReportingSchemaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLReportingSchema'] = ResolversParentTypes['GraphQLReportingSchema'],
> = {
  categories?: Resolver<Maybe<Array<ResolversTypes['GraphQLSchemaCategory']>>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  templateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlSchemaCategoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLSchemaCategory'] = ResolversParentTypes['GraphQLSchemaCategory'],
> = {
  commits?: Resolver<Maybe<Array<ResolversTypes['GraphQLCommit']>>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  elements?: Resolver<Maybe<Array<ResolversTypes['GraphQLSchemaElement']>>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  reportingSchema?: Resolver<ResolversTypes['GraphQLReportingSchema'], ParentType, ContextType>
  reportingSchemaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  typeCodeElement?: Resolver<Maybe<ResolversTypes['GraphQLTypeCodeElement']>, ParentType, ContextType>
  typeCodeElementId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlSchemaElementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLSchemaElement'] = ResolversParentTypes['GraphQLSchemaElement'],
> = {
  assembly?: Resolver<Maybe<ResolversTypes['GraphQLProjectAssembly']>, ParentType, ContextType>
  assemblyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  commits?: Resolver<Array<ResolversTypes['GraphQLCommit']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  result?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  schemaCategory?: Resolver<ResolversTypes['GraphQLSchemaCategory'], ParentType, ContextType>
  source?: Resolver<Maybe<ResolversTypes['GraphQLProjectSource']>, ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlSchemaElementGraphQlSchemaCategoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLSchemaElementGraphQLSchemaCategory'] = ResolversParentTypes['GraphQLSchemaElementGraphQLSchemaCategory'],
> = {
  __resolveType: TypeResolveFn<'GraphQLSchemaCategory' | 'GraphQLSchemaElement', ParentType, ContextType>
}

export type GraphQlSchemaTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLSchemaTemplate'] = ResolversParentTypes['GraphQLSchemaTemplate'],
> = {
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  original?: Resolver<Maybe<ResolversTypes['GraphQLReportingSchema']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlSourceFileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLSourceFile'] = ResolversParentTypes['GraphQLSourceFile'],
> = {
  headers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  rows?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlTagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLTag'] = ResolversParentTypes['GraphQLTag'],
> = {
  added?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  commit?: Resolver<ResolversTypes['GraphQLCommit'], ParentType, ContextType>
  commitId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  shortId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlTaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLTask'] = ResolversParentTypes['GraphQLTask'],
> = {
  assignedGroupId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  assignee?: Resolver<ResolversTypes['GraphQLProjectMemberGraphQLProjectGroup'], ParentType, ContextType>
  assigneeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  author?: Resolver<ResolversTypes['GraphQLProjectMember'], ParentType, ContextType>
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  comments?: Resolver<Maybe<Array<ResolversTypes['GraphQLComment']>>, ParentType, ContextType>
  commits?: Resolver<Array<ResolversTypes['GraphQLCommit']>, ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  dueDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  item?: Resolver<ResolversTypes['GraphQLSchemaElementGraphQLSchemaCategory'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  reportingSchema?: Resolver<ResolversTypes['GraphQLReportingSchema'], ParentType, ContextType>
  reportingSchemaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlTypeCodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLTypeCode'] = ResolversParentTypes['GraphQLTypeCode'],
> = {
  elements?: Resolver<Array<ResolversTypes['GraphQLTypeCodeElement']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlTypeCodeElementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLTypeCodeElement'] = ResolversParentTypes['GraphQLTypeCodeElement'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  parentCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  parentPath?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphQlUserAccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphQLUserAccount'] = ResolversParentTypes['GraphQLUserAccount'],
> = {
  blobSasToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  tenantId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addAssemblies?: Resolver<
    Array<ResolversTypes['GraphQLAssembly']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddAssembliesArgs, 'assemblies'>
  >
  addAssemblyLayers?: Resolver<
    Array<ResolversTypes['GraphQLAssemblyLayer']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddAssemblyLayersArgs, 'id' | 'layers'>
  >
  addComment?: Resolver<
    ResolversTypes['GraphQLComment'],
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, 'taskId' | 'text'>
  >
  addEpds?: Resolver<
    Array<ResolversTypes['GraphQLEPD']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddEpdsArgs, 'epds'>
  >
  addProject?: Resolver<
    ResolversTypes['GraphQLProject'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddProjectArgs,
      | 'address'
      | 'city'
      | 'client'
      | 'country'
      | 'domain'
      | 'file'
      | 'groups'
      | 'members'
      | 'metaFields'
      | 'name'
      | 'projectId'
      | 'public'
      | 'stages'
    >
  >
  addProjectAssemblies?: Resolver<
    Array<ResolversTypes['GraphQLProjectAssembly']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectAssembliesArgs, 'assemblies'>
  >
  addProjectAssembliesFromAssemblies?: Resolver<
    Array<ResolversTypes['GraphQLProjectAssembly']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectAssembliesFromAssembliesArgs, 'assemblies' | 'projectId'>
  >
  addProjectAssemblyLayers?: Resolver<
    Array<ResolversTypes['GraphQLAssemblyLayer']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectAssemblyLayersArgs, 'id' | 'layers'>
  >
  addProjectEpds?: Resolver<
    Array<ResolversTypes['GraphQLProjectEPD']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectEpdsArgs, 'epdIds' | 'projectId'>
  >
  addProjectGroup?: Resolver<
    ResolversTypes['GraphQLProjectGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectGroupArgs, 'leadId' | 'name' | 'projectId'>
  >
  addProjectMember?: Resolver<
    ResolversTypes['GraphQLProjectMember'],
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectMemberArgs, 'email' | 'name' | 'projectGroupIds' | 'projectId'>
  >
  addProjectMembersToGroup?: Resolver<
    ResolversTypes['GraphQLProjectGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectMembersToGroupArgs, 'groupId' | 'memberIds'>
  >
  addProjectSource?: Resolver<
    ResolversTypes['GraphQLProjectSource'],
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectSourceArgs, 'dataId' | 'file' | 'name' | 'projectId' | 'speckleUrl' | 'type'>
  >
  addProjectStage?: Resolver<
    ResolversTypes['GraphQLProjectStage'],
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectStageArgs, 'projectId' | 'stageId'>
  >
  addReportingSchema?: Resolver<
    ResolversTypes['GraphQLReportingCreationSchema'],
    ParentType,
    ContextType,
    RequireFields<MutationAddReportingSchemaArgs, 'name' | 'projectId' | 'templateId'>
  >
  addReportingSchemaFromTemplate?: Resolver<
    ResolversTypes['GraphQLReportingCreationSchema'],
    ParentType,
    ContextType,
    RequireFields<MutationAddReportingSchemaFromTemplateArgs, 'projectId' | 'templateId'>
  >
  addSchemaCategory?: Resolver<
    ResolversTypes['GraphQLSchemaCategory'],
    ParentType,
    ContextType,
    RequireFields<MutationAddSchemaCategoryArgs, 'description' | 'reportingSchemaId' | 'typeCodeElementId'>
  >
  addSchemaElement?: Resolver<
    ResolversTypes['GraphQLSchemaElement'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddSchemaElementArgs,
      'assemblyId' | 'description' | 'name' | 'quantity' | 'schemaCategoryId' | 'unit'
    >
  >
  addSchemaElementFromSource?: Resolver<
    Array<ResolversTypes['GraphQLSchemaElement']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddSchemaElementFromSourceArgs,
      'objectIds' | 'quantities' | 'schemaCategoryIds' | 'sourceId' | 'units'
    >
  >
  addSchemaTemplate?: Resolver<
    ResolversTypes['GraphQLSchemaTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationAddSchemaTemplateArgs, 'domain' | 'name' | 'typeCodes'>
  >
  addTask?: Resolver<
    ResolversTypes['GraphQLTask'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddTaskArgs,
      'assignee' | 'description' | 'dueDate' | 'item' | 'name' | 'reportingSchemaId' | 'status'
    >
  >
  createTag?: Resolver<
    ResolversTypes['GraphQLTag'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTagArgs, 'commitId' | 'name'>
  >
  createTypeCodeElement?: Resolver<
    ResolversTypes['GraphQLTypeCodeElement'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTypeCodeElementArgs, 'code' | 'level' | 'name' | 'parentPath'>
  >
  createTypeCodeElementFromSource?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTypeCodeElementFromSourceArgs, 'domain' | 'file' | 'name'>
  >
  deleteAssemblies?: Resolver<
    Array<ResolversTypes['ID']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAssembliesArgs, 'ids'>
  >
  deleteAssemblyLayers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAssemblyLayersArgs, 'id' | 'layers'>
  >
  deleteComment?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, 'id'>
  >
  deleteEpds?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEpdsArgs, 'ids'>
  >
  deleteProject?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectArgs, 'id'>
  >
  deleteProjectAssemblies?: Resolver<
    Array<ResolversTypes['ID']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectAssembliesArgs, 'ids'>
  >
  deleteProjectAssemblyLayers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectAssemblyLayersArgs, 'id' | 'layers'>
  >
  deleteProjectEpds?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectEpdsArgs, 'ids'>
  >
  deleteProjectGroup?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectGroupArgs, 'id'>
  >
  deleteProjectMember?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectMemberArgs, 'id'>
  >
  deleteProjectSource?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectSourceArgs, 'id'>
  >
  deleteProjectStage?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectStageArgs, 'projectId' | 'stageId'>
  >
  deleteReportingSchema?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteReportingSchemaArgs, 'id'>
  >
  deleteSchemaCategory?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSchemaCategoryArgs, 'id'>
  >
  deleteSchemaElement?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSchemaElementArgs, 'id'>
  >
  deleteSchemaTemplate?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSchemaTemplateArgs, 'id'>
  >
  deleteTag?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'id'>>
  deleteTask?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>
  deleteTypeCodeElement?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTypeCodeElementArgs, 'id'>
  >
  removeProjectMembersFromGroup?: Resolver<
    ResolversTypes['GraphQLProjectGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveProjectMembersFromGroupArgs, 'groupId' | 'memberIds'>
  >
  updateAssemblies?: Resolver<
    Array<ResolversTypes['GraphQLAssembly']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAssembliesArgs, 'assemblies'>
  >
  updateAssemblyLayers?: Resolver<
    Array<ResolversTypes['GraphQLAssemblyLayer']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAssemblyLayersArgs, 'id' | 'layers'>
  >
  updateComment?: Resolver<
    ResolversTypes['GraphQLComment'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCommentArgs, 'id' | 'text'>
  >
  updateProject?: Resolver<
    ResolversTypes['GraphQLProject'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateProjectArgs,
      | 'address'
      | 'city'
      | 'client'
      | 'country'
      | 'domain'
      | 'file'
      | 'id'
      | 'metaFields'
      | 'name'
      | 'projectId'
      | 'public'
    >
  >
  updateProjectAssemblies?: Resolver<
    Array<ResolversTypes['GraphQLProjectAssembly']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectAssembliesArgs, 'assemblies'>
  >
  updateProjectAssemblyLayers?: Resolver<
    Array<ResolversTypes['GraphQLAssemblyLayer']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectAssemblyLayersArgs, 'id' | 'layers'>
  >
  updateProjectGroup?: Resolver<
    ResolversTypes['GraphQLProjectGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectGroupArgs, 'id' | 'leadId' | 'name'>
  >
  updateProjectSource?: Resolver<
    ResolversTypes['GraphQLProjectSource'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateProjectSourceArgs,
      'dataId' | 'file' | 'id' | 'interpretation' | 'metaFields' | 'name' | 'speckleUrl' | 'type'
    >
  >
  updateReportingSchema?: Resolver<
    ResolversTypes['GraphQLReportingSchema'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateReportingSchemaArgs, 'id' | 'name' | 'projectId'>
  >
  updateSchemaCategory?: Resolver<
    ResolversTypes['GraphQLSchemaCategory'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSchemaCategoryArgs, 'description' | 'id'>
  >
  updateSchemaElements?: Resolver<
    Array<ResolversTypes['GraphQLSchemaElement']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSchemaElementsArgs, 'schemaElements'>
  >
  updateSchemaTemplate?: Resolver<
    ResolversTypes['GraphQLSchemaTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSchemaTemplateArgs, 'domain' | 'id' | 'name' | 'typeCodes'>
  >
  updateTag?: Resolver<
    ResolversTypes['GraphQLTag'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagArgs, 'commitId' | 'id' | 'name'>
  >
  updateTask?: Resolver<
    ResolversTypes['GraphQLTask'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateTaskArgs,
      'assignedGroupId' | 'assignee' | 'description' | 'dueDate' | 'id' | 'item' | 'name' | 'status'
    >
  >
  updateTypeCodeElement?: Resolver<
    ResolversTypes['GraphQLTypeCodeElement'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTypeCodeElementArgs, 'code' | 'id' | 'level' | 'name' | 'parentPath'>
  >
}

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo'],
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  account?: Resolver<ResolversTypes['GraphQLUserAccount'], ParentType, ContextType>
  assemblies?: Resolver<
    Array<ResolversTypes['GraphQLAssembly']>,
    ParentType,
    ContextType,
    RequireFields<QueryAssembliesArgs, 'filters'>
  >
  comments?: Resolver<
    Array<ResolversTypes['GraphQLComment']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentsArgs, 'filters' | 'taskId'>
  >
  commits?: Resolver<
    Array<ResolversTypes['GraphQLCommit']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommitsArgs, 'filters' | 'reportingSchemaId'>
  >
  epds?: Resolver<
    ResolversTypes['GraphQLEPDConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryEpdsArgs, 'count' | 'filters' | 'sortBy'>
  >
  exportReportingSchema?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<QueryExportReportingSchemaArgs, 'exportFormat' | 'reportingSchemaId'>
  >
  lifeCycleStages?: Resolver<Array<ResolversTypes['GraphQLLifeCycleStage']>, ParentType, ContextType>
  projectAssemblies?: Resolver<
    Array<ResolversTypes['GraphQLProjectAssembly']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectAssembliesArgs, 'filters' | 'projectId'>
  >
  projectEpds?: Resolver<
    Array<ResolversTypes['GraphQLProjectEPD']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectEpdsArgs, 'filters' | 'projectId'>
  >
  projectGroups?: Resolver<
    Array<ResolversTypes['GraphQLProjectGroup']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectGroupsArgs, 'filters' | 'projectId'>
  >
  projectMembers?: Resolver<
    Array<ResolversTypes['GraphQLProjectMember']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectMembersArgs, 'filters' | 'projectId'>
  >
  projectSources?: Resolver<
    Array<ResolversTypes['GraphQLProjectSource']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectSourcesArgs, 'filters' | 'projectId'>
  >
  projectStages?: Resolver<
    Array<ResolversTypes['GraphQLProjectStage']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectStagesArgs, 'projectId'>
  >
  projects?: Resolver<
    Array<ResolversTypes['GraphQLProject']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectsArgs, 'filters'>
  >
  reportingSchemas?: Resolver<
    Array<ResolversTypes['GraphQLReportingSchema']>,
    ParentType,
    ContextType,
    RequireFields<QueryReportingSchemasArgs, 'filters' | 'projectId'>
  >
  schemaCategories?: Resolver<
    Array<ResolversTypes['GraphQLSchemaCategory']>,
    ParentType,
    ContextType,
    RequireFields<QuerySchemaCategoriesArgs, 'commitId' | 'filters' | 'reportingSchemaId'>
  >
  schemaElements?: Resolver<
    Array<ResolversTypes['GraphQLSchemaElement']>,
    ParentType,
    ContextType,
    RequireFields<QuerySchemaElementsArgs, 'commitId' | 'elementId' | 'filters' | 'schemaCategoryIds'>
  >
  schemaTemplates?: Resolver<
    Array<ResolversTypes['GraphQLSchemaTemplate']>,
    ParentType,
    ContextType,
    RequireFields<QuerySchemaTemplatesArgs, 'filters'>
  >
  tags?: Resolver<
    Array<ResolversTypes['GraphQLTag']>,
    ParentType,
    ContextType,
    RequireFields<QueryTagsArgs, 'filters' | 'reportingSchemaId'>
  >
  tasks?: Resolver<
    Array<ResolversTypes['GraphQLTask']>,
    ParentType,
    ContextType,
    RequireFields<QueryTasksArgs, 'commitId' | 'filters' | 'reportingSchemaId'>
  >
  typeCodeElements?: Resolver<
    Array<ResolversTypes['GraphQLTypeCodeElement']>,
    ParentType,
    ContextType,
    RequireFields<QueryTypeCodeElementsArgs, 'filters'>
  >
  typeCodes?: Resolver<
    Array<ResolversTypes['GraphQLTypeCode']>,
    ParentType,
    ContextType,
    RequireFields<QueryTypeCodesArgs, 'filters'>
  >
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType
  DateTime?: GraphQLScalarType
  GraphQLAssembly?: GraphQlAssemblyResolvers<ContextType>
  GraphQLAssemblyLayer?: GraphQlAssemblyLayerResolvers<ContextType>
  GraphQLComment?: GraphQlCommentResolvers<ContextType>
  GraphQLCommit?: GraphQlCommitResolvers<ContextType>
  GraphQLConversion?: GraphQlConversionResolvers<ContextType>
  GraphQLEPD?: GraphQlepdResolvers<ContextType>
  GraphQLEPDBase?: GraphQlepdBaseResolvers<ContextType>
  GraphQLEPDConnection?: GraphQlepdConnectionResolvers<ContextType>
  GraphQLEPDEdge?: GraphQlepdEdgeResolvers<ContextType>
  GraphQLImpactCategories?: GraphQlImpactCategoriesResolvers<ContextType>
  GraphQLLifeCycleStage?: GraphQlLifeCycleStageResolvers<ContextType>
  GraphQLProject?: GraphQlProjectResolvers<ContextType>
  GraphQLProjectAssembly?: GraphQlProjectAssemblyResolvers<ContextType>
  GraphQLProjectEPD?: GraphQlProjectEpdResolvers<ContextType>
  GraphQLProjectGroup?: GraphQlProjectGroupResolvers<ContextType>
  GraphQLProjectMember?: GraphQlProjectMemberResolvers<ContextType>
  GraphQLProjectMemberGraphQLProjectGroup?: GraphQlProjectMemberGraphQlProjectGroupResolvers<ContextType>
  GraphQLProjectSource?: GraphQlProjectSourceResolvers<ContextType>
  GraphQLProjectStage?: GraphQlProjectStageResolvers<ContextType>
  GraphQLReportingCreationSchema?: GraphQlReportingCreationSchemaResolvers<ContextType>
  GraphQLReportingSchema?: GraphQlReportingSchemaResolvers<ContextType>
  GraphQLSchemaCategory?: GraphQlSchemaCategoryResolvers<ContextType>
  GraphQLSchemaElement?: GraphQlSchemaElementResolvers<ContextType>
  GraphQLSchemaElementGraphQLSchemaCategory?: GraphQlSchemaElementGraphQlSchemaCategoryResolvers<ContextType>
  GraphQLSchemaTemplate?: GraphQlSchemaTemplateResolvers<ContextType>
  GraphQLSourceFile?: GraphQlSourceFileResolvers<ContextType>
  GraphQLTag?: GraphQlTagResolvers<ContextType>
  GraphQLTask?: GraphQlTaskResolvers<ContextType>
  GraphQLTypeCode?: GraphQlTypeCodeResolvers<ContextType>
  GraphQLTypeCodeElement?: GraphQlTypeCodeElementResolvers<ContextType>
  GraphQLUserAccount?: GraphQlUserAccountResolvers<ContextType>
  JSON?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>
}

export type GetSchemaTemplatesQueryVariables = Exact<{ [key: string]: never }>

export type GetSchemaTemplatesQuery = {
  __typename?: 'Query'
  schemaTemplates: Array<{
    __typename?: 'GraphQLSchemaTemplate'
    id: string
    name: string
    domain?: string | null
    original?: {
      __typename?: 'GraphQLReportingSchema'
      name: string
      id: string
      categories?: Array<{
        __typename?: 'GraphQLSchemaCategory'
        id: string
        typeCodeElement?: {
          __typename?: 'GraphQLTypeCodeElement'
          id: string
          code: string
          name: string
          level: number
          parentPath: string
        } | null
      }> | null
    } | null
  }>
}

export type DeleteSchemaTemplateMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteSchemaTemplateMutation = { __typename?: 'Mutation'; deleteSchemaTemplate: string }

export type AddSchemaTemplateMutationVariables = Exact<{
  name: Scalars['String']
  domain?: InputMaybe<Scalars['String']>
  typeCodes?: InputMaybe<Array<GraphQlTypeCodeElementInput> | GraphQlTypeCodeElementInput>
}>

export type AddSchemaTemplateMutation = {
  __typename?: 'Mutation'
  addSchemaTemplate: {
    __typename?: 'GraphQLSchemaTemplate'
    id: string
    name: string
    original?: {
      __typename?: 'GraphQLReportingSchema'
      id: string
      name: string
      categories?: Array<{
        __typename?: 'GraphQLSchemaCategory'
        id: string
        typeCodeElement?: {
          __typename?: 'GraphQLTypeCodeElement'
          code: string
          name: string
          level: number
          parentPath: string
        } | null
      }> | null
    } | null
  }
}

export type UpdateSchemaTemplateMutationVariables = Exact<{
  id: Scalars['String']
  name: Scalars['String']
  domain?: InputMaybe<Scalars['String']>
  typeCodes?: InputMaybe<Array<GraphQlTypeCodeElementInput> | GraphQlTypeCodeElementInput>
}>

export type UpdateSchemaTemplateMutation = {
  __typename?: 'Mutation'
  updateSchemaTemplate: {
    __typename?: 'GraphQLSchemaTemplate'
    id: string
    name: string
    original?: {
      __typename?: 'GraphQLReportingSchema'
      id: string
      name: string
      categories?: Array<{
        __typename?: 'GraphQLSchemaCategory'
        id: string
        typeCodeElement?: {
          __typename?: 'GraphQLTypeCodeElement'
          code: string
          name: string
          level: number
          parentPath: string
        } | null
      }> | null
    } | null
  }
}

export type GetProjectSchemasQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectSchemasQuery = {
  __typename?: 'Query'
  reportingSchemas: Array<{ __typename?: 'GraphQLReportingSchema'; id: string; name: string }>
}

export type GetProjectSchemasWithCategoriesQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectSchemasWithCategoriesQuery = {
  __typename?: 'Query'
  reportingSchemas: Array<{
    __typename?: 'GraphQLReportingSchema'
    id: string
    name: string
    categories?: Array<{
      __typename?: 'GraphQLSchemaCategory'
      id: string
      typeCodeElement?: {
        __typename?: 'GraphQLTypeCodeElement'
        id: string
        code: string
        name: string
        level: number
        parentPath: string
      } | null
    }> | null
  }>
}

export type GetSchemaCategoriesQueryVariables = Exact<{
  reportingSchemaId: Scalars['String']
  filters?: InputMaybe<SchemaCategoryFilters>
}>

export type GetSchemaCategoriesQuery = {
  __typename?: 'Query'
  schemaCategories: Array<{
    __typename?: 'GraphQLSchemaCategory'
    id: string
    typeCodeElement?: {
      __typename?: 'GraphQLTypeCodeElement'
      id: string
      code: string
      name: string
      level: number
      parentPath: string
    } | null
  }>
}

export type GetSchemaElementsQueryVariables = Exact<{
  schemaCategoryIds: Array<Scalars['String']> | Scalars['String']
}>

export type GetSchemaElementsQuery = {
  __typename?: 'Query'
  schemaElements: Array<{
    __typename?: 'GraphQLSchemaElement'
    id: string
    name: string
    quantity: number
    unit: Unit
    description?: string | null
    result?: any | null
    assemblyId?: string | null
    assembly?: {
      __typename?: 'GraphQLProjectAssembly'
      id: string
      name: string
      category: string
      conversionFactor: number
      lifeTime: number
      unit: GraphQlAssemblyUnit
      description?: string | null
      metaFields?: any | null
      layers: Array<{
        __typename?: 'GraphQLAssemblyLayer'
        id?: string | null
        name?: string | null
        description?: string | null
        conversionFactor?: number | null
        referenceServiceLife?: number | null
        epd: { __typename?: 'GraphQLProjectEPD'; id: string; name: string }
      }>
    } | null
    schemaCategory: {
      __typename?: 'GraphQLSchemaCategory'
      id: string
      typeCodeElement?: {
        __typename?: 'GraphQLTypeCodeElement'
        id: string
        code: string
        name: string
        level: number
        parentPath: string
      } | null
    }
    source?: { __typename?: 'GraphQLProjectSource'; name: string; type: ProjectSourceType } | null
  }>
}

export type AddSchemaElementMutationVariables = Exact<{
  schemaCategoryId: Scalars['String']
  name: Scalars['String']
  quantity: Scalars['Float']
  unit: Unit
  description: Scalars['String']
  assemblyId?: InputMaybe<Scalars['String']>
}>

export type AddSchemaElementMutation = {
  __typename?: 'Mutation'
  addSchemaElement: {
    __typename?: 'GraphQLSchemaElement'
    id: string
    name: string
    quantity: number
    unit: Unit
    description?: string | null
    schemaCategory: { __typename?: 'GraphQLSchemaCategory'; id: string }
  }
}

export type GetSingleSchemaElementQueryVariables = Exact<{
  schemaCategoryIds: Array<Scalars['String']> | Scalars['String']
  schemaElementId: Scalars['String']
}>

export type GetSingleSchemaElementQuery = {
  __typename?: 'Query'
  schemaElements: Array<{
    __typename?: 'GraphQLSchemaElement'
    id: string
    name: string
    quantity: number
    unit: Unit
    description?: string | null
    schemaCategory: {
      __typename?: 'GraphQLSchemaCategory'
      id: string
      description?: string | null
      reportingSchemaId?: string | null
      typeCodeElement?: {
        __typename?: 'GraphQLTypeCodeElement'
        code: string
        name: string
        level: number
        parentPath: string
      } | null
    }
  }>
}

export type UpdateSchemaElementsMutationVariables = Exact<{
  elements: Array<SchemaElementUpdateInput> | SchemaElementUpdateInput
}>

export type UpdateSchemaElementsMutation = {
  __typename?: 'Mutation'
  updateSchemaElements: Array<{
    __typename?: 'GraphQLSchemaElement'
    id: string
    schemaCategory: { __typename?: 'GraphQLSchemaCategory'; id: string }
  }>
}

export type DeleteSchemaElementMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteSchemaElementMutation = { __typename?: 'Mutation'; deleteSchemaElement: string }

export type AddReportingSchemaMutationVariables = Exact<{
  templateId: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  projectId: Scalars['String']
}>

export type AddReportingSchemaMutation = {
  __typename?: 'Mutation'
  addReportingSchema: {
    __typename?: 'GraphQLReportingCreationSchema'
    id: string
    name: string
    projectId?: string | null
  }
}

export type ExportReportingSchemaQueryVariables = Exact<{
  reportingSchemaId: Scalars['String']
  exportFormat: ExportFormat
}>

export type ExportReportingSchemaQuery = { __typename?: 'Query'; exportReportingSchema: string }

export type AddReportingSchemaFromTemplateMutationVariables = Exact<{
  templateId: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  projectId: Scalars['String']
}>

export type AddReportingSchemaFromTemplateMutation = {
  __typename?: 'Mutation'
  addReportingSchemaFromTemplate: { __typename?: 'GraphQLReportingCreationSchema'; id: string; name: string }
}

export type GetProjectSourcesQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectSourcesQuery = {
  __typename?: 'Query'
  projectSources: Array<{
    __typename?: 'GraphQLProjectSource'
    id: string
    name: string
    type: ProjectSourceType
    authorId: string
    dataId: string
    updated: any
    metaFields: any
    interpretation: any
    author: { __typename?: 'GraphQLProjectMember'; name: string }
  }>
}

export type AddProjectSourceMutationVariables = Exact<{
  projectId: Scalars['String']
  type: ProjectSourceType
  name: Scalars['String']
  file?: InputMaybe<Scalars['String']>
}>

export type AddProjectSourceMutation = {
  __typename?: 'Mutation'
  addProjectSource: {
    __typename?: 'GraphQLProjectSource'
    id: string
    name: string
    type: ProjectSourceType
    dataId: string
  }
}

export type UpdateProjectSourceMutationVariables = Exact<{
  id: Scalars['String']
  type?: InputMaybe<ProjectSourceType>
  name?: InputMaybe<Scalars['String']>
  file?: InputMaybe<Scalars['String']>
}>

export type UpdateProjectSourceMutation = {
  __typename?: 'Mutation'
  updateProjectSource: {
    __typename?: 'GraphQLProjectSource'
    projectId: string
    id: string
    name: string
    type: ProjectSourceType
    dataId: string
  }
}

export type UpdateProjectSourceInterpretationMutationVariables = Exact<{
  id: Scalars['String']
  type?: InputMaybe<ProjectSourceType>
  interpretation?: InputMaybe<Scalars['JSON']>
}>

export type UpdateProjectSourceInterpretationMutation = {
  __typename?: 'Mutation'
  updateProjectSource: { __typename?: 'GraphQLProjectSource'; id: string; interpretation: any }
}

export type DeleteProjectSourceMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteProjectSourceMutation = { __typename?: 'Mutation'; deleteProjectSource: string }

export type GetTasksQueryVariables = Exact<{
  reportingSchemaId: Scalars['String']
}>

export type GetTasksQuery = {
  __typename?: 'Query'
  tasks: Array<{
    __typename?: 'GraphQLTask'
    id: string
    name: string
    description: string
    dueDate: any
    authorId: string
    status: TaskStatus
    item:
      | { __typename: 'GraphQLSchemaCategory'; id: string }
      | { __typename: 'GraphQLSchemaElement'; id: string; name: string }
  }>
}

export type GetTasksForTasksPageQueryVariables = Exact<{
  reportingSchemaId: Scalars['String']
}>

export type GetTasksForTasksPageQuery = {
  __typename?: 'Query'
  tasks: Array<{
    __typename?: 'GraphQLTask'
    id: string
    name: string
    description: string
    status: TaskStatus
    author: { __typename?: 'GraphQLProjectMember'; id: string; name: string }
    assignee:
      | { __typename: 'GraphQLProjectGroup'; name: string; id: string }
      | { __typename: 'GraphQLProjectMember'; name: string; id: string }
    item:
      | { __typename: 'GraphQLSchemaCategory'; id: string }
      | { __typename: 'GraphQLSchemaElement'; id: string; name: string }
    comments?: Array<{ __typename?: 'GraphQLComment'; id: string }> | null
  }>
}

export type AddTaskMutationVariables = Exact<{
  reportingSchemaId: Scalars['String']
  name: Scalars['String']
  dueDate: Scalars['Date']
  item: TaskItem
  description: Scalars['String']
  status: TaskStatus
  assignee?: InputMaybe<GraphQlAssignee>
}>

export type AddTaskMutation = { __typename?: 'Mutation'; addTask: { __typename?: 'GraphQLTask'; id: string } }

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  dueDate?: InputMaybe<Scalars['Date']>
  description?: InputMaybe<Scalars['String']>
  status?: InputMaybe<TaskStatus>
  assignee?: InputMaybe<GraphQlAssignee>
}>

export type UpdateTaskMutation = { __typename?: 'Mutation'; updateTask: { __typename?: 'GraphQLTask'; id: string } }

export type AddCommentMutationVariables = Exact<{
  taskId: Scalars['String']
  text: Scalars['String']
}>

export type AddCommentMutation = {
  __typename?: 'Mutation'
  addComment: { __typename?: 'GraphQLComment'; id: string; added: any; text: string; authorId: string }
}

export type GetSingleTaskQueryVariables = Exact<{
  reportingSchemaId: Scalars['String']
  taskId: Scalars['String']
}>

export type GetSingleTaskQuery = {
  __typename?: 'Query'
  tasks: Array<{
    __typename?: 'GraphQLTask'
    id: string
    name: string
    reportingSchemaId: string
    description: string
    status: TaskStatus
    author: { __typename?: 'GraphQLProjectMember'; name: string; id: string }
    assignee:
      | { __typename: 'GraphQLProjectGroup'; name: string; id: string }
      | { __typename: 'GraphQLProjectMember'; name: string; id: string }
    item:
      | { __typename: 'GraphQLSchemaCategory'; id: string }
      | { __typename: 'GraphQLSchemaElement'; id: string; name: string }
  }>
}

export type GetProjectMembersQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectMembersQuery = {
  __typename?: 'Query'
  projectMembers: Array<{
    __typename?: 'GraphQLProjectMember'
    id: string
    userId: string
    name: string
    email: string
    company?: string | null
    lastLogin?: any | null
    projectId: string
    projectGroups?: Array<{ __typename?: 'GraphQLProjectGroup'; id: string; name: string }> | null
  }>
}

export type GetProjectGroupsQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectGroupsQuery = {
  __typename?: 'Query'
  projectGroups: Array<{ __typename?: 'GraphQLProjectGroup'; id: string; name: string }>
}

export type GetProjectNameQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectNameQuery = {
  __typename?: 'Query'
  projects: Array<{ __typename?: 'GraphQLProject'; name: string }>
}

export type GetCommentsForTaskQueryVariables = Exact<{
  taskId: Scalars['String']
}>

export type GetCommentsForTaskQuery = {
  __typename?: 'Query'
  comments: Array<{
    __typename?: 'GraphQLComment'
    id: string
    added: any
    text: string
    author?: { __typename?: 'GraphQLProjectMember'; name: string; id: string } | null
  }>
}

export type GetProjectSourceDataQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetProjectSourceDataQuery = {
  __typename?: 'Query'
  projectSources: Array<{
    __typename?: 'GraphQLProjectSource'
    id: string
    name: string
    type: ProjectSourceType
    interpretation: any
    data?: { __typename?: 'GraphQLSourceFile'; headers: Array<string>; rows: any } | null
  }>
}

export type GetAccountQueryVariables = Exact<{ [key: string]: never }>

export type GetAccountQuery = {
  __typename?: 'Query'
  account: { __typename?: 'GraphQLUserAccount'; id: string; name: string; email: string }
}

export type AddSchemaElementFromSourceMutationVariables = Exact<{
  schemaCategoryIds: Array<Scalars['String']> | Scalars['String']
  sourceId: Scalars['String']
  objectIds: Array<Scalars['String']> | Scalars['String']
  quantities?: InputMaybe<Array<Scalars['Float']> | Scalars['Float']>
  units?: InputMaybe<Array<Unit> | Unit>
}>

export type AddSchemaElementFromSourceMutation = {
  __typename?: 'Mutation'
  addSchemaElementFromSource: Array<{
    __typename?: 'GraphQLSchemaElement'
    id: string
    name: string
    quantity: number
    source?: { __typename?: 'GraphQLProjectSource'; id: string; dataId: string } | null
    schemaCategory: { __typename?: 'GraphQLSchemaCategory'; id: string }
  }>
}

export type GetAssembliesQueryVariables = Exact<{
  projectId: Scalars['String']
}>

export type GetAssembliesQuery = {
  __typename?: 'Query'
  projectAssemblies: Array<{
    __typename?: 'GraphQLProjectAssembly'
    id: string
    name: string
    unit: GraphQlAssemblyUnit
  }>
}

export type GetSingleProjectQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetSingleProjectQuery = {
  __typename?: 'Query'
  projects: Array<{ __typename?: 'GraphQLProject'; id: string; name: string; metaFields?: any | null }>
}

export type UploadTypeCodeElementsMutationVariables = Exact<{
  file: Scalars['String']
  name: Scalars['String']
  domain?: InputMaybe<Scalars['String']>
}>

export type UploadTypeCodeElementsMutation = { __typename?: 'Mutation'; createTypeCodeElementFromSource: string }

export type GetTypeCodesQueryVariables = Exact<{
  filters?: InputMaybe<TypeCodeFilters>
}>

export type GetTypeCodesQuery = {
  __typename?: 'Query'
  typeCodes: Array<{
    __typename?: 'GraphQLTypeCode'
    id: string
    name: string
    elements: Array<{
      __typename?: 'GraphQLTypeCodeElement'
      id: string
      name: string
      code: string
      parentPath: string
      level: number
      parentCode: string
    }>
  }>
}

export const GetSchemaTemplatesDocument = gql`
  query getSchemaTemplates {
    schemaTemplates {
      id
      name
      domain
      original {
        name
        id
        categories {
          id
          typeCodeElement {
            id
            code
            name
            level
            parentPath
          }
        }
      }
    }
  }
`

/**
 * __useGetSchemaTemplatesQuery__
 *
 * To run a query within a React component, call `useGetSchemaTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchemaTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchemaTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSchemaTemplatesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSchemaTemplatesQuery, GetSchemaTemplatesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSchemaTemplatesQuery, GetSchemaTemplatesQueryVariables>(GetSchemaTemplatesDocument, options)
}
export function useGetSchemaTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSchemaTemplatesQuery, GetSchemaTemplatesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSchemaTemplatesQuery, GetSchemaTemplatesQueryVariables>(
    GetSchemaTemplatesDocument,
    options,
  )
}
export type GetSchemaTemplatesQueryHookResult = ReturnType<typeof useGetSchemaTemplatesQuery>
export type GetSchemaTemplatesLazyQueryHookResult = ReturnType<typeof useGetSchemaTemplatesLazyQuery>
export type GetSchemaTemplatesQueryResult = Apollo.QueryResult<
  GetSchemaTemplatesQuery,
  GetSchemaTemplatesQueryVariables
>
export const DeleteSchemaTemplateDocument = gql`
  mutation deleteSchemaTemplate($id: String!) {
    deleteSchemaTemplate(id: $id)
  }
`
export type DeleteSchemaTemplateMutationFn = Apollo.MutationFunction<
  DeleteSchemaTemplateMutation,
  DeleteSchemaTemplateMutationVariables
>

/**
 * __useDeleteSchemaTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteSchemaTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSchemaTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSchemaTemplateMutation, { data, loading, error }] = useDeleteSchemaTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSchemaTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSchemaTemplateMutation, DeleteSchemaTemplateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteSchemaTemplateMutation, DeleteSchemaTemplateMutationVariables>(
    DeleteSchemaTemplateDocument,
    options,
  )
}
export type DeleteSchemaTemplateMutationHookResult = ReturnType<typeof useDeleteSchemaTemplateMutation>
export type DeleteSchemaTemplateMutationResult = Apollo.MutationResult<DeleteSchemaTemplateMutation>
export type DeleteSchemaTemplateMutationOptions = Apollo.BaseMutationOptions<
  DeleteSchemaTemplateMutation,
  DeleteSchemaTemplateMutationVariables
>
export const AddSchemaTemplateDocument = gql`
  mutation addSchemaTemplate(
    $name: String!
    $domain: String = null
    $typeCodes: [GraphQLTypeCodeElementInput!] = null
  ) {
    addSchemaTemplate(name: $name, domain: $domain, typeCodes: $typeCodes) {
      id
      name
      original {
        id
        name
        categories {
          id
          typeCodeElement {
            code
            name
            level
            parentPath
          }
        }
      }
    }
  }
`
export type AddSchemaTemplateMutationFn = Apollo.MutationFunction<
  AddSchemaTemplateMutation,
  AddSchemaTemplateMutationVariables
>

/**
 * __useAddSchemaTemplateMutation__
 *
 * To run a mutation, you first call `useAddSchemaTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSchemaTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSchemaTemplateMutation, { data, loading, error }] = useAddSchemaTemplateMutation({
 *   variables: {
 *      name: // value for 'name'
 *      domain: // value for 'domain'
 *      typeCodes: // value for 'typeCodes'
 *   },
 * });
 */
export function useAddSchemaTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<AddSchemaTemplateMutation, AddSchemaTemplateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddSchemaTemplateMutation, AddSchemaTemplateMutationVariables>(
    AddSchemaTemplateDocument,
    options,
  )
}
export type AddSchemaTemplateMutationHookResult = ReturnType<typeof useAddSchemaTemplateMutation>
export type AddSchemaTemplateMutationResult = Apollo.MutationResult<AddSchemaTemplateMutation>
export type AddSchemaTemplateMutationOptions = Apollo.BaseMutationOptions<
  AddSchemaTemplateMutation,
  AddSchemaTemplateMutationVariables
>
export const UpdateSchemaTemplateDocument = gql`
  mutation updateSchemaTemplate(
    $id: String!
    $name: String!
    $domain: String = null
    $typeCodes: [GraphQLTypeCodeElementInput!] = null
  ) {
    updateSchemaTemplate(id: $id, name: $name, domain: $domain, typeCodes: $typeCodes) {
      id
      name
      original {
        id
        name
        categories {
          id
          typeCodeElement {
            code
            name
            level
            parentPath
          }
        }
      }
    }
  }
`
export type UpdateSchemaTemplateMutationFn = Apollo.MutationFunction<
  UpdateSchemaTemplateMutation,
  UpdateSchemaTemplateMutationVariables
>

/**
 * __useUpdateSchemaTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateSchemaTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchemaTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchemaTemplateMutation, { data, loading, error }] = useUpdateSchemaTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      domain: // value for 'domain'
 *      typeCodes: // value for 'typeCodes'
 *   },
 * });
 */
export function useUpdateSchemaTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSchemaTemplateMutation, UpdateSchemaTemplateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateSchemaTemplateMutation, UpdateSchemaTemplateMutationVariables>(
    UpdateSchemaTemplateDocument,
    options,
  )
}
export type UpdateSchemaTemplateMutationHookResult = ReturnType<typeof useUpdateSchemaTemplateMutation>
export type UpdateSchemaTemplateMutationResult = Apollo.MutationResult<UpdateSchemaTemplateMutation>
export type UpdateSchemaTemplateMutationOptions = Apollo.BaseMutationOptions<
  UpdateSchemaTemplateMutation,
  UpdateSchemaTemplateMutationVariables
>
export const GetProjectSchemasDocument = gql`
  query getProjectSchemas($projectId: String!) {
    reportingSchemas(projectId: $projectId) {
      id
      name
    }
  }
`

/**
 * __useGetProjectSchemasQuery__
 *
 * To run a query within a React component, call `useGetProjectSchemasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectSchemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectSchemasQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectSchemasQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectSchemasQuery, GetProjectSchemasQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectSchemasQuery, GetProjectSchemasQueryVariables>(GetProjectSchemasDocument, options)
}
export function useGetProjectSchemasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectSchemasQuery, GetProjectSchemasQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectSchemasQuery, GetProjectSchemasQueryVariables>(
    GetProjectSchemasDocument,
    options,
  )
}
export type GetProjectSchemasQueryHookResult = ReturnType<typeof useGetProjectSchemasQuery>
export type GetProjectSchemasLazyQueryHookResult = ReturnType<typeof useGetProjectSchemasLazyQuery>
export type GetProjectSchemasQueryResult = Apollo.QueryResult<GetProjectSchemasQuery, GetProjectSchemasQueryVariables>
export const GetProjectSchemasWithCategoriesDocument = gql`
  query getProjectSchemasWithCategories($projectId: String!) {
    reportingSchemas(projectId: $projectId) {
      id
      name
      categories {
        id
        typeCodeElement {
          id
          code
          name
          level
          parentPath
        }
      }
    }
  }
`

/**
 * __useGetProjectSchemasWithCategoriesQuery__
 *
 * To run a query within a React component, call `useGetProjectSchemasWithCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectSchemasWithCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectSchemasWithCategoriesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectSchemasWithCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProjectSchemasWithCategoriesQuery,
    GetProjectSchemasWithCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectSchemasWithCategoriesQuery, GetProjectSchemasWithCategoriesQueryVariables>(
    GetProjectSchemasWithCategoriesDocument,
    options,
  )
}
export function useGetProjectSchemasWithCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectSchemasWithCategoriesQuery,
    GetProjectSchemasWithCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectSchemasWithCategoriesQuery, GetProjectSchemasWithCategoriesQueryVariables>(
    GetProjectSchemasWithCategoriesDocument,
    options,
  )
}
export type GetProjectSchemasWithCategoriesQueryHookResult = ReturnType<typeof useGetProjectSchemasWithCategoriesQuery>
export type GetProjectSchemasWithCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetProjectSchemasWithCategoriesLazyQuery
>
export type GetProjectSchemasWithCategoriesQueryResult = Apollo.QueryResult<
  GetProjectSchemasWithCategoriesQuery,
  GetProjectSchemasWithCategoriesQueryVariables
>
export const GetSchemaCategoriesDocument = gql`
  query getSchemaCategories($reportingSchemaId: String!, $filters: SchemaCategoryFilters = null) {
    schemaCategories(reportingSchemaId: $reportingSchemaId, filters: $filters) {
      id
      typeCodeElement {
        id
        code
        name
        level
        parentPath
      }
    }
  }
`

/**
 * __useGetSchemaCategoriesQuery__
 *
 * To run a query within a React component, call `useGetSchemaCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchemaCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchemaCategoriesQuery({
 *   variables: {
 *      reportingSchemaId: // value for 'reportingSchemaId'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetSchemaCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<GetSchemaCategoriesQuery, GetSchemaCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSchemaCategoriesQuery, GetSchemaCategoriesQueryVariables>(
    GetSchemaCategoriesDocument,
    options,
  )
}
export function useGetSchemaCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSchemaCategoriesQuery, GetSchemaCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSchemaCategoriesQuery, GetSchemaCategoriesQueryVariables>(
    GetSchemaCategoriesDocument,
    options,
  )
}
export type GetSchemaCategoriesQueryHookResult = ReturnType<typeof useGetSchemaCategoriesQuery>
export type GetSchemaCategoriesLazyQueryHookResult = ReturnType<typeof useGetSchemaCategoriesLazyQuery>
export type GetSchemaCategoriesQueryResult = Apollo.QueryResult<
  GetSchemaCategoriesQuery,
  GetSchemaCategoriesQueryVariables
>
export const GetSchemaElementsDocument = gql`
  query getSchemaElements($schemaCategoryIds: [String!]!) {
    schemaElements(schemaCategoryIds: $schemaCategoryIds) {
      id
      name
      quantity
      unit
      description
      result
      assemblyId
      assembly {
        id
        name
        category
        conversionFactor
        lifeTime
        unit
        layers {
          id
          name
          epd {
            id
            name
          }
          description
          conversionFactor
          referenceServiceLife
        }
        description
        metaFields
      }
      schemaCategory {
        id
        typeCodeElement {
          id
          code
          name
          level
          parentPath
        }
      }
      source {
        name
        type
      }
    }
  }
`

/**
 * __useGetSchemaElementsQuery__
 *
 * To run a query within a React component, call `useGetSchemaElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchemaElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchemaElementsQuery({
 *   variables: {
 *      schemaCategoryIds: // value for 'schemaCategoryIds'
 *   },
 * });
 */
export function useGetSchemaElementsQuery(
  baseOptions: Apollo.QueryHookOptions<GetSchemaElementsQuery, GetSchemaElementsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSchemaElementsQuery, GetSchemaElementsQueryVariables>(GetSchemaElementsDocument, options)
}
export function useGetSchemaElementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSchemaElementsQuery, GetSchemaElementsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSchemaElementsQuery, GetSchemaElementsQueryVariables>(
    GetSchemaElementsDocument,
    options,
  )
}
export type GetSchemaElementsQueryHookResult = ReturnType<typeof useGetSchemaElementsQuery>
export type GetSchemaElementsLazyQueryHookResult = ReturnType<typeof useGetSchemaElementsLazyQuery>
export type GetSchemaElementsQueryResult = Apollo.QueryResult<GetSchemaElementsQuery, GetSchemaElementsQueryVariables>
export const AddSchemaElementDocument = gql`
  mutation addSchemaElement(
    $schemaCategoryId: String!
    $name: String!
    $quantity: Float!
    $unit: Unit!
    $description: String!
    $assemblyId: String
  ) {
    addSchemaElement(
      schemaCategoryId: $schemaCategoryId
      name: $name
      quantity: $quantity
      unit: $unit
      description: $description
      assemblyId: $assemblyId
    ) {
      id
      name
      quantity
      unit
      description
      schemaCategory {
        id
      }
    }
  }
`
export type AddSchemaElementMutationFn = Apollo.MutationFunction<
  AddSchemaElementMutation,
  AddSchemaElementMutationVariables
>

/**
 * __useAddSchemaElementMutation__
 *
 * To run a mutation, you first call `useAddSchemaElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSchemaElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSchemaElementMutation, { data, loading, error }] = useAddSchemaElementMutation({
 *   variables: {
 *      schemaCategoryId: // value for 'schemaCategoryId'
 *      name: // value for 'name'
 *      quantity: // value for 'quantity'
 *      unit: // value for 'unit'
 *      description: // value for 'description'
 *      assemblyId: // value for 'assemblyId'
 *   },
 * });
 */
export function useAddSchemaElementMutation(
  baseOptions?: Apollo.MutationHookOptions<AddSchemaElementMutation, AddSchemaElementMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddSchemaElementMutation, AddSchemaElementMutationVariables>(
    AddSchemaElementDocument,
    options,
  )
}
export type AddSchemaElementMutationHookResult = ReturnType<typeof useAddSchemaElementMutation>
export type AddSchemaElementMutationResult = Apollo.MutationResult<AddSchemaElementMutation>
export type AddSchemaElementMutationOptions = Apollo.BaseMutationOptions<
  AddSchemaElementMutation,
  AddSchemaElementMutationVariables
>
export const GetSingleSchemaElementDocument = gql`
  query getSingleSchemaElement($schemaCategoryIds: [String!]!, $schemaElementId: String!) {
    schemaElements(schemaCategoryIds: $schemaCategoryIds, filters: { id: { equal: $schemaElementId } }) {
      id
      name
      quantity
      unit
      description
      schemaCategory {
        id
        description
        reportingSchemaId
        typeCodeElement {
          code
          name
          level
          parentPath
        }
      }
    }
  }
`

/**
 * __useGetSingleSchemaElementQuery__
 *
 * To run a query within a React component, call `useGetSingleSchemaElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleSchemaElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleSchemaElementQuery({
 *   variables: {
 *      schemaCategoryIds: // value for 'schemaCategoryIds'
 *      schemaElementId: // value for 'schemaElementId'
 *   },
 * });
 */
export function useGetSingleSchemaElementQuery(
  baseOptions: Apollo.QueryHookOptions<GetSingleSchemaElementQuery, GetSingleSchemaElementQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSingleSchemaElementQuery, GetSingleSchemaElementQueryVariables>(
    GetSingleSchemaElementDocument,
    options,
  )
}
export function useGetSingleSchemaElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSingleSchemaElementQuery, GetSingleSchemaElementQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSingleSchemaElementQuery, GetSingleSchemaElementQueryVariables>(
    GetSingleSchemaElementDocument,
    options,
  )
}
export type GetSingleSchemaElementQueryHookResult = ReturnType<typeof useGetSingleSchemaElementQuery>
export type GetSingleSchemaElementLazyQueryHookResult = ReturnType<typeof useGetSingleSchemaElementLazyQuery>
export type GetSingleSchemaElementQueryResult = Apollo.QueryResult<
  GetSingleSchemaElementQuery,
  GetSingleSchemaElementQueryVariables
>
export const UpdateSchemaElementsDocument = gql`
  mutation updateSchemaElements($elements: [SchemaElementUpdateInput!]!) {
    updateSchemaElements(schemaElements: $elements) {
      id
      schemaCategory {
        id
      }
    }
  }
`
export type UpdateSchemaElementsMutationFn = Apollo.MutationFunction<
  UpdateSchemaElementsMutation,
  UpdateSchemaElementsMutationVariables
>

/**
 * __useUpdateSchemaElementsMutation__
 *
 * To run a mutation, you first call `useUpdateSchemaElementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchemaElementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchemaElementsMutation, { data, loading, error }] = useUpdateSchemaElementsMutation({
 *   variables: {
 *      elements: // value for 'elements'
 *   },
 * });
 */
export function useUpdateSchemaElementsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSchemaElementsMutation, UpdateSchemaElementsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateSchemaElementsMutation, UpdateSchemaElementsMutationVariables>(
    UpdateSchemaElementsDocument,
    options,
  )
}
export type UpdateSchemaElementsMutationHookResult = ReturnType<typeof useUpdateSchemaElementsMutation>
export type UpdateSchemaElementsMutationResult = Apollo.MutationResult<UpdateSchemaElementsMutation>
export type UpdateSchemaElementsMutationOptions = Apollo.BaseMutationOptions<
  UpdateSchemaElementsMutation,
  UpdateSchemaElementsMutationVariables
>
export const DeleteSchemaElementDocument = gql`
  mutation deleteSchemaElement($id: String!) {
    deleteSchemaElement(id: $id)
  }
`
export type DeleteSchemaElementMutationFn = Apollo.MutationFunction<
  DeleteSchemaElementMutation,
  DeleteSchemaElementMutationVariables
>

/**
 * __useDeleteSchemaElementMutation__
 *
 * To run a mutation, you first call `useDeleteSchemaElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSchemaElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSchemaElementMutation, { data, loading, error }] = useDeleteSchemaElementMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSchemaElementMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSchemaElementMutation, DeleteSchemaElementMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteSchemaElementMutation, DeleteSchemaElementMutationVariables>(
    DeleteSchemaElementDocument,
    options,
  )
}
export type DeleteSchemaElementMutationHookResult = ReturnType<typeof useDeleteSchemaElementMutation>
export type DeleteSchemaElementMutationResult = Apollo.MutationResult<DeleteSchemaElementMutation>
export type DeleteSchemaElementMutationOptions = Apollo.BaseMutationOptions<
  DeleteSchemaElementMutation,
  DeleteSchemaElementMutationVariables
>
export const AddReportingSchemaDocument = gql`
  mutation addReportingSchema($templateId: String!, $name: String, $projectId: String!) {
    addReportingSchema(templateId: $templateId, name: $name, projectId: $projectId) {
      id
      name
      projectId
    }
  }
`
export type AddReportingSchemaMutationFn = Apollo.MutationFunction<
  AddReportingSchemaMutation,
  AddReportingSchemaMutationVariables
>

/**
 * __useAddReportingSchemaMutation__
 *
 * To run a mutation, you first call `useAddReportingSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReportingSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReportingSchemaMutation, { data, loading, error }] = useAddReportingSchemaMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      name: // value for 'name'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAddReportingSchemaMutation(
  baseOptions?: Apollo.MutationHookOptions<AddReportingSchemaMutation, AddReportingSchemaMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddReportingSchemaMutation, AddReportingSchemaMutationVariables>(
    AddReportingSchemaDocument,
    options,
  )
}
export type AddReportingSchemaMutationHookResult = ReturnType<typeof useAddReportingSchemaMutation>
export type AddReportingSchemaMutationResult = Apollo.MutationResult<AddReportingSchemaMutation>
export type AddReportingSchemaMutationOptions = Apollo.BaseMutationOptions<
  AddReportingSchemaMutation,
  AddReportingSchemaMutationVariables
>
export const ExportReportingSchemaDocument = gql`
  query ExportReportingSchema($reportingSchemaId: String!, $exportFormat: exportFormat!) {
    exportReportingSchema(reportingSchemaId: $reportingSchemaId, exportFormat: $exportFormat)
  }
`

/**
 * __useExportReportingSchemaQuery__
 *
 * To run a query within a React component, call `useExportReportingSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportReportingSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportReportingSchemaQuery({
 *   variables: {
 *      reportingSchemaId: // value for 'reportingSchemaId'
 *      exportFormat: // value for 'exportFormat'
 *   },
 * });
 */
export function useExportReportingSchemaQuery(
  baseOptions: Apollo.QueryHookOptions<ExportReportingSchemaQuery, ExportReportingSchemaQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ExportReportingSchemaQuery, ExportReportingSchemaQueryVariables>(
    ExportReportingSchemaDocument,
    options,
  )
}
export function useExportReportingSchemaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExportReportingSchemaQuery, ExportReportingSchemaQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ExportReportingSchemaQuery, ExportReportingSchemaQueryVariables>(
    ExportReportingSchemaDocument,
    options,
  )
}
export type ExportReportingSchemaQueryHookResult = ReturnType<typeof useExportReportingSchemaQuery>
export type ExportReportingSchemaLazyQueryHookResult = ReturnType<typeof useExportReportingSchemaLazyQuery>
export type ExportReportingSchemaQueryResult = Apollo.QueryResult<
  ExportReportingSchemaQuery,
  ExportReportingSchemaQueryVariables
>
export const AddReportingSchemaFromTemplateDocument = gql`
  mutation addReportingSchemaFromTemplate($templateId: String!, $name: String, $projectId: String!) {
    addReportingSchemaFromTemplate(templateId: $templateId, name: $name, projectId: $projectId) {
      id
      name
    }
  }
`
export type AddReportingSchemaFromTemplateMutationFn = Apollo.MutationFunction<
  AddReportingSchemaFromTemplateMutation,
  AddReportingSchemaFromTemplateMutationVariables
>

/**
 * __useAddReportingSchemaFromTemplateMutation__
 *
 * To run a mutation, you first call `useAddReportingSchemaFromTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReportingSchemaFromTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReportingSchemaFromTemplateMutation, { data, loading, error }] = useAddReportingSchemaFromTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      name: // value for 'name'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAddReportingSchemaFromTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddReportingSchemaFromTemplateMutation,
    AddReportingSchemaFromTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddReportingSchemaFromTemplateMutation, AddReportingSchemaFromTemplateMutationVariables>(
    AddReportingSchemaFromTemplateDocument,
    options,
  )
}
export type AddReportingSchemaFromTemplateMutationHookResult = ReturnType<
  typeof useAddReportingSchemaFromTemplateMutation
>
export type AddReportingSchemaFromTemplateMutationResult = Apollo.MutationResult<AddReportingSchemaFromTemplateMutation>
export type AddReportingSchemaFromTemplateMutationOptions = Apollo.BaseMutationOptions<
  AddReportingSchemaFromTemplateMutation,
  AddReportingSchemaFromTemplateMutationVariables
>
export const GetProjectSourcesDocument = gql`
  query getProjectSources($projectId: String!) {
    projectSources(projectId: $projectId) {
      id
      name
      type
      author {
        name
      }
      authorId
      dataId
      updated
      metaFields
      interpretation
    }
  }
`

/**
 * __useGetProjectSourcesQuery__
 *
 * To run a query within a React component, call `useGetProjectSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectSourcesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectSourcesQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectSourcesQuery, GetProjectSourcesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectSourcesQuery, GetProjectSourcesQueryVariables>(GetProjectSourcesDocument, options)
}
export function useGetProjectSourcesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectSourcesQuery, GetProjectSourcesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectSourcesQuery, GetProjectSourcesQueryVariables>(
    GetProjectSourcesDocument,
    options,
  )
}
export type GetProjectSourcesQueryHookResult = ReturnType<typeof useGetProjectSourcesQuery>
export type GetProjectSourcesLazyQueryHookResult = ReturnType<typeof useGetProjectSourcesLazyQuery>
export type GetProjectSourcesQueryResult = Apollo.QueryResult<GetProjectSourcesQuery, GetProjectSourcesQueryVariables>
export const AddProjectSourceDocument = gql`
  mutation addProjectSource($projectId: String!, $type: ProjectSourceType!, $name: String!, $file: String) {
    addProjectSource(projectId: $projectId, type: $type, name: $name, file: $file) {
      id
      name
      type
      dataId
    }
  }
`
export type AddProjectSourceMutationFn = Apollo.MutationFunction<
  AddProjectSourceMutation,
  AddProjectSourceMutationVariables
>

/**
 * __useAddProjectSourceMutation__
 *
 * To run a mutation, you first call `useAddProjectSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectSourceMutation, { data, loading, error }] = useAddProjectSourceMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      type: // value for 'type'
 *      name: // value for 'name'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddProjectSourceMutation(
  baseOptions?: Apollo.MutationHookOptions<AddProjectSourceMutation, AddProjectSourceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddProjectSourceMutation, AddProjectSourceMutationVariables>(
    AddProjectSourceDocument,
    options,
  )
}
export type AddProjectSourceMutationHookResult = ReturnType<typeof useAddProjectSourceMutation>
export type AddProjectSourceMutationResult = Apollo.MutationResult<AddProjectSourceMutation>
export type AddProjectSourceMutationOptions = Apollo.BaseMutationOptions<
  AddProjectSourceMutation,
  AddProjectSourceMutationVariables
>
export const UpdateProjectSourceDocument = gql`
  mutation updateProjectSource($id: String!, $type: ProjectSourceType, $name: String, $file: String) {
    updateProjectSource(id: $id, type: $type, name: $name, file: $file) {
      projectId
      id
      name
      type
      dataId
    }
  }
`
export type UpdateProjectSourceMutationFn = Apollo.MutationFunction<
  UpdateProjectSourceMutation,
  UpdateProjectSourceMutationVariables
>

/**
 * __useUpdateProjectSourceMutation__
 *
 * To run a mutation, you first call `useUpdateProjectSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectSourceMutation, { data, loading, error }] = useUpdateProjectSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *      name: // value for 'name'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateProjectSourceMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectSourceMutation, UpdateProjectSourceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateProjectSourceMutation, UpdateProjectSourceMutationVariables>(
    UpdateProjectSourceDocument,
    options,
  )
}
export type UpdateProjectSourceMutationHookResult = ReturnType<typeof useUpdateProjectSourceMutation>
export type UpdateProjectSourceMutationResult = Apollo.MutationResult<UpdateProjectSourceMutation>
export type UpdateProjectSourceMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectSourceMutation,
  UpdateProjectSourceMutationVariables
>
export const UpdateProjectSourceInterpretationDocument = gql`
  mutation updateProjectSourceInterpretation($id: String!, $type: ProjectSourceType, $interpretation: JSON) {
    updateProjectSource(id: $id, type: $type, interpretation: $interpretation) {
      id
      interpretation
    }
  }
`
export type UpdateProjectSourceInterpretationMutationFn = Apollo.MutationFunction<
  UpdateProjectSourceInterpretationMutation,
  UpdateProjectSourceInterpretationMutationVariables
>

/**
 * __useUpdateProjectSourceInterpretationMutation__
 *
 * To run a mutation, you first call `useUpdateProjectSourceInterpretationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectSourceInterpretationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectSourceInterpretationMutation, { data, loading, error }] = useUpdateProjectSourceInterpretationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *      interpretation: // value for 'interpretation'
 *   },
 * });
 */
export function useUpdateProjectSourceInterpretationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectSourceInterpretationMutation,
    UpdateProjectSourceInterpretationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateProjectSourceInterpretationMutation,
    UpdateProjectSourceInterpretationMutationVariables
  >(UpdateProjectSourceInterpretationDocument, options)
}
export type UpdateProjectSourceInterpretationMutationHookResult = ReturnType<
  typeof useUpdateProjectSourceInterpretationMutation
>
export type UpdateProjectSourceInterpretationMutationResult =
  Apollo.MutationResult<UpdateProjectSourceInterpretationMutation>
export type UpdateProjectSourceInterpretationMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectSourceInterpretationMutation,
  UpdateProjectSourceInterpretationMutationVariables
>
export const DeleteProjectSourceDocument = gql`
  mutation deleteProjectSource($id: String!) {
    deleteProjectSource(id: $id)
  }
`
export type DeleteProjectSourceMutationFn = Apollo.MutationFunction<
  DeleteProjectSourceMutation,
  DeleteProjectSourceMutationVariables
>

/**
 * __useDeleteProjectSourceMutation__
 *
 * To run a mutation, you first call `useDeleteProjectSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectSourceMutation, { data, loading, error }] = useDeleteProjectSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectSourceMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteProjectSourceMutation, DeleteProjectSourceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteProjectSourceMutation, DeleteProjectSourceMutationVariables>(
    DeleteProjectSourceDocument,
    options,
  )
}
export type DeleteProjectSourceMutationHookResult = ReturnType<typeof useDeleteProjectSourceMutation>
export type DeleteProjectSourceMutationResult = Apollo.MutationResult<DeleteProjectSourceMutation>
export type DeleteProjectSourceMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectSourceMutation,
  DeleteProjectSourceMutationVariables
>
export const GetTasksDocument = gql`
  query getTasks($reportingSchemaId: String!) {
    tasks(reportingSchemaId: $reportingSchemaId) {
      id
      name
      description
      dueDate
      authorId
      status
      item {
        ... on GraphQLSchemaCategory {
          __typename
          id
        }
        ... on GraphQLSchemaElement {
          __typename
          id
          name
        }
      }
    }
  }
`

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      reportingSchemaId: // value for 'reportingSchemaId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options)
}
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options)
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>
export const GetTasksForTasksPageDocument = gql`
  query getTasksForTasksPage($reportingSchemaId: String!) {
    tasks(reportingSchemaId: $reportingSchemaId) {
      id
      name
      description
      author {
        id
        name
      }
      status
      assignee {
        ... on GraphQLProjectMember {
          __typename
          name
          id
        }
        ... on GraphQLProjectGroup {
          __typename
          name
          id
        }
      }
      item {
        ... on GraphQLSchemaCategory {
          __typename
          id
        }
        ... on GraphQLSchemaElement {
          __typename
          id
          name
        }
      }
      comments {
        id
      }
    }
  }
`

/**
 * __useGetTasksForTasksPageQuery__
 *
 * To run a query within a React component, call `useGetTasksForTasksPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksForTasksPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksForTasksPageQuery({
 *   variables: {
 *      reportingSchemaId: // value for 'reportingSchemaId'
 *   },
 * });
 */
export function useGetTasksForTasksPageQuery(
  baseOptions: Apollo.QueryHookOptions<GetTasksForTasksPageQuery, GetTasksForTasksPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTasksForTasksPageQuery, GetTasksForTasksPageQueryVariables>(
    GetTasksForTasksPageDocument,
    options,
  )
}
export function useGetTasksForTasksPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTasksForTasksPageQuery, GetTasksForTasksPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTasksForTasksPageQuery, GetTasksForTasksPageQueryVariables>(
    GetTasksForTasksPageDocument,
    options,
  )
}
export type GetTasksForTasksPageQueryHookResult = ReturnType<typeof useGetTasksForTasksPageQuery>
export type GetTasksForTasksPageLazyQueryHookResult = ReturnType<typeof useGetTasksForTasksPageLazyQuery>
export type GetTasksForTasksPageQueryResult = Apollo.QueryResult<
  GetTasksForTasksPageQuery,
  GetTasksForTasksPageQueryVariables
>
export const AddTaskDocument = gql`
  mutation addTask(
    $reportingSchemaId: String!
    $name: String!
    $dueDate: Date!
    $item: taskItem!
    $description: String!
    $status: TaskStatus!
    $assignee: GraphQLAssignee
  ) {
    addTask(
      reportingSchemaId: $reportingSchemaId
      name: $name
      dueDate: $dueDate
      description: $description
      status: $status
      item: $item
      assignee: $assignee
    ) {
      id
    }
  }
`
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      reportingSchemaId: // value for 'reportingSchemaId'
 *      name: // value for 'name'
 *      dueDate: // value for 'dueDate'
 *      item: // value for 'item'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      assignee: // value for 'assignee'
 *   },
 * });
 */
export function useAddTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options)
}
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>
export const UpdateTaskDocument = gql`
  mutation updateTask(
    $taskId: String!
    $name: String
    $dueDate: Date
    $description: String
    $status: TaskStatus
    $assignee: GraphQLAssignee
  ) {
    updateTask(
      id: $taskId
      name: $name
      dueDate: $dueDate
      description: $description
      status: $status
      assignee: $assignee
    ) {
      id
    }
  }
`
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      name: // value for 'name'
 *      dueDate: // value for 'dueDate'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      assignee: // value for 'assignee'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options)
}
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>
export const AddCommentDocument = gql`
  mutation addComment($taskId: String!, $text: String!) {
    addComment(taskId: $taskId, text: $text) {
      id
      added
      text
      authorId
    }
  }
`
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options)
}
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>
export const GetSingleTaskDocument = gql`
  query getSingleTask($reportingSchemaId: String!, $taskId: String!) {
    tasks(reportingSchemaId: $reportingSchemaId, filters: { id: { equal: $taskId } }) {
      id
      name
      reportingSchemaId
      description
      author {
        name
        id
      }
      status
      assignee {
        ... on GraphQLProjectMember {
          __typename
          name
          id
        }
        ... on GraphQLProjectGroup {
          __typename
          name
          id
        }
      }
      item {
        ... on GraphQLSchemaCategory {
          __typename
          id
        }
        ... on GraphQLSchemaElement {
          __typename
          id
          name
        }
      }
    }
  }
`

/**
 * __useGetSingleTaskQuery__
 *
 * To run a query within a React component, call `useGetSingleTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleTaskQuery({
 *   variables: {
 *      reportingSchemaId: // value for 'reportingSchemaId'
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetSingleTaskQuery(
  baseOptions: Apollo.QueryHookOptions<GetSingleTaskQuery, GetSingleTaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSingleTaskQuery, GetSingleTaskQueryVariables>(GetSingleTaskDocument, options)
}
export function useGetSingleTaskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSingleTaskQuery, GetSingleTaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSingleTaskQuery, GetSingleTaskQueryVariables>(GetSingleTaskDocument, options)
}
export type GetSingleTaskQueryHookResult = ReturnType<typeof useGetSingleTaskQuery>
export type GetSingleTaskLazyQueryHookResult = ReturnType<typeof useGetSingleTaskLazyQuery>
export type GetSingleTaskQueryResult = Apollo.QueryResult<GetSingleTaskQuery, GetSingleTaskQueryVariables>
export const GetProjectMembersDocument = gql`
  query getProjectMembers($projectId: String!) {
    projectMembers(projectId: $projectId) {
      id
      userId
      name
      userId
      email
      company
      lastLogin
      projectId
      projectGroups {
        id
        name
      }
    }
  }
`

/**
 * __useGetProjectMembersQuery__
 *
 * To run a query within a React component, call `useGetProjectMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectMembersQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectMembersQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectMembersQuery, GetProjectMembersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectMembersQuery, GetProjectMembersQueryVariables>(GetProjectMembersDocument, options)
}
export function useGetProjectMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectMembersQuery, GetProjectMembersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectMembersQuery, GetProjectMembersQueryVariables>(
    GetProjectMembersDocument,
    options,
  )
}
export type GetProjectMembersQueryHookResult = ReturnType<typeof useGetProjectMembersQuery>
export type GetProjectMembersLazyQueryHookResult = ReturnType<typeof useGetProjectMembersLazyQuery>
export type GetProjectMembersQueryResult = Apollo.QueryResult<GetProjectMembersQuery, GetProjectMembersQueryVariables>
export const GetProjectGroupsDocument = gql`
  query getProjectGroups($projectId: String!) {
    projectGroups(projectId: $projectId) {
      id
      name
    }
  }
`

/**
 * __useGetProjectGroupsQuery__
 *
 * To run a query within a React component, call `useGetProjectGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectGroupsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectGroupsQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectGroupsQuery, GetProjectGroupsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectGroupsQuery, GetProjectGroupsQueryVariables>(GetProjectGroupsDocument, options)
}
export function useGetProjectGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectGroupsQuery, GetProjectGroupsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectGroupsQuery, GetProjectGroupsQueryVariables>(GetProjectGroupsDocument, options)
}
export type GetProjectGroupsQueryHookResult = ReturnType<typeof useGetProjectGroupsQuery>
export type GetProjectGroupsLazyQueryHookResult = ReturnType<typeof useGetProjectGroupsLazyQuery>
export type GetProjectGroupsQueryResult = Apollo.QueryResult<GetProjectGroupsQuery, GetProjectGroupsQueryVariables>
export const GetProjectNameDocument = gql`
  query getProjectName($projectId: String!) {
    projects(filters: { id: { equal: $projectId } }) {
      name
    }
  }
`

/**
 * __useGetProjectNameQuery__
 *
 * To run a query within a React component, call `useGetProjectNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectNameQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectNameQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectNameQuery, GetProjectNameQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectNameQuery, GetProjectNameQueryVariables>(GetProjectNameDocument, options)
}
export function useGetProjectNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectNameQuery, GetProjectNameQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectNameQuery, GetProjectNameQueryVariables>(GetProjectNameDocument, options)
}
export type GetProjectNameQueryHookResult = ReturnType<typeof useGetProjectNameQuery>
export type GetProjectNameLazyQueryHookResult = ReturnType<typeof useGetProjectNameLazyQuery>
export type GetProjectNameQueryResult = Apollo.QueryResult<GetProjectNameQuery, GetProjectNameQueryVariables>
export const GetCommentsForTaskDocument = gql`
  query getCommentsForTask($taskId: String!) {
    comments(taskId: $taskId) {
      id
      added
      text
      author {
        name
        id
      }
    }
  }
`

/**
 * __useGetCommentsForTaskQuery__
 *
 * To run a query within a React component, call `useGetCommentsForTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsForTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsForTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetCommentsForTaskQuery(
  baseOptions: Apollo.QueryHookOptions<GetCommentsForTaskQuery, GetCommentsForTaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCommentsForTaskQuery, GetCommentsForTaskQueryVariables>(GetCommentsForTaskDocument, options)
}
export function useGetCommentsForTaskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsForTaskQuery, GetCommentsForTaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCommentsForTaskQuery, GetCommentsForTaskQueryVariables>(
    GetCommentsForTaskDocument,
    options,
  )
}
export type GetCommentsForTaskQueryHookResult = ReturnType<typeof useGetCommentsForTaskQuery>
export type GetCommentsForTaskLazyQueryHookResult = ReturnType<typeof useGetCommentsForTaskLazyQuery>
export type GetCommentsForTaskQueryResult = Apollo.QueryResult<
  GetCommentsForTaskQuery,
  GetCommentsForTaskQueryVariables
>
export const GetProjectSourceDataDocument = gql`
  query getProjectSourceData($projectId: String!) {
    projectSources(projectId: $projectId) {
      id
      name
      type
      data {
        headers
        rows
      }
      interpretation
    }
  }
`

/**
 * __useGetProjectSourceDataQuery__
 *
 * To run a query within a React component, call `useGetProjectSourceDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectSourceDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectSourceDataQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectSourceDataQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectSourceDataQuery, GetProjectSourceDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectSourceDataQuery, GetProjectSourceDataQueryVariables>(
    GetProjectSourceDataDocument,
    options,
  )
}
export function useGetProjectSourceDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectSourceDataQuery, GetProjectSourceDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectSourceDataQuery, GetProjectSourceDataQueryVariables>(
    GetProjectSourceDataDocument,
    options,
  )
}
export type GetProjectSourceDataQueryHookResult = ReturnType<typeof useGetProjectSourceDataQuery>
export type GetProjectSourceDataLazyQueryHookResult = ReturnType<typeof useGetProjectSourceDataLazyQuery>
export type GetProjectSourceDataQueryResult = Apollo.QueryResult<
  GetProjectSourceDataQuery,
  GetProjectSourceDataQueryVariables
>
export const GetAccountDocument = gql`
  query getAccount {
    account {
      id
      name
      email
    }
  }
`

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options)
}
export function useGetAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options)
}
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>
export const AddSchemaElementFromSourceDocument = gql`
  mutation addSchemaElementFromSource(
    $schemaCategoryIds: [String!]!
    $sourceId: String!
    $objectIds: [String!]!
    $quantities: [Float!]
    $units: [Unit!]
  ) {
    addSchemaElementFromSource(
      schemaCategoryIds: $schemaCategoryIds
      sourceId: $sourceId
      objectIds: $objectIds
      quantities: $quantities
      units: $units
    ) {
      source {
        id
        dataId
      }
      id
      name
      quantity
      schemaCategory {
        id
      }
    }
  }
`
export type AddSchemaElementFromSourceMutationFn = Apollo.MutationFunction<
  AddSchemaElementFromSourceMutation,
  AddSchemaElementFromSourceMutationVariables
>

/**
 * __useAddSchemaElementFromSourceMutation__
 *
 * To run a mutation, you first call `useAddSchemaElementFromSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSchemaElementFromSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSchemaElementFromSourceMutation, { data, loading, error }] = useAddSchemaElementFromSourceMutation({
 *   variables: {
 *      schemaCategoryIds: // value for 'schemaCategoryIds'
 *      sourceId: // value for 'sourceId'
 *      objectIds: // value for 'objectIds'
 *      quantities: // value for 'quantities'
 *      units: // value for 'units'
 *   },
 * });
 */
export function useAddSchemaElementFromSourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSchemaElementFromSourceMutation,
    AddSchemaElementFromSourceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddSchemaElementFromSourceMutation, AddSchemaElementFromSourceMutationVariables>(
    AddSchemaElementFromSourceDocument,
    options,
  )
}
export type AddSchemaElementFromSourceMutationHookResult = ReturnType<typeof useAddSchemaElementFromSourceMutation>
export type AddSchemaElementFromSourceMutationResult = Apollo.MutationResult<AddSchemaElementFromSourceMutation>
export type AddSchemaElementFromSourceMutationOptions = Apollo.BaseMutationOptions<
  AddSchemaElementFromSourceMutation,
  AddSchemaElementFromSourceMutationVariables
>
export const GetAssembliesDocument = gql`
  query getAssemblies($projectId: String!) {
    projectAssemblies(projectId: $projectId) {
      id
      name
      unit
    }
  }
`

/**
 * __useGetAssembliesQuery__
 *
 * To run a query within a React component, call `useGetAssembliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssembliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssembliesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetAssembliesQuery(
  baseOptions: Apollo.QueryHookOptions<GetAssembliesQuery, GetAssembliesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAssembliesQuery, GetAssembliesQueryVariables>(GetAssembliesDocument, options)
}
export function useGetAssembliesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAssembliesQuery, GetAssembliesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAssembliesQuery, GetAssembliesQueryVariables>(GetAssembliesDocument, options)
}
export type GetAssembliesQueryHookResult = ReturnType<typeof useGetAssembliesQuery>
export type GetAssembliesLazyQueryHookResult = ReturnType<typeof useGetAssembliesLazyQuery>
export type GetAssembliesQueryResult = Apollo.QueryResult<GetAssembliesQuery, GetAssembliesQueryVariables>
export const GetSingleProjectDocument = gql`
  query getSingleProject($id: String!) {
    projects(filters: { id: { equal: $id } }) {
      id
      name
      metaFields
    }
  }
`

/**
 * __useGetSingleProjectQuery__
 *
 * To run a query within a React component, call `useGetSingleProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleProjectQuery(
  baseOptions: Apollo.QueryHookOptions<GetSingleProjectQuery, GetSingleProjectQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSingleProjectQuery, GetSingleProjectQueryVariables>(GetSingleProjectDocument, options)
}
export function useGetSingleProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSingleProjectQuery, GetSingleProjectQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSingleProjectQuery, GetSingleProjectQueryVariables>(GetSingleProjectDocument, options)
}
export type GetSingleProjectQueryHookResult = ReturnType<typeof useGetSingleProjectQuery>
export type GetSingleProjectLazyQueryHookResult = ReturnType<typeof useGetSingleProjectLazyQuery>
export type GetSingleProjectQueryResult = Apollo.QueryResult<GetSingleProjectQuery, GetSingleProjectQueryVariables>
export const UploadTypeCodeElementsDocument = gql`
  mutation uploadTypeCodeElements($file: String!, $name: String!, $domain: String = null) {
    createTypeCodeElementFromSource(file: $file, name: $name, domain: $domain)
  }
`
export type UploadTypeCodeElementsMutationFn = Apollo.MutationFunction<
  UploadTypeCodeElementsMutation,
  UploadTypeCodeElementsMutationVariables
>

/**
 * __useUploadTypeCodeElementsMutation__
 *
 * To run a mutation, you first call `useUploadTypeCodeElementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadTypeCodeElementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadTypeCodeElementsMutation, { data, loading, error }] = useUploadTypeCodeElementsMutation({
 *   variables: {
 *      file: // value for 'file'
 *      name: // value for 'name'
 *      domain: // value for 'domain'
 *   },
 * });
 */
export function useUploadTypeCodeElementsMutation(
  baseOptions?: Apollo.MutationHookOptions<UploadTypeCodeElementsMutation, UploadTypeCodeElementsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UploadTypeCodeElementsMutation, UploadTypeCodeElementsMutationVariables>(
    UploadTypeCodeElementsDocument,
    options,
  )
}
export type UploadTypeCodeElementsMutationHookResult = ReturnType<typeof useUploadTypeCodeElementsMutation>
export type UploadTypeCodeElementsMutationResult = Apollo.MutationResult<UploadTypeCodeElementsMutation>
export type UploadTypeCodeElementsMutationOptions = Apollo.BaseMutationOptions<
  UploadTypeCodeElementsMutation,
  UploadTypeCodeElementsMutationVariables
>
export const GetTypeCodesDocument = gql`
  query getTypeCodes($filters: TypeCodeFilters = null) {
    typeCodes(filters: $filters) {
      id
      name
      elements {
        id
        name
        code
        parentPath
        level
        parentCode
      }
    }
  }
`

/**
 * __useGetTypeCodesQuery__
 *
 * To run a query within a React component, call `useGetTypeCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeCodesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetTypeCodesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTypeCodesQuery, GetTypeCodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTypeCodesQuery, GetTypeCodesQueryVariables>(GetTypeCodesDocument, options)
}
export function useGetTypeCodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTypeCodesQuery, GetTypeCodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTypeCodesQuery, GetTypeCodesQueryVariables>(GetTypeCodesDocument, options)
}
export type GetTypeCodesQueryHookResult = ReturnType<typeof useGetTypeCodesQuery>
export type GetTypeCodesLazyQueryHookResult = ReturnType<typeof useGetTypeCodesLazyQuery>
export type GetTypeCodesQueryResult = Apollo.QueryResult<GetTypeCodesQuery, GetTypeCodesQueryVariables>
