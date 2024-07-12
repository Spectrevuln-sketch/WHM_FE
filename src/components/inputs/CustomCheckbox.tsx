import { Checkbox, FormControlLabel } from '@mui/material'
import React, { CSSProperties } from 'react'

interface IProps{
  label: string,
  styles?: CSSProperties,
  onClick: ()=> void
}

const CustomCheckbox = ({label, styles, onClick}:IProps) => {
  return (
    // @ts-expect-error
    <FormControlLabel sx={[styles,{}]} control={<Checkbox onClick={onClick} />} label={label} />
  )
}

export default CustomCheckbox