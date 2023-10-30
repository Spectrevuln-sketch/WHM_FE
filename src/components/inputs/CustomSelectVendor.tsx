'use client';

import { Box, FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material";

import React from 'react';

import { PurchaseRequestItemInterface } from "@/app/(dashboard)/material-service-request/create-pr/[msrNoSlug]/page";
import SelectVendorModal from "../modals/SelectVendorModal";
import customStyle from './CustomSelectVendor.module.css';

// Define the prop types for the component
export interface SelectOptionVendor {
  value: string,
  label: string,
}
interface CustomSelectVendorInterface {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOptionVendor[];
  isError: boolean;
  textHelper: string;
  product: PurchaseRequestItemInterface;
  onChange: (val: string) => void;
}

const CustomSelectVendor: React.FC<CustomSelectVendorInterface> = ({label, placeholder, value, options, textHelper, product, onChange}) => {

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return(
    <FormControl fullWidth>

      {/* select modal */}
      <SelectVendorModal isOpen={modalOpen} onClose={handleModalClose} product={product} onChange={(val) => onChange(val)} />

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
      <Box className={customStyle.customSelectVendor} onClick={handleModalOpen}>
        <Select
          fullWidth
          disabled
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
            cursor: 'pointer !important',
            pointerEvents: 'none'
          }}
          >
          <MenuItem value="" disabled sx={{ visibility: 'hidden', height: '0px !important' }}>
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
            <MenuItem key={`custom-option-select-${index}`} value={option.value}>{option?.label}</MenuItem>
          ))}
        </Select>
      </Box>
      <FormHelperText id="custom-select-helper-text">{textHelper}</FormHelperText>
    </FormControl>
  )
}

export default CustomSelectVendor;