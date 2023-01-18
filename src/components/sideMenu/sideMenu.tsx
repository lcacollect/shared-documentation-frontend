import { MenuGroupProps, MenuItem, SideMenu, theme } from '@lcacollect/components'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Person from '@mui/icons-material/Person'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import Settings from '@mui/icons-material/Settings'
import StartOutlinedIcon from '@mui/icons-material/StartOutlined'
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'
import { useParams } from 'react-router-dom'

export const DocumentationSideMenu = () => {
  const { projectId } = useParams()

  const projectMenuItems: MenuItem[] = [
    {
      icon: <HomeOutlinedIcon sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}`,
      title: 'Project',
    },
    {
      icon: <Person sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}/members`,
      title: 'Members',
    },
    {
      icon: <Settings sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}/settings`,
      title: 'Settings',
    },
    {
      icon: <StartOutlinedIcon sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}/sources`,
      title: 'Sources',
    },
    {
      icon: <ReceiptLongOutlinedIcon sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}/components`,
      title: 'Building Components',
    },
    {
      icon: <PlaylistAddCheckOutlinedIcon sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}/tasks`,
      title: 'Tasks',
    },
    {
      icon: <SwapHorizOutlinedIcon sx={{ color: theme.palette.common.black }} />,
      link: `/projects/${projectId}/export`,
      title: 'Export',
    },
  ]

  const projectMenuGroups: MenuGroupProps[] = [{ items: projectMenuItems }]

  return <SideMenu menuGroups={projectMenuGroups} />
}
