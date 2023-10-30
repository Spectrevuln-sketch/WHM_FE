import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Modal, Paper, Typography } from "@mui/material";
import { useQRCode } from 'next-qrcode';
import React from "react";
import CustomContainedButtonGrey from "../buttons/CustomContainedButtonGrey";

interface AddToInventoryModalInterface {
  isOpen: boolean;
  qrCode: string;
  msrNo: string;
  onClose: () => void;
}


const AddToInventoryModal: React.FC<AddToInventoryModalInterface> = ({isOpen, qrCode, msrNo, onClose}) => {

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
          QR Code for Add To Inventory
        </Typography>
        
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '22px',
            textAlign: 'center'
          }}
        >
          To continue sending, you are required to carry out a scan so you can proceed to the next stage, namely adding to storage
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

        {/* msr no */}
        <Box
          sx={{
            paddingX: '15px',
            paddingY: '12px',
            width: '100%',
            backgroundColor: '#FF9F4329',
            borderRadius: '6px'
          }}
        >
          <Typography
            sx={{
              color: '#FF9F43',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '24px',
            }}
          >
            Material Service Request - {msrNo}
          </Typography>
        </Box>

        {/* cancel button */}
        <Grid
          container
          direction={'row'}
          justifyContent={'flex-end'}
        >
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

export default AddToInventoryModal;