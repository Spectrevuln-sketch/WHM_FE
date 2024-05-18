import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

interface IProps {
  title: string;
  status: 'success' | 'info' | 'warning' | 'error';
  text: string;
}
const CustomAlert = ({
  title,
  status,
  text
}: IProps) => {
  return (
    <Alert severity={status}>
    <AlertTitle>{title}</AlertTitle>
    {text}
  </Alert>
  )
}

export default CustomAlert