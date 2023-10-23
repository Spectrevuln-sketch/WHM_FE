import { DarkModeOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as React from 'react';

interface DarkModeButtonInterface {
  onClick: () => void;
}

const DarkModeButton: React.FC<DarkModeButtonInterface> = ({onClick}) => {
  return (
    <IconButton onClick={onClick} size='small'>
      <DarkModeOutlined color="action" fontSize={'large'} />
    </IconButton>
  );
}

export default DarkModeButton