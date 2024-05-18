'use client';

import { Button } from "@mui/material";
import React from "react";

interface RoundedContainedButtonInterface {
  fullWidth?: boolean;
  label: string;
  isDisabled: boolean;
  onClick: () => void;
}

const RoundedContainedButton: React.FC<RoundedContainedButtonInterface> = ({fullWidth = true, label, isDisabled, onClick}) => {
  return(
    <Button
      fullWidth={fullWidth}
      variant="contained"
      disabled={isDisabled}
      onClick={() => onClick()}
      sx={{
        fontSize: '16px',
        color: '#FFFFFF',
        textTransform: 'none',
        backgroundColor: '#365486 !important',
        boxShadow: 'none',
        borderRadius: '200px'
      }}
    >
      {label}
    </Button>
  )
}

export default RoundedContainedButton;