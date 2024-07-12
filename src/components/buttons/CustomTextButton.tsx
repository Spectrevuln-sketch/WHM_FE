'use client';

import { Button } from "@mui/material";
import React from "react";

interface CustomTextButtonInterface {
  label?: string;
  icon?: React.ReactNode;
  color: string;
  bgcolor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  isDisabled: boolean;
  variant?: 'text'| 'contained' | 'outlined';
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const CustomTextButton: React.FC<CustomTextButtonInterface> = ({label, icon, type, color, bgcolor, isDisabled, variant='text', onClick}) => (
  <Button
    variant={variant}
    disabled={isDisabled}
    onClick={() => onClick?.()}
    color={bgcolor}
    type={type ?? 'button'}
    sx={{
      fontSize: '12px',
      color: { color },
      textTransform: 'none',
      gap: '8px',
      overflow: 'auto'
    }}
  >
    {label}{icon}
  </Button>
)

export default CustomTextButton;