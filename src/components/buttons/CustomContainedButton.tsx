'use client';

import { Button } from "@mui/material";
import React, { CSSProperties } from "react";

export interface CustomContainedButtonInterface {
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  onClick?: (param?: any) => void;
  css?: CSSProperties | CSSProperties[]
  type?: string;
}

const CustomContainedButton: React.FC<CustomContainedButtonInterface> = ({label, isDisabled = false, icon, onClick, css, ...rest}) => {
  return(
    <Button
      fullWidth
      variant="contained"
      disabled={isDisabled}
      onClick={() => onClick?.()}
      {...rest}
      sx={[css, {
        fontSize: '16px',
        color: '#FFFFFF',
        textTransform: 'none',
        background: '#365486',
        boxShadow: 'none'
      }]}
    >
      {icon} {label}
    </Button>
  )
}

export default CustomContainedButton;