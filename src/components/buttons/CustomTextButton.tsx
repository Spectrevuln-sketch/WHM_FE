'use client';

import { Button } from "@mui/material";
import React from "react";

interface CustomTextButtonInterface {
  label: string;
  icon: React.ReactNode;
  color: string;
  isDisabled: boolean;
  onClick: () => void;
}

const CustomTextButton: React.FC<CustomTextButtonInterface> = ({label, icon, color, isDisabled, onClick}) => {
  return(
    <Button
      variant="text"
      disabled={isDisabled}
      onClick={() => onClick()}
      sx={{
        fontSize: '16px',
        color: {color},
        textTransform: 'none',
        gap: '8px'
      }}
    >
      {label}{icon}
    </Button>
  )
}

export default CustomTextButton;