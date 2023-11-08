import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import { CardTitle, DataFetchWrapper, ProfileAvatar } from '@lcacollect/components'
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  AssigneeType,
  GraphQlAssignee,
  useGetAccountQuery,
  useGetProjectGroupsQuery,
  useGetProjectMembersQuery,
} from '../../dataAccess'
import { SimplifiedProjectMember, Task } from '../tasksTable'
import { useParams } from 'react-router-dom'
import { AssigneeTypeMap } from '../../components'

interface TaskDialogMemberRowProps {
  task?: Task
  handleSetAssignee: Dispatch<SetStateAction<IAssignee | null | undefined>>
  assignee?: IAssignee | null
}
export const TaskDialogMemberRow = (props: TaskDialogMemberRowProps) => {
  const { task, handleSetAssignee, assignee } = props

  return (
    <Grid container spacing={4} paddingBottom={3}>
      <AssignedToField handleSetAssignee={handleSetAssignee} assignee={assignee} />
      <OwnerField owner={task?.author} />
    </Grid>
  )
}

export interface IAssignee extends GraphQlAssignee {
  name: string
}
interface AssignedToFieldProps {
  projectId?: string
  handleSetAssignee: Dispatch<SetStateAction<IAssignee | null | undefined>>
  assignee?: IAssignee | null
}
const AssignedToField = (props: AssignedToFieldProps) => {
  const { handleSetAssignee, assignee } = props
  const { projectId } = useParams()

  const {
    data: projectMemberData,
    loading: projectMemberLoading,
    error: projectMemberError,
  } = useGetProjectMembersQuery({
    variables: {
      projectId: projectId as string,
    },
    skip: !projectId,
  })
  const {
    data: projectGroupsData,
    loading: projectGroupsLoading,
    error: projectGroupsError,
  } = useGetProjectGroupsQuery({
    variables: {
      projectId: projectId as string,
    },
    skip: !projectId,
  })

  const memberOptions = useMemo(
    () =>
      projectMemberData?.projectMembers.map(
        (assignee) =>
          ({
            name: assignee.name,
            id: assignee.id,
            type: AssigneeTypeMap[assignee.__typename as 'User'] as AssigneeType,
          } as IAssignee),
      ) || [],
    [projectMemberData],
  )
  const groupsOptions = useMemo(
    () =>
      projectGroupsData?.projectGroups.map(
        (assignee) =>
          ({
            name: assignee.name,
            id: assignee.id,
            type: AssigneeTypeMap[assignee.__typename as 'GraphQLProjectGroup'] as AssigneeType,
          } as IAssignee),
      ) || [],
    [projectGroupsData],
  )
  const assigneeOptions = useMemo(() => [...memberOptions, ...groupsOptions], [memberOptions, groupsOptions])

  return (
    <Grid item xs={12} sm={6}>
      <CardTitle title={'Assigned To'} size={'medium'} />
      <Grid paddingTop={2}>
        <DataFetchWrapper
          error={projectMemberError || projectGroupsError}
          loading={projectMemberLoading || projectGroupsLoading}
        >
          <Autocomplete
            value={assignee || ({ name: '' } as IAssignee)}
            onChange={(event, newValue) => handleSetAssignee(newValue as IAssignee)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => {
              return <TextField {...params} variant='standard' />
            }}
            groupBy={(option) => option.type}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={
              assigneeOptions || [{ name: 'Project contains no members or groups', id: '', type: 'USER' } as IAssignee]
            }
            renderGroup={(params) => (
              <li>
                <ul>
                  <Typography fontWeight='bold'>{titleCase(params.group.toLowerCase())}</Typography>
                </ul>
                <ul>
                  <Typography>{params.children}</Typography>
                </ul>
              </li>
            )}
          />
        </DataFetchWrapper>
      </Grid>
    </Grid>
  )
}

interface OwnerFieldProps {
  owner?: SimplifiedProjectMember
}

const OwnerField = (props: OwnerFieldProps) => {
  const { owner } = props
  const [ownerName, setOwnerName] = useState(owner?.name ?? 'No Name')
  const { data, loading, error } = useGetAccountQuery()

  useEffect(() => {
    if (data) {
      setOwnerName(data.account.name)
    }
  }, [data])

  return (
    <DataFetchWrapper loading={loading} error={error}>
      <Grid item xs={12} sm={6}>
        <CardTitle title={'Owner'} size={'medium'} />
        <Grid display='inline-flex' alignItems='center' paddingTop={2}>
          <ProfileAvatar ownerName={ownerName} />
          <Typography paddingLeft={1}>{ownerName}</Typography>
        </Grid>
      </Grid>
    </DataFetchWrapper>
  )
}

const titleCase = (title: string) =>
  title.replace(/^_*(.)|_+(.)/g, (title, c, d) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()))
