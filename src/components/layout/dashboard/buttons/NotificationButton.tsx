import { NotificationsOutlined } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import Badge from '@mui/material/Badge';
import * as React from 'react';

interface NotificationButtonInterface {
  unread: number;
  onClick: () => void;
}

const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#EA5455',
    position: 'absolute',
    top: 13,
    right: 10,
    color: '#fff',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const NotificationButton: React.FC<NotificationButtonInterface> = ({unread, onClick}) => {
  return (
      <StyledBadge badgeContent={unread} color={'error'}>
        <IconButton onClick={onClick} size='small'>
          <NotificationsOutlined color="action" fontSize={'large'} />
        </IconButton>
      </StyledBadge>
  );
}

export default NotificationButton