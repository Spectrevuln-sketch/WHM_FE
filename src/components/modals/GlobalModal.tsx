"use client"

import { Box,  Modal,} from '@mui/material'
import React from 'react'


export interface IPayload {
  [type: string] : File[]
}
export interface IProps {
  isOpen : boolean;
  onClose : () => void;
  children: React.ReactNode
}

const GlobalModal = ({isOpen, onClose, children}: IProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '20px',
      }}
    >
      <Box sx={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        outline: 'none'
      }}>
        {children}
      </Box>
    </Modal>
  )
}

export default GlobalModal