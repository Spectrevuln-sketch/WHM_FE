import { Card } from '@mui/material';
import * as React from 'react';


const CardContainer = (
  {
    children,
    maxWidth,
  }: {
    children: React.ReactNode,
    maxWidth?: string,
  }
) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: '1px solid #DBDADE',
        borderRadius: '6px',
        padding: '24px',
        flexGrow: 1,
        maxWidth: maxWidth
      }}
    >
      {children}
    </Card>
  );
}

export default CardContainer