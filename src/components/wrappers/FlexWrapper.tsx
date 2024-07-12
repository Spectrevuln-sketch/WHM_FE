import { Grid } from '@mui/material';
import * as React from 'react';

interface FlexWrapperInterface {
  children: React.ReactNode,
  direction: string,
  justifyContent: string,
  alignItems: string,
  padding?: string,
}

const FlexWrapper: React.FC<FlexWrapperInterface> = ({children, direction, justifyContent, alignItems, padding}) => {
  return (
    <Grid
      container
      sx={{
        // flexGrow: 1,
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        padding: padding ?? "0",
        height: '100%',
        marginTop: '10px',
        borderRadius: '20px',
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