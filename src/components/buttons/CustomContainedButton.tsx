'use client';

import { Button } from "@mui/material";
import React from "react";

export interface CustomContainedButtonInterface {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const CustomContainedButton: React.FC<CustomContainedButtonInterface> = ({label, isDisabled = false, onClick}) => {
  return(
    <Button
      fullWidth
      variant="contained"
      disabled={isDisabled}
      onClick={() => onClick()}
      sx={{
        fontSize: '16px',
        color: '#FFFFFF',
        textTransform: 'none',
        background: 'linear-gradient(to right, #F7C113, #EDCD67) !important',
        boxShadow: 'none'
      }}
    >
      {label}
    </Button>
  )
}

export default CustomContainedButton;