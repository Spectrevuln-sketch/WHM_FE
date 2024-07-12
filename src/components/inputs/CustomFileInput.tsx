'use client';

import { Upload } from "@mui/icons-material";
import { FormControl, FormHelperText, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";

interface CustomFileInputInterface {
  label: string;
  placeholder: string;
  value?: string;
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFileInput: React.FC<CustomFileInputInterface> = ({label, placeholder, value, textHelper, onChange}) => {

  const fileInputRef= React.useRef<HTMLInputElement>(null);

  return(
    <FormControl
      variant="outlined"
      fullWidth
      onClick={() => fileInputRef.current!.click()}
    >
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
        disabled
        fullWidth
        size="small"
        value={value}
        placeholder={placeholder}
        id="custom-textfield"
        endAdornment={<InputAdornment position="end" sx={{cursor: 'pointer !important'}}><Upload/></InputAdornment>}
        aria-describedby="custom-text-field-helper-text"
        // onChange={(e) => onChange(e)}
        inputProps={{
          'aria-label': 'textfield',
        }}
        sx={{
          borderRadius: '6px',
          color: '#A8AAAE',
          cursor: 'pointer !important'
        }}
      />
      <FormHelperText id="custom-text-field-helper-text">{textHelper}</FormHelperText>
      <input
        ref={fileInputRef}
        onChange={(e) => onChange(e)}
        accept=".pdf,.jpg,.jpeg,.png"
        type="file"
        hidden
      />
    </FormControl>
  )
}

export default CustomFileInput;