'use client';

import { FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material";

import React from 'react';

import customOptionStyle from './CustomSelect.module.css';

// Define the prop types for the component
export interface SelectOption {
  value: string,
  label: string
}
interface CustomSelectInterface {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (val: string) => void;
}

const CustomSelect: React.FC<CustomSelectInterface> = ({label, placeholder, value, options, isDisabled, textHelper, onChange}) => {
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
        displayEmpty
        sx={{
          borderRadius: '6px',
          color: '#A8AAAE'
        }}
        >
        <MenuItem className={customOptionStyle.customSelectPlaceholder} value="" disabled sx={{ visibility: 'hidden', height: '0px !important' }}>
          <Typography
            sx={{
              fontWeight: 500,
              color: 'rgba(75, 70, 92, 0.3)',
          }}
          >
              {placeholder}
          </Typography>
        </MenuItem>
        {options?.map((option, index) => (
          <MenuItem className={customOptionStyle.customSelectOption} key={`custom-option-select-${index}`} value={option.value}>{option?.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText id="custom-select-helper-text">{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomSelect;