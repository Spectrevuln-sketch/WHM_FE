'use client';

import { Search } from "@mui/icons-material";
import { FormControl, FormHelperText, Input, InputAdornment } from "@mui/material";
import React from "react";


interface CustomSearchFieldInterface {
  value: string;
  placeholder: string;
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (val: string) => void;
}

const CustomSearchField: React.FC<CustomSearchFieldInterface> = ({value, placeholder, textHelper, onChange}) => {
  return(
    <FormControl fullWidth>
      <Input
        placeholder={placeholder}
        fullWidth
        disableUnderline
        size="small"
        value={value}
        id="custom-textfield"
        startAdornment={<InputAdornment position="start"><Search/></InputAdornment>}
        aria-describedby="custom-text-field-helper-text"
        onChange={(e) => onChange(e.target.value)}
        inputProps={{
          'aria-label': 'textfield',
        }}
        sx={{
          borderRadius: '6px',
          color: '#A8AAAE',
          backgroundColor: '#F8F7F7',
          height: '50px',
          paddingX: '16px'
        }}
      />
      <FormHelperText id="custom-text-field-helper-text">{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomSearchField;