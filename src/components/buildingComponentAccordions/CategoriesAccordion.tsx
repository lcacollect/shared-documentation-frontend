import { DataFetchWrapper } from '@lcacollect/components'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { NestedCategory, SchemaElement, SchemaElementsTable, Task } from '../../components'
import { GraphQlSchemaCategory, useGetTasksQuery } from '../../dataAccess'
import { BCAccordion, BCAccordionDetails, BCAccordionSummary } from './BCAccordion'

interface CategoriesAccordionProps {
  category: NestedCategory
  level: number
  schemaId: string | null | undefined
  isAddingTasks: boolean
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: React.Dispatch<React.SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const CategoriesAccordion = (props: CategoriesAccordionProps) => {
  const {
    category,
    level,
    schemaId,
    isAddingTasks,
    refToAddTaskTo,
    setRefToAddTaskTo,
    setSelectedTask,
    setIsAddTaskDialogOpen,
  } = props
  const [expanded, setExpanded] = useState<boolean>(false)

  const { data, loading, error } = useGetTasksQuery({
    variables: {
      reportingSchemaId: schemaId ?? '',
    },
    skip: !schemaId,
  })
  const tasks = useMemo(() => data?.tasks as unknown as Task[], [data])
  const categoryTasks = tasks?.filter(
    (task) => task.item.__typename === 'GraphQLSchemaCategory' && task.item.id === category.id,
  )
  const elementTasks = tasks?.filter((task) => task.item.__typename === 'GraphQLSchemaElement')

  const textSize = level === 0 ? 'medium' : 'small'
  return (
    <DataFetchWrapper loading={loading} error={error}>
      <BCAccordion expanded={expanded} level={level} onChange={() => setExpanded(!expanded)}>
        <BCAccordionSummary
          category={category}
          variant={textSize}
          tasks={categoryTasks}
          isAddingTasks={isAddingTasks}
          refToAddTaskTo={refToAddTaskTo}
          setRefToAddTaskTo={setRefToAddTaskTo}
          setSelectedTask={setSelectedTask}
          setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
        />
        <BCAccordionDetails level={level}>
          {category.depth === 0
            ? Object.values(category.children)?.map((child: NestedCategory, index: number) => (
                <CategoriesAccordion
                  key={index}
                  category={child}
                  level={level + 1}
                  schemaId={schemaId}
                  isAddingTasks={isAddingTasks}
                  refToAddTaskTo={refToAddTaskTo}
                  setRefToAddTaskTo={setRefToAddTaskTo}
                  setSelectedTask={setSelectedTask}
                  setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
                />
              ))
            : null}
          {category.depth === 1 ? (
            <SchemaElementsTable
              schemaId={schemaId}
              category={category}
              tasks={elementTasks}
              isAddingTasks={isAddingTasks}
              refToAddTaskTo={refToAddTaskTo}
              setRefToAddTaskTo={setRefToAddTaskTo}
              setSelectedTask={setSelectedTask}
              setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
            />
          ) : null}
        </BCAccordionDetails>
      </BCAccordion>
    </DataFetchWrapper>
  )
}
