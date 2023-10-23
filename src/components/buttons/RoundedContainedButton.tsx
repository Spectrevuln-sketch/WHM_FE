'use client';

import { Button } from "@mui/material";
import React from "react";

interface RoundedContainedButtonInterface {
  label: string;
  isDisabled: boolean;
  onClick: () => void;
}

const RoundedContainedButton: React.FC<RoundedContainedButtonInterface> = ({label, isDisabled, onClick}) => {
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
        backgroundColor: '#F7C113 !important',
        boxShadow: 'none',
        borderRadius: '200px'
      }}
    >
      {label}
    </Button>
  )
}

export default RoundedContainedButton;