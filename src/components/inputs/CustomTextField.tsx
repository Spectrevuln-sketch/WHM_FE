'use client';

import { FormControl, FormHelperText, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";

interface CustomTextFieldInterface {
  label: string;
  placeholder: string;
  endAdornment: string;
  value: string;
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (val: string) => void;
}

const CustomTextField: React.FC<CustomTextFieldInterface> = ({isDisabled, label, placeholder, endAdornment, value, textHelper, onChange}) => {
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
        disabled={isDisabled}
        fullWidth
        size="small"
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
      <FormHelperText id="custom-text-field-helper-text" sx={{margin: 0}}>{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomTextField;