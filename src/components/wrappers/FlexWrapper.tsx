import { Grid } from '@mui/material';
import * as React from 'react';

interface FlexWrapperInterface {
  children: React.ReactNode,
  direction: string,
  justifyContent: string,
  alignItems: string,
}

const FlexWrapper: React.FC<FlexWrapperInterface> = ({children, direction, justifyContent, alignItems}) => {
  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: '100%',
        flexDirection: direction,
        alignItems: alignItems,
        justifyContent: justifyContent
      }}
    >
      {children}
    </Grid>
  );
}

export default FlexWrapper