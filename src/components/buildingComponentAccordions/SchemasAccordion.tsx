import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { GraphQlReportingSchema, GraphQlSchemaCategory } from '../../dataAccess'
import { BCAccordion, BCAccordionDetails } from './BCAccordion'
import { CategoriesAccordion } from './CategoriesAccordion'
import { SchemaElement } from '../schemaElementsTable'
import { Task } from '../tasksTable'
import { ErrorBoundary } from '@lcacollect/components'

interface SchemasAccordionProps {
  categoriesId: string[]
  schema: GraphQlReportingSchema
  projElements: SchemaElement[]
  projTasks: Task[]
  isAddingTasks: boolean
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: Dispatch<SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
  refetchElements: () => void
}

export const SchemasAccordion = (props: SchemasAccordionProps) => {
  const {
    categoriesId,
    projElements,
    projTasks,
    schema,
    isAddingTasks,
    refToAddTaskTo,
    setRefToAddTaskTo,
    setSelectedTask,
    setIsAddTaskDialogOpen,
    refetchElements,
  } = props

  if (!schema.categories || !schema.categories.find((cat) => cat.typeCodeElement?.parentPath)) {
    return (
      <BCAccordion expanded={true} level={0}>
        <BCAccordionDetails>No categories found</BCAccordionDetails>
      </BCAccordion>
    )
  }

  const categoriesByPath = useMemo(() => sortCategoriesByPath(schema.categories), [schema.categories])

  return (
    <BCAccordion expanded={true} level={0}>
      <BCAccordionDetails>
        {Object.values(categoriesByPath).map((category: NestedCategory, index: number) => (
          <ErrorBoundary key={index}>
            <CategoriesAccordion
              level={0}
              category={category}
              projElements={projElements}
              projTasks={projTasks}
              categoriesId={categoriesId}
              isAddingTasks={isAddingTasks}
              refToAddTaskTo={refToAddTaskTo}
              setRefToAddTaskTo={setRefToAddTaskTo}
              setSelectedTask={setSelectedTask}
              setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
              refetchElements={refetchElements}
            />
          </ErrorBoundary>
        ))}
      </BCAccordionDetails>
    </BCAccordion>
  )
}

export interface NestedCategory extends GraphQlSchemaCategory {
  children: { [key: string]: NestedCategory }
}

const sortCategoriesByPath = (categories: GraphQlSchemaCategory[] | undefined | null) => {
  const groupedData: { [key: string]: NestedCategory } = {}
  if (!categories) {
    return groupedData
  }

  categories
    .filter((category) => category.typeCodeElement?.level === 1)
    .sort((prev, next) => Number(prev.typeCodeElement?.code || 0) - Number(next.typeCodeElement?.code || 0))
    .forEach((category) => (groupedData[category.typeCodeElement?.id || 0] = { ...category, children: {} }))
  categories
    .filter((category) => category.typeCodeElement?.level === 2)
    .sort((prev, next) => Number(prev.typeCodeElement?.code || 0) - Number(next.typeCodeElement?.code || 0))
    .forEach((category) => {
      const key = category.typeCodeElement?.parentPath.substring(1) || 0
      groupedData[key].children[category.typeCodeElement?.id || 0] = { ...category, children: {} }
    })
  categories
    .filter((category) => category.typeCodeElement?.level === 3)
    .sort((prev, next) => Number(prev.typeCodeElement?.code || 0) - Number(next.typeCodeElement?.code || 0))
    .forEach((category) => {
      const keys = category.typeCodeElement?.parentPath.substring(1).split('/')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      groupedData[keys[0]].children[keys[1]].children[category.typeCodeElement?.id || 0] = category
    })
  return groupedData
}
