'use client';

import { FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material";

import React from 'react';

// Define the prop types for the component
interface option {
  value: string,
  label: string
}
interface CustomSelectInterface {
  label: string;
  value: string;
  options: option[];
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (val: string) => void;
}

const CustomSelect: React.FC<CustomSelectInterface> = ({label, value, options, isDisabled, textHelper, onChange}) => {
  return(
    <FormControl fullWidth>
      {
        label !== ''
        ? <Typography
          id="custom-select-label"
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
      <Select
        disabled={isDisabled}
        variant="outlined"
        id="custom-select"
        labelId="custom-select-label"
        value={value}
        onChange={(val) => onChange(val.target.value)}
        size="small"
        aria-describedby="custom-select-helper-text"
        sx={{
          borderRadius: '6px',
          color: '#A8AAAE'
        }}
        >
        {options?.map((option, index) => (
          <MenuItem key={`custom-option-select-${index}`} value={option.value}>{option?.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText id="custom-select-helper-text">{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomSelect;