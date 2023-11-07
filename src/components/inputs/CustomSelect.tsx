'use client';

import { FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material";

import React from 'react';

import customOptionStyle from './CustomSelect.module.css';

// Define the prop types for the component
export interface SelectOption {
  value: string,
  label: string
}

type colorOptions = 'transparent' | 'white';
interface CustomSelectInterface {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  isDisabled?: boolean;
  isError?: boolean;
  textHelper?: string;
  color?: colorOptions;
  onChange: (val: string) => void;
}

const CustomSelect: React.FC<CustomSelectInterface> = ({
  label,
  placeholder,
  value,
  options,
  isDisabled = false,
  isError = false,
  textHelper = '',
  color= 'transparent',
  onChange
}) => {
  return(
    <FormControl fullWidth>
      {
        label !== ''
        ? <Typography
          id="custom-select-label"
          sx={{
            marginBottom: '4px',
            fontSize: '13px',
            color: color === 'white' ? '#fff' : '#4B465C'
          }}
        >
          {label}
        </Typography>
        : null
      }
      <Select
        disabled={isDisabled}
        error={isError}
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
          color: '#A8AAAE',
          backgroundColor: color === 'white' ? '#fff' : undefined
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