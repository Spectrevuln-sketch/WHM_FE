'use client';

import { Button } from "@mui/material";
import React from "react";
import { CustomContainedButtonInterface } from "./CustomContainedButton";

const CustomContainedButtonBlue: React.FC<CustomContainedButtonInterface> = ({label, isDisabled, onClick}) => {
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
        background: 'linear-gradient(to right, #263453, #3B4969) !important',
        boxShadow: 'none'
      }}
    >
      {label}
    </Button>
  )
}

export default CustomContainedButtonBlue;