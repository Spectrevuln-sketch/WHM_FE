'use client';

import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomContainedButtonBlue from "@/components/buttons/CustomContainedButtonBlue";
import StatusChip from "@/components/chips/StatusChip";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import AddToInventoryModal from "@/components/modals/AddToInventoryModal";
import CustomStepper from "@/components/steppers/CustomStepper";
import CustomDetailsMsrTable from "@/components/tables/CustomDetailsMsrTable";
import { DetailKeyText, DetailValueText, TitleDashboardText } from "@/components/text/styledText";
import { ArrowForward, FiberManualRecord, StoreOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export interface MaterialServiceItemInterface{
  nomor: string;
  description: string;
  unitPrice: string;
  qty: number;
  uom: string;
}

interface PRSummariesInterface {
  vendorName: string;
  msrNo: string;
}

const dummyPRSummaries: PRSummariesInterface[] = [
  {
    msrNo: '0869-ASM-000-PR-IX-2023',
    vendorName: 'GABRIEL INTI MARINDO',
  },
  {
    msrNo: '0869-ASM-000-PR-IX-2023',
    vendorName: 'GABRIEL INTI MARINDO',
  },
  {
    msrNo: '0869-ASM-000-PR-IX-2023',
    vendorName: 'GABRIEL INTI MARINDO',
  },
  {
    msrNo: '0869-ASM-000-PR-IX-2023',
    vendorName: 'GABRIEL INTI MARINDO',
  },
]

const MsrDetail = ({ params }: { params: { msrNo: string } }) => {

  const router = useRouter();

  const [status, setStatus] = React.useState('')
  const [notes, setNotes] = React.useState('')

  const [PRSummaries, setPRSummaries] = React.useState<PRSummariesInterface[]>([]);

  const [addToInventoryModalOpen, setAddToInventoryModalOpen] = React.useState(false)
  
  const handleOpenAddToInventoryModal = () => {
    setAddToInventoryModalOpen(true)
  }
  const handleCloseAddToInventoryModal = () => {
    setAddToInventoryModalOpen(false)
  }

  React.useEffect(() => {
    setStatus('approvalPo')
    setPRSummaries(dummyPRSummaries)
  }, []);
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      <AddToInventoryModal
        isOpen={addToInventoryModalOpen}
        onClose={handleCloseAddToInventoryModal}
        msrNo="0869-ASM-000-PR-IX-2023"
        qrCode={params.msrNo}
      />

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
          <StatusChip label="Approval from PO" color={1} />
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
        >{params.msrNo}</Typography>
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
          activeStep={5}
          steps={[
            {
              label: '',
              description: 'Project Manager',
              notes: []
            },
            {
              label: '',
              description: 'Administration Check',
              notes: ['0869-ASM-000-PR-IX-2023 qty nya tidak cukup', '0869-ASM-000-PR-IX-2023 qty nya tidak cukup']
            },
            {
              label: '',
              description: 'Approval form PR',
              notes: []
            },
            {
              label: '',
              description: 'Approval form SOQ',
              notes: []
            },
            {
              label: '',
              description: 'Approval form PO',
              notes: []
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

      {
        PRSummaries.length >= 1
        ?
        <Grid
          container
          direction={'column'}
          marginTop={'32px'}
        >
          {/* title */}
          <DetailValueText>Purchase Request Summary</DetailValueText>
          {/* items */}
          <Grid
            container
            direction={'row'}
            marginTop={'18px'}
            columns={16}
          >
            {PRSummaries.map((summary, index) => (
              <Box
                key={`pr-summary-${index}`}
                sx={{
                  paddingX: '26px',
                  paddingY: '13px',
                  width: '50%'
                }}
              >
                <Grid  
                  component={Paper}
                  elevation={2}
                  padding={'26px'}
                  width={'100%'}
                  item
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                >

                  {/* vendor name */}
                  <Grid
                    container
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Box display={'flex'} gap={'20px'}>
                      <Box
                        sx={{
                          backgroundColor: '#F7C113',
                          paddingY: '0px',
                          paddingX: '6px'
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: '15px',
                            lineHeight: '24px',
                            color: '#fff'
                          }}
                        >
                          Vendor
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: '15px',
                          lineHeight: '24px',
                          color: '#000'
                        }}
                      >
                        {summary.vendorName}
                      </Typography>
                    </Box>
                    <Box>
                      <StoreOutlined sx={{color: '#4B465C'}} />
                    </Box>
                  </Grid>

                  {/* msr number */}
                  <Grid
                    container
                    direction={'column'}
                    marginTop={'14px'}
                    gap={'8px'}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '18px',
                        color: '#000'
                      }}
                    >
                      Number MSR
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '18px',
                        color: '#000'
                      }}
                    >
                      {summary.msrNo}
                    </Typography>
                  </Grid>

                  {/* detail */}
                  <Grid
                    container
                    direction={'row'}
                    marginTop={'24px'}
                    gap={'4px'}
                    alignItems={'center'}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '18px',
                        color: '#000'
                      }}
                    >
                      Details
                    </Typography>
                    <ArrowForward sx={{fontSize: '14px'}} />
                  </Grid>

                </Grid>
              </Box>
            ))}
          </Grid>
        </Grid>
        : null
      }

      <Grid
        container
        direction={'row'}
        gap={'4px'}
        marginTop={'30px'}
      >
        {
          ['approvalPr'].includes(status)
          ? <Box sx={{width: '240px'}}>
              <CustomContainedButtonBlue label="Creating Purchase Request" isDisabled={false} onClick={() => router.push(`/material-service-request/create-pr/${params.msrNo}`)} />
            </Box>
          :null
        }
        {
          ['approval'].includes(status)
          ? <Box sx={{width: '240px'}}>
              <CustomContainedButtonBlue label="Waiting Purchase Request" isDisabled={false} onClick={() => console.log('Waiting Purchase Request')} />
            </Box>
          :null
        }
        {
          ['approval', 'waiting', 'waitingPr'].includes(status)
          ? <Box sx={{width: '140px'}}>
              <CustomContainedButton label="Next" isDisabled={false} onClick={() => console.log('next')} />
            </Box>
          : null
        }
        {
          ['approvalPo'].includes(status)
          ? <Box sx={{width: '230px'}}>
              <CustomContainedButton label="Add to inventory" isDisabled={false} onClick={() => handleOpenAddToInventoryModal()} />
            </Box>
          : null
        }
      </Grid>

    </Grid>
  )
}

export default MsrDetail;