import { Card } from '@mui/material';
import * as React from 'react';


const CardContainer = (
  {
    children,
  }: {
    children: React.ReactNode
  }
) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: '1px solid #DBDADE',
        borderRadius: '6px',
        padding: '24px',
      }}
    >
      {children}
    </Card>
  );
}

export default CardContainer