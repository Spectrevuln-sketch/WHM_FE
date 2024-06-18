import React, { useEffect, useState } from 'react';
import { DeleteForever } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import CustomContainedButton from '../buttons/CustomContainedButton';

interface IPayload {
  [type: string]: File[];
}

interface IProps {
  files: IPayload;
  remark?: string;
  setFile: React.Dispatch<React.SetStateAction<IPayload>>;
  onClick: (e: any) => void;
}

const UploadBox: React.FC<IProps> = ({ files, setFile, remark, onClick }) => {
  const [keys, setKeys] = useState<string>();

  useEffect(() => {
    const keys = Object.keys(files).find(key => key === 'xlsx' || key === 'file' || key === 'files');
    if (keys) {
      setKeys(keys);
    }
  }, [files]);

  const onDrop = (acceptedFiles: File[]) => {
    if (keys) {
      setFile({
        ...files,
        [keys]: [...files[keys], ...acceptedFiles]
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (fileToRemove: File) => {
    if (keys) {
      setFile({
        ...files,
        [keys]: files[keys].filter((file) => file !== fileToRemove)
      });
    }
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
        <input {...getInputProps()} />
        <label htmlFor="file-input" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <Typography variant="h6" gutterBottom>
            Drag & drop some files here, or click to select files
          </Typography>
          {remark && (
            <Typography variant='subtitle2' color={red[400]}>
              {remark}
            </Typography>
          )}
        </label>
      </Paper>

      {keys && files[keys] && files[keys].length > 0 && (
        <List
          sx={{
            mt: 2,
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.paper',
          }}
        >
          {files[keys].map((file, index) => (
            <ListItem
              key={`${file.name}-${index}`}
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

      <CustomContainedButton label='Submit' onClick={onClick} />
    </Box>
  );
};

export default UploadBox;
