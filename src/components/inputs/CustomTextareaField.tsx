'use client';

import { FormControl, FormHelperText, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";

interface CustomTextareaFieldInterface {
  label: string;
  placeholder: string;
  endAdornment: string;
  rows: number;
  value: string;
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (val: string) => void;
}

const CustomTextareaField: React.FC<CustomTextareaFieldInterface> = ({label, placeholder, endAdornment, rows, value, textHelper, onChange}) => {
  return(
    <FormControl variant="outlined" fullWidth>
      {
        label !== ''
        ? <Typography
          id="custom-textfield-label"
          sx={{
            marginBottom: '4px',
            fontSize: '13px',
            color: '#4B465C'
          }}
        >
          {label}
        </Typography>
        : null
      }
      <OutlinedInput
        fullWidth
        size="small"
        multiline
        rows={rows}
        value={value}
        placeholder={placeholder}
        id="custom-textfield"
        endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>}
        aria-describedby="custom-text-field-helper-text"
        onChange={(e) => onChange(e.target.value)}
        inputProps={{
          'aria-label': 'textfield',
        }}
        sx={{
          borderRadius: '6px',
          color: '#A8AAAE'
        }}
      />
      <FormHelperText id="custom-text-field-helper-text">{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomTextareaField;