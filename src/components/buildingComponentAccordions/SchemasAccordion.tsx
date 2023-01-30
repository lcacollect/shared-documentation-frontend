import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { GraphQlReportingSchema, GraphQlSchemaCategory } from '../../dataAccess'
import { BCAccordion, BCAccordionDetails } from './BCAccordion'
import { CategoriesAccordion } from './CategoriesAccordion'
import { SchemaElement } from '../schemaElementsTable'
import { Task } from '../tasksTable'

interface SchemasAccordionProps {
  schema: GraphQlReportingSchema
  isAddingTasks: boolean
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: Dispatch<SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const SchemasAccordion = (props: SchemasAccordionProps) => {
  const { schema, isAddingTasks, refToAddTaskTo, setRefToAddTaskTo, setSelectedTask, setIsAddTaskDialogOpen } = props

  if (!schema.categories || !schema.categories.find((cat) => cat.path)) {
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
          <CategoriesAccordion
            level={0}
            key={index}
            category={category}
            schemaId={schema.id}
            isAddingTasks={isAddingTasks}
            refToAddTaskTo={refToAddTaskTo}
            setRefToAddTaskTo={setRefToAddTaskTo}
            setSelectedTask={setSelectedTask}
            setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
          />
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
    .filter((category) => category.depth === 0)
    .sort((prev, next) => (prev.name < next.name ? -1 : 1))
    .forEach((category) => (groupedData[category.id] = { ...category, children: {} }))
  categories
    .filter((category) => category.depth === 1)
    .sort((prev, next) => (prev.name < next.name ? -1 : 1))
    .forEach((category) => {
      const key = category.path.substring(1)
      groupedData[key].children[category.id] = { ...category, children: {} }
    })
  categories
    .filter((category) => category.depth === 2)
    .sort((prev, next) => (prev.name < next.name ? -1 : 1))
    .forEach((category) => {
      const keys = category.path.substring(1).split('/')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      groupedData[keys[0]].children[keys[1]].children[category.id] = category
    })
  return groupedData
}
