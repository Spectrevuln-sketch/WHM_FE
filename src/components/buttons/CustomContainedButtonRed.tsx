'use client';

import { Button } from "@mui/material";
import React from "react";
import { CustomContainedButtonInterface } from "./CustomContainedButton";

const CustomContainedButtonRed: React.FC<CustomContainedButtonInterface> = ({label, isDisabled = false, icon, onClick}) => {
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
        background: '#EA5455',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#f18d8e',
       }
      }}
    >
      {icon} {label}
    </Button>
  )
}

export default CustomContainedButtonRed;