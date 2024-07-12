"use client"

import { Box,  Modal,} from '@mui/material'
import React, { Dispatch } from 'react'
import UploadBox from '../inputs/UploadBox';


export interface IPayload {
  [type: string] : File[]
}
export interface IProps {
  isOpen : boolean;
  onClose : () => void;
  onUpload:()=>void;
  file:IPayload,
  setFile: Dispatch<React.SetStateAction<IPayload>>
  remark?: string
}

const ModalUploadDnd = ({file, setFile, isOpen, onClose, remark, onUpload}: IProps) => {
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