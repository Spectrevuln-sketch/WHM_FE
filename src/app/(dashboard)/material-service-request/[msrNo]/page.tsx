'use client';

import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomContainedButtonBlue from "@/components/buttons/CustomContainedButtonBlue";
import StatusChip from "@/components/chips/StatusChip";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import CustomStepper from "@/components/steppers/CustomStepper";
import CustomDetailsMsrTable from "@/components/tables/CustomDetailsMsrTable";
import { DetailKeyText, DetailValueText, TitleDashboardText } from "@/components/text/styledText";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export interface MaterialServiceItemInterface{
  nomor: string;
  description: string;
  unitPrice: string;
  qty: number;
  uom: string;
}

const MsrDetail = ({ params }: { params: { msrNo: string } }) => {

  const [status, setStatus] = React.useState('')
  const [notes, setNotes] = React.useState('')

  React.useEffect(() => {
    setStatus('waiting')
  }, []);
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      {/* date & status */}
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
        >Order Data</Typography>
        <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px'
          }}
        >Sunday, September 22 2023</Typography>
        <Box>
          <StatusChip status={status} />
        </Box>
      </Grid>

      {/* title */}
      <Grid
        container
        direction={'row'}
        gap={'10px'}
        alignItems={'center'}
        marginTop={'16px'}
      >
        <TitleDashboardText>Details Material Services Request</TitleDashboardText>
        <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '24px',
            color: 'rgba(75, 70, 92, 1)'
          }}
        >943</Typography>
      </Grid>

      {/* order data detail */}
      <Grid
        container
        direction={'column'}
        sx={{
          marginTop: '75px',
          width: '60%',
          gap: '14px'
        }}
      >
        <Grid
          container
          direction={'row'}
        >
          <Box sx={{width: '50%'}}>
            <DetailKeyText>Vessel / Site / Dept</DetailKeyText>
          </Box>
          <Box sx={{width: '50%'}}>
            <DetailValueText>IT Departement</DetailValueText>
          </Box>
        </Grid>
        <Grid
          container
          direction={'row'}
        >
          <Box sx={{width: '50%'}}>
            <DetailKeyText>Work Location</DetailKeyText>
          </Box>
          <Box sx={{width: '50%'}}>
            <DetailValueText>Jakarta Pusat, Sudirman</DetailValueText>
          </Box>
        </Grid>
        <Grid
          container
          direction={'row'}
        >
          <Box sx={{width: '50%'}}>
            <DetailKeyText>Project Code</DetailKeyText>
          </Box>
          <Box sx={{width: '50%'}}>
            <DetailValueText>0705-ASM-020A-PR-VIII-2023</DetailValueText>
          </Box>
        </Grid>
        <Grid
          container
          direction={'row'}
        >
          <Box sx={{width: '50%'}}>
            <DetailKeyText>Delivery Date (within)</DetailKeyText>
          </Box>
          <Box sx={{width: '50%'}}>
            <DetailValueText>Sunday, September 24 2023</DetailValueText>
          </Box>
        </Grid>
        <Grid
          container
          direction={'row'}
        >
          <Box sx={{width: '50%'}}>
            <DetailKeyText>Urgency</DetailKeyText>
          </Box>
          <Box sx={{width: '50%'}}>
            <DetailValueText>Normal</DetailValueText>
          </Box>
        </Grid>
        <Grid
          container
          direction={'row'}
        >
          <Box sx={{width: '50%'}}>
            <DetailKeyText>Suggested Supplier</DetailKeyText>
          </Box>
          <Box sx={{width: '50%'}}>
            <DetailValueText>SiTepat Tujuan</DetailValueText>
          </Box>
        </Grid>
      </Grid>

      {/* stepper */}
      <Grid
        container
        direction={'column'}
        marginTop={'60px'}
        gap={'14px'}
      >
        <DetailKeyText>Edited By</DetailKeyText>
        <CustomStepper
          activeStep={1}
          steps={[
            {
              label: '',
              description: 'Project Manager'
            },
            {
              label: '',
              description: 'Administration Check'
            },
            {
              label: '',
              description: 'Waiting for Approval from PR'
            },
          ]}
        />
      </Grid>

      {/* table */}
      <Box
        sx={{
          marginTop: '56px'
        }}
      >
        <CustomDetailsMsrTable
          column={[
            {
              id: 'nomor',
              label: 'Nomor',
            },
            {
              id: 'description',
              label: 'Description',
            },
            {
              id: 'unitPrice',
              label: 'Unit Price',
            },
            {
              id: 'qty',
              label: 'Qty',
            },
            {
              id: 'uom',
              label: 'UOM',
            },
          ]}
          datas={[
            {
              nomor: '0869-ASM-000-PR-IX-2023',
              description: 'EPSON INK BOTTLE 008 BLACK',
              unitPrice: 'Rp. 275.000',
              qty: 5,
              uom: 'PCS'
            },
            {
              nomor: '0869-ASM-000-PR-IX-2023',
              description: 'EPSON INK BOTTLE 008 MAGENTA',
              unitPrice: 'Rp. 275.000',
              qty: 5,
              uom: 'PCS'
            },
            {
              nomor: '0869-ASM-000-PR-IX-2023',
              description: 'RAM SODIMM 8GB DDR4 3200MHZ',
              unitPrice: 'Rp. 275.000',
              qty: 5,
              uom: 'PCS'
            },
            {
              nomor: '0869-ASM-000-PR-IX-2023',
              description: 'EPSON INK BOTTLE 008 BLACK',
              unitPrice: 'Rp. 275.000',
              qty: 5,
              uom: 'PCS'
            },
          ]}
        />
      </Box>

      {/* notes */}
      <Box
        sx={{
          marginTop: '30px'
        }}
      >
        <CustomTextareaField
          label="Note ( Opsional )"
          placeholder="Note ( Opsional )"
          rows={3}
          textHelper=""
          endAdornment=""
          value={notes}
          onChange={(val) => setNotes(val)}
          isDisabled={false}
          isError={false}
        />
      </Box>

      <Grid
        container
        direction={'row'}
        gap={'4px'}
        marginTop={'30px'}
      >
        {
          ['approval', 'waitingPr'].includes(status)
          ? <Box sx={{width: '235px'}}>
              <CustomContainedButtonBlue label="Waiting Purchase Request" isDisabled={false} onClick={() => console.log('Waiting Purchase Request')} />
            </Box>
          :null
        }
        {
          ['approval', 'waiting'].includes(status)
          ? <Box sx={{width: '140px'}}>
              <CustomContainedButton label="Next" isDisabled={false} onClick={() => console.log('next')} />
            </Box>
          : null
        }
      </Grid>

    </Grid>
  )
}

export default MsrDetail;