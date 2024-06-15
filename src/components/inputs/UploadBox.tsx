"use client"

import { DeleteForever } from '@mui/icons-material'
import { Box,IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useCallback } from 'react'
import CustomContainedButton from '../buttons/CustomContainedButton'
import { useDropzone } from 'react-dropzone';

interface IProps {
  files : File[]
  remark?: string
  setFile: React.SetStateAction<IPayload>
  onClick:(e:any)=>void;
}
const UploadBox: React.FC<IProps> = ({files, setFile, remark, onClick}) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFile({
      files: [...files, ...acceptedFiles]
    });
    }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleRemoveFile = (fileToRemove) => {
    setFile({
      files: files.filter((file) => file !== fileToRemove)
    });
  };
    return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      gap: '10px'
    }}>
      <Paper
       {...getRootProps()}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 500,
          textAlign: 'center',
          border: '2px dashed #ccc',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <input {...getInputProps()}/>
        <label htmlFor="file-input" style={{
          display: 'flex',
          flexDirection: 'column',
          gap:'10px'
          }}>
          <Typography variant="h6" gutterBottom>
            Drag & drop some files here, or click to select files
          </Typography>
          {remark &&(
            <Typography variant='subtitle2' color={red[400]}>
            {remark}
          </Typography>
          )}
        </label>
      </Paper>
      {files.length > 0 && (
        <List
        sx={{
          mt: 2,
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            }}
            >
          {files.map((file, index) => (
            <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file)}>
                  <DeleteForever />
                </IconButton>
              }
              >
              <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
            </ListItem>
          ))}
        </List>
      )}
    <CustomContainedButton label='Submit' onClick={onClick}/>
    </Box>
  )
}

export default UploadBox