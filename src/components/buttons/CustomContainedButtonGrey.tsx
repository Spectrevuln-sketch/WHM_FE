'use client';

import { Button } from "@mui/material";
import React from "react";
import { CustomContainedButtonInterface } from "./CustomContainedButton";

const CustomContainedButtonGrey: React.FC<CustomContainedButtonInterface> = ({label, isDisabled, onClick}) => {
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
        background: 'linear-gradient(to right, #A8AAAE29, #A8AAAE29) !important',
        boxShadow: 'none'
      }}
    >
      {label}
    </Button>
  )
}

export default CustomContainedButtonGrey;