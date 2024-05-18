'use client'
import { ISidebarItem } from '@/config/route';
import styled from '@emotion/styled';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemText, createStyles, makeStyles } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

interface IProps {
  open :boolean;
  items?:ISidebarItem['children']
}
const drawerWidth = 200



const StyledListItem = styled(ListItemButton)({
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'left',
  color: 'white',
});
export default function SidebarSub({items=undefined, open=true}: IProps) {
  const router = useRouter()
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {items?.map(val =>(
          <StyledListItem key={val.id} onClick={()=>router.push(val.route)}>
            <ListItemText inset primary={val.label} />
          </StyledListItem>
          ))}
        </List>
      </Collapse>
  )
}

