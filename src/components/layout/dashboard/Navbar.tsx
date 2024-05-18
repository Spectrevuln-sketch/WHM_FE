'use client';

import { dashboardIcons } from '@/assets/icon/dashboard';
import { mainImage } from '@/assets/images';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { dashboardHeaderImages } from '@/assets/images/dashboard/header';
import CustomContainedButtonRed from '@/components/buttons/CustomContainedButtonRed';
import { Logout } from '@mui/icons-material';
import './Navbar.css';
import BadgeAvatar from './buttons/BadgeAvatar';
import NotificationButton from './buttons/NotificationButton';
import {SidebarSub} from './components';
import { menu } from '@/config/route';

const drawerWidth = 260;
const {sidebarItem} = menu(dashboardIcons)
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  boxShadow: '1px 4px 4px 0px #00000040',
  backgroundColor: '#365486',
  zIndex: 500,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  boxShadow: '1px 4px 4px 0px #00000040',
  zIndex: 500,
  backgroundColor: '#365486',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    boxShadow: 'none !important',
  }),
);

const ToolbarNav = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
})
export default function DashboardNavbar({
  children,
}: {
  children: React.ReactNode
}) {

  // router & pathname
  const router = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', paddingY: '2em'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          paddingY: '20px',
          backgroundColor: '#FFF',
          zIndex: 300,
          boxShadow: 'none'
        }}
      >
        {/* header */}
        <ToolbarNav>
          {/* hamburger button */}
          <IconButton
            className='hamburger-button'
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{color: 'rgba(0, 0, 0, 0.50)'}} />
          </IconButton>
          <Grid
            container
            direction={'row'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* header left */}
            <Box>
              <Typography variant="h6" noWrap component="div">
                <Image src={mainImage.logoSmall} width={44} height={44} alt='company-logo'/>
              </Typography>
            </Box>
            {/* header right */}
            <Box>
              <Grid
                container
                direction={'row'}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {/* <LanguageButton language='en' onClick={() => console.log('language clicked')} />
                <DarkModeButton onClick={() => console.log('dark mode clicked')}/> */}
                <NotificationButton unread={4} onClick={() => console.log('notifications clicked')} />
                <BadgeAvatar isOnline={true} image={dashboardHeaderImages.avatar.src} onClick={() => console.log('avatar clicked')} />
              </Grid>
            </Box>
          </Grid>
        </ToolbarNav>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Grid
          container
          direction={'row'}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          {
            open
            ? <>
            <Box>
              <Image src={mainImage.logoSmall} width={44} height={44} alt='company-logo' style={{borderRadius: '8px'}}/>
            </Box>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            </>
            : <DrawerHeader sx={{padding: '0'}}>
              <IconButton
                className='hamburger-button'
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                }}
              >
                <MenuIcon sx={{color: 'rgba(0, 0, 0, 0.50)'}} />
              </IconButton>
            </DrawerHeader>
          }
        </Grid>
        <List sx={{paddingLeft: open ? '20px' : '0px', paddingRight: open ? '20px' : '0px'}}>
          {sidebarItem.map((item) => (
            <>
            <ListItem key={item.label} disablePadding sx={{ display: 'block' }}
            className='sidebar-list-item'
            >
              <ListItemButton
                selected={item.hasOwnProperty('route') && item.route ? pathname.includes(item.route) : false}
                onClick={() => item.hasOwnProperty('route') && item.route ? router.push(item.route) : setDrawerOpen(!drawerOpen)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                {item.hasOwnProperty('children') &&(
                  <>
                  { drawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                  </>
                )}
              </ListItemButton>
            </ListItem>
            {item.hasOwnProperty('children')? <SidebarSub open={drawerOpen} items={item?.children || undefined}/> : <></>}
            </>
          ))}
        </List>
        <Grid
          container
          direction={'column'}
          height={'100%'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          padding={'20px'}
        >
          <CustomContainedButtonRed
            label='logout'
            icon={<Logout />}
            onClick={() => {}}
          />
        </Grid>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '20px'}}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}