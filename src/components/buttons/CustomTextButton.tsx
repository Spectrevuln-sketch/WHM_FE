'use client';

import { Button } from "@mui/material";

interface CustomTextButtonInterface {
  label: string;
  isDisabled: boolean;
  onClick: () => any;
}

const CustomTextButton: React.FC<CustomTextButtonInterface> = ({label, isDisabled, onClick}) => {
  return(
    <Button
      variant="text"
      disabled={isDisabled}
      onClick={() => onClick()}
      sx={{
        fontSize: '16px',
        color: '#898790',
        textTransform: 'none'
      }}
    >
      {label}
    </Button>
  )
}

export default CustomTextButton;