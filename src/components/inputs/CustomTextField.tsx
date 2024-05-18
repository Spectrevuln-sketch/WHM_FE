'use client';

import { FormControl, FormHelperText, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";

type colorOptions = 'transparent' | 'white';

interface CustomTextFieldInterface {
  label: string;
  placeholder: string;
  endAdornment?: string;
  isDisabled?: boolean;
  isError?: boolean;
  textHelper?: string;
  color?: colorOptions;
  type?: string;
  name?: string;
  value?: string;
  onChange: (val: string, e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldInterface> = ({
  isDisabled = false,
  isError = false,
  label,
  placeholder,
  endAdornment = '',
  textHelper = '',
  color = 'transparent',
  type = 'text',
  name = '',
  value = '',
  onChange,
}) => {
  return(
    <FormControl variant="outlined" fullWidth>
      {
        label !== ''
        ? <Typography
          id="custom-textfield-label"
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
      {isDisabled ? (

        <OutlinedInput
        disabled={isDisabled}
        type={type}
        error={isError}
        fullWidth
        size="small"
        name={name}
        placeholder={placeholder}
        id="custom-textfield"
        endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>}
        aria-describedby="custom-text-field-helper-text"
        value={value}
        onChange={(e) => onChange(e.target.value, e)}
        inputProps={{
          'aria-label': 'textfield',
        }}
        sx={{
          borderRadius: '6px',
          color: '#A8AAAE',
          backgroundColor: color === 'white' ? '#fff' : undefined,
        }}
        />
        ): (
          <OutlinedInput
          disabled={isDisabled}
          type={type}
          error={isError}
          fullWidth
          size="small"
          name={name}
          placeholder={placeholder}
          id="custom-textfield"
          endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>}
          aria-describedby="custom-text-field-helper-text"
          onChange={(e) => onChange(e.target.value, e)}
          inputProps={{
            'aria-label': 'textfield',
          }}
          sx={{
            borderRadius: '6px',
            color: '#A8AAAE',
            backgroundColor: color === 'white' ? '#fff' : undefined,
          }}
          />
        )}
      <FormHelperText id="custom-text-field-helper-text" sx={{margin: 0}}>{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomTextField;