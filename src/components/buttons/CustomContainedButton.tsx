'use client';

import { Button } from "@mui/material";
import React from "react";

export interface CustomContainedButtonInterface {
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const CustomContainedButton: React.FC<CustomContainedButtonInterface> = ({label, isDisabled = false, icon, onClick}) => {
  return(
    <Button
      fullWidth
      variant="contained"
      disabled={isDisabled}
      onClick={() => onClick?.()}
      sx={{
        fontSize: '16px',
        color: '#FFFFFF',
        textTransform: 'none',
        background: '#365486',
        boxShadow: 'none'
      }}
    >
      {icon} {label}
    </Button>
  )
}

export default CustomContainedButton;