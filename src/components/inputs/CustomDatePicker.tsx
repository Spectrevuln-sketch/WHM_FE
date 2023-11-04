'use client';

import { AccessTime } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from "dayjs";
import React from "react";

interface CustomDatePickerInterface {
  label: string;
  placeholder: string;
  value: string;
  isDisabled: boolean;
  isError: boolean;
  textHelper: string;
  onChange: (val: Dayjs | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerInterface> = ({isDisabled, isError, label, placeholder, value, textHelper, onChange}) => {

  const [open, setOpen] = React.useState(false);

  const onChangeHandler = (val: Dayjs | null) => {
    onChange(val)
  }
  return(
    <FormControl fullWidth >
      {
        label !== ''
        ? <Typography
          id="custom-datepicker-label"
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          open={open}
          onClose={() => setOpen(false)}
          onChange={(val: Dayjs | null) => onChangeHandler(val)}
          slots={{
            openPickerIcon: AccessTime
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              disabled: isDisabled,
              error: isError,
              size: 'small',
              placeholder: placeholder,
              value: value,
              helperText: textHelper,
              InputProps: {
                endAdornment: <InputAdornment position="end" sx={{position: 'absolute', right: 10}}>{
                  <IconButton
                    onClick={() => setOpen(true)}
                  >
                    <AccessTime/>
                  </IconButton>
                }</InputAdornment>
              },
              sx: {
                borderRadius: '6px',
                color: '#A8AAAE'
              },
              inputProps:{
                'aria-label': 'textfield',
              },
            },
          }}
        />
      </LocalizationProvider>
      <FormHelperText id="custom-text-field-helper-text">{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomDatePicker;