"use client"

import { Box,  Modal, Typography } from '@mui/material'
import React, { Dispatch } from 'react'
import UploadBox from '../inputs/UploadBox';
import { IPayload } from '@/app/(dashboard)/(withNavbar)/(master)/master-vendor/@usecase';

export interface IProps {
  isOpen : boolean;
  onClose : () => void;
  onUpload:()=>void;
  file: File[],
  setFile: Dispatch<React.SetStateAction<IPayload>>
  remark?: string
}

const ModalUploadDnd: React.FC<IProps> = ({file, setFile, isOpen, onClose, remark, onUpload}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
      }}
    >
      <Box sx={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        outline: 'none'
      }}>
        <UploadBox files={file} setFile={setFile} remark={remark ?? undefined} onClick={onUpload}/>
      </Box>
    </Modal>
  )
}

export default ModalUploadDnd