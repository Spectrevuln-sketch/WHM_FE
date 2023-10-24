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

import { dashboardHeaderImages } from '@/assets/images/dashboard/header';
import './Navbar.css';
import BadgeAvatar from './buttons/BadgeAvatar';
import DarkModeButton from './buttons/DarkModeButton';
import LanguageButton from './buttons/LanguageButton';
import NotificationButton from './buttons/NotificationButton';

const drawerWidth = 260;

const sidebarItem = [
  {
    label: 'Dashboard',
    icon: <Image src={dashboardIcons.dashboardIcon} alt='dashboard-icon' width={24} height={24} />,
    route: '/dashboard'
  },
  {
    label: 'Create MSR',
    icon: <Image src={dashboardIcons.createMsrIcon} alt='create-msr-icon' width={24} height={24} />,
    route: '/material-service-request'
  },
  {
    label: 'Delivering Product',
    icon: <Image src={dashboardIcons.deliveringProductIcon} alt='delivering-product-icon' width={24} height={24} />,
    route: '/delivering-product'
  },
  {
    label: 'Product Delivered',
    icon: <Image src={dashboardIcons.productDeliveredIcon} alt='product-delivered-icon' width={24} height={24} />,
    route: '/product-delivered'
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  boxShadow: '1px 4px 4px 0px #00000040',
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Toolbar>
          {/* hamburger button */}
          <IconButton
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
                <Image src={mainImage.logoSmallYellow} width={44} height={44} alt='company-logo'/>
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
                <LanguageButton language='en' onClick={() => console.log('language clicked')} />
                <DarkModeButton onClick={() => console.log('dark mode clicked')}/>
                <NotificationButton unread={4} onClick={() => console.log('notifications clicked')} />
                <BadgeAvatar isOnline={true} image={dashboardHeaderImages.avatar.src} onClick={() => console.log('avatar clicked')} />
              </Grid>
            </Box>
          </Grid>
        </Toolbar>
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
            <Image src={mainImage.logoSmallYellow} width={44} height={44} alt='company-logo' />
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            </>
            : <DrawerHeader />
          }
        </Grid>
        <List sx={{paddingLeft: open ? '20px' : '0px'}}>
          {sidebarItem.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ display: 'block' }}
            className='sidebar-list-item'
            >
              <ListItemButton
                selected={pathname.includes(item.route)}
                onClick={() => router.push(item.route)}
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
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '20px'}}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}