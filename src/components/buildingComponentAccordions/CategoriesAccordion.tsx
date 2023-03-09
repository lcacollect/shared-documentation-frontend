import React, { Dispatch, SetStateAction, useState } from 'react'
import { NestedCategory, SchemaElement, SchemaElementsTable, Task } from '../../components'
import { GraphQlSchemaCategory } from '../../dataAccess'
import { BCAccordion, BCAccordionDetails, BCAccordionSummary } from './BCAccordion'

interface CategoriesAccordionProps {
  projElements: SchemaElement[]
  projTasks: Task[]
  category: NestedCategory
  level: number
  categoriesId: string[]
  isAddingTasks: boolean
  refToAddTaskTo: GraphQlSchemaCategory | SchemaElement | undefined
  setRefToAddTaskTo: React.Dispatch<React.SetStateAction<GraphQlSchemaCategory | SchemaElement | undefined>>
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>
  setIsAddTaskDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const CategoriesAccordion = (props: CategoriesAccordionProps) => {
  const {
    projElements,
    projTasks,
    category,
    level,
    categoriesId,
    isAddingTasks,
    refToAddTaskTo,
    setRefToAddTaskTo,
    setSelectedTask,
    setIsAddTaskDialogOpen,
  } = props
  const [expanded, setExpanded] = useState<boolean>(false)

  const categoryTasks = projTasks.filter(
    (task) => task.item.__typename === 'GraphQLSchemaCategory' && task.item.id === category.id,
  )

  const elementTasks =
    category.depth == 1 ? projTasks.filter((task) => task.item.__typename === 'GraphQLSchemaElement') : []
  const categoryElements =
    category.depth == 1
      ? projElements.filter((element) => Object.keys(category.children).includes(element.schemaCategory.id))
      : []

  const textSize = level === 0 ? 'medium' : 'small'
  return (
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
                projElements={projElements}
                projTasks={projTasks}
                level={level + 1}
                categoriesId={categoriesId}
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
            categoriesId={categoriesId}
            category={category}
            tasks={elementTasks}
            elements={categoryElements}
            isAddingTasks={isAddingTasks}
            refToAddTaskTo={refToAddTaskTo}
            setRefToAddTaskTo={setRefToAddTaskTo}
            setSelectedTask={setSelectedTask}
            setIsAddTaskDialogOpen={setIsAddTaskDialogOpen}
          />
        ) : null}
      </BCAccordionDetails>
    </BCAccordion>
  )
}
