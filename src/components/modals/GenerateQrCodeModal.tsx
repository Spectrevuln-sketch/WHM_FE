import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Modal, Paper, Typography } from "@mui/material";
import { useQRCode } from 'next-qrcode';
import React from "react";
import CustomContainedButton from "../buttons/CustomContainedButton";
import CustomContainedButtonGrey from "../buttons/CustomContainedButtonGrey";

interface GenerateQrCodeModalInterface {
  isOpen: boolean;
  qrCode: string;
  onClose: () => void;
}


const GenerateQrCodeModal: React.FC<GenerateQrCodeModalInterface> = ({isOpen, qrCode, onClose}) => {

  const { Canvas } = useQRCode();

  React.useEffect(() => {
    //
  }, [])

  return(
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Grid
        component={Paper}
        container
        direction={'column'}
        width={'800px'}
        padding={'50px'}
        gap={'16px'}
      >

        {/* close button */}
        <Grid
          container
          direction={'row'}
          justifyContent={'flex-end'}
        >
          <IconButton onClick={onClose}>
            <Close/>
          </IconButton>
        </Grid>

        {/* tite & subtitle */}
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '26px',
            lineHeight: '36px',
            textAlign: 'center'
          }}
        >
          QR Code for Delivering
        </Typography>
        
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '22px',
            textAlign: 'center'
          }}
        >
          To continue delivery, you are required to carry out a scan so you can proceed to the next stage, namely sending the package
        </Typography>

        {/* qrcode */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Canvas
            text={qrCode}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: 140,
              color: {
                dark: '#000',
                light: '#fff',
              },
            }}
          />
        </Box>

        {/* cancel button */}
        <Grid
          container
          direction={'row'}
          justifyContent={'flex-end'}
          gap={'18px'}
        >
          <Box
            sx={{
              marginTop: '26px'
            }}
          >
            <CustomContainedButton isDisabled={false} label="Submit" onClick={onClose} />
          </Box>
          <Box
            sx={{
              marginTop: '26px'
            }}
          >
            <CustomContainedButtonGrey isDisabled={false} label="Cancel" onClick={onClose} />
          </Box>
        </Grid>

      </Grid>
    </Modal>
  )
}

export default GenerateQrCodeModal;