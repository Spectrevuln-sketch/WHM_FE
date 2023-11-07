'use client';

import { dashboardImages } from "@/assets/images/dashboard";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import { DetailKeyText, DetailValueText, TitleDashboardText } from "@/components/text/styledText";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const DeliveringProductDetail = ({ params }: { params: { msrNo: string } }) => {

  React.useEffect(() => {
    //
  }, []);
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      {/* status & date */}
      <Grid
        container
        direction={'row'}
        gap={'8px'}
        alignItems={'center'}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px'
          }}
        >Delivering Product</Typography>
        <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px'
          }}
        >Delivery Date : Sunday, September 24 2023</Typography>
      </Grid>

      {/* title & msrNo */}
      <Grid
        container
        direction={'row'}
        gap={'10px'}
        alignItems={'center'}
        marginTop={'30px'}
      >
        <TitleDashboardText>Details Delivering Product</TitleDashboardText>
        <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '24px',
            color: 'rgba(75, 70, 92, 1)'
          }}
        >{params.msrNo}</Typography>
      </Grid>

      {/* line */}
      <Box sx={{marginTop: '24px'}}>
        <Image src={dashboardImages.postCardLine} height={6} alt="post-card-line" />
      </Box>

      {/* request from */}
      <Grid
        container
        direction={'row'}
        marginTop={'60px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            backgroundColor: '#828282',
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            paddingY: '6px',
            paddingX: '28px',
            borderRadius: '8px'
          }}
        >
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px',
            }}
          >
            Request From
          </Typography>
        </Box>
        <Box>
          <DetailKeyText>PT. Anugerah Samudera Madanindo</DetailKeyText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'20px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Date Prepared</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText>Friday, September 22 2023</DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>PO No</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText>785-ASM-020A-PO-IX-2023</DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>P.R. No</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText>0705-ASM-020A-PR-VIII-2023</DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'flex-start'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Address</DetailKeyText>
        </Box>
        <Box maxWidth={'500px'}>
          <DetailValueText>Ruko Festive A-23 Citragrand Kel.Sambiroto Kec.Tembalang Semarang - Jawa Tengah</DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Email</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText>may.sthafani@pt-asm.co.id</DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Phone/Fax</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText>+62.24.358.3379</DetailValueText>
        </Box>
      </Grid>

      {/* request to */}
      <Grid
        container
        direction={'row'}
        marginTop={'60px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            backgroundColor: '#F7C113',
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            paddingY: '6px',
            paddingX: '28px',
            borderRadius: '8px'
          }}
        >
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px',
            }}
          >
            Request To
          </Typography>
        </Box>
        <Box>
          <DetailKeyText>CV. DOA IBU</DetailKeyText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'20px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Attention</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText></DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'flex-start'}
        width={'100%'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Address</DetailKeyText>
        </Box>
        <Box maxWidth={'500px'}>
          <DetailValueText>JL.Yos Sudarso Link Tanjung Sekang RT.002/002 Kel.Lebak Gede Kec.Pulo Merak Cilegon - Banten</DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Email</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText></DetailValueText>
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        marginTop={'16px'}
        gap={'18px'}
        alignItems={'center'}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DetailKeyText>Phone/Fax</DetailKeyText>
        </Box>
        <Box>
          <DetailValueText>0859 3900 9820</DetailValueText>
        </Box>
      </Grid>

      {/* excel */}
      <Grid
        component={Paper}
        elevation={1}
        container
        width={'600px'}
        direction={'column'}
        marginTop={'60px'}
        paddingX={'14px'}
        paddingY={'20px'}
      >

        <Grid
          container
          direction={'row'}
          justifyContent={'space-between'}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={'20px'}
            alignItems={'center'}
          >
            <Image src={dashboardImages.excelFileIcon} alt="excel-icon" width={35} height={40} />
            <Grid
              container
              direction={'column'}
              gap={'6px'}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '16px'
                }}
              >
                Product Document.xlsx
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#707070'
                }}
              >
                xlsx - 179MB
              </Typography>
            </Grid>
          </Box>
          <IconButton>
            <Image src={dashboardImages.fileDownloadIcon} alt="dl" width={24} height={24} />
          </IconButton>
        </Grid>

        <Divider sx={{marginY: '18px'}} />

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px'
          }}
        >
          Download File for Excel
        </Typography>
      </Grid>
      
      {/* button */}
      <Box
        sx={{
          marginTop: '45px',
          width: '375px'
        }}
      >
        <CustomContainedButton isDisabled={false} label="Order Has Arrived" onClick={() => console.log('arrived button')} />
      </Box>

    </Grid>
  )
}

export default DeliveringProductDetail;