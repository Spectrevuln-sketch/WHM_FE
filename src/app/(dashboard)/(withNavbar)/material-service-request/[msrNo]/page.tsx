'use client';

import { dashboardImages } from "@/assets/images/dashboard";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomContainedButtonBlue from "@/components/buttons/CustomContainedButtonBlue";
import StatusChip from "@/components/chips/StatusChip";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import AddToInventoryModal from "@/components/modals/AddToInventoryModal";
import CustomStepper from "@/components/steppers/CustomStepper";
import CustomDetailsMsrTable from "@/components/tables/CustomDetailsMsrTable";
import { DetailKeyText, DetailValueText, TitleDashboardText } from "@/components/text/styledText";
import { ArrowForward, FiberManualRecord, StoreOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Msr, getCurrentMsr, getToken } from "./@usecase/handle";
import moment from "moment";
import { convertToCapitalcase } from "@/helpers/converterHelper";
import MasterTableGrid from "@/components/tables/MasterTableGrid";
import CustomCreateMsrTable from "@/components/tables/CustomCreateMsrTable";
import { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { apiRequest } from "@/config/api";
import { saveAs } from 'file-saver';

export interface MaterialServiceItemInterface{
  qty_on_hand: number,
  qty: number,
  uom: string,
  description: string,
  requested_by: string,
  purpose: string,
  product_code: string
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

const selectedProductColumn: CustomTableColumnInterface[] = [
  {
    id: 'no',
    label: 'No',
  },
  {
    id: 'qty',
    label: 'QTY',
  },
  {
    id: 'uom',
    label: 'UOM',
  },
  {
    id: 'name',
    label: 'Product Name',
  },
  {
    id: 'requested_by',
    label: 'Requested By',
  },
  {
    id: 'purpose',
    label: 'Purpose',
  },

]

const MsrDetail = ({ params }: { params: { msrNo: string } }) => {
  const initialMSRState: Msr = {
    id: "",
    created_at: "",
    updated_at: "",
    MsrIndex: 0,
    msr_number: "",
    work_location: "",
    dept_id: "",
    depts: {
        id: "",
        created_at: "",
        updated_at: "",
        dept_name: ""
    },
    project_code: "",
    delivered_at: "",
    status: "",
    qty_on_hand: "",
    list_of_items: [
        {
            qty_on_hand: 0,
            qty: 0,
            uom: "",
            description: "",
            requested_by: "",
            purpose: "",
            product_code: ""
        }
    ],
    urgentcy: ""
};
  const [msrstate, setMsrstate] = useState<Msr>(initialMSRState)
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
    fatchData()
  }, []);

  const DownloadExcel = async ()=>{
    const token =getToken()
    const res = apiRequest.v1.get(`/download-msr-xlsx/${msrNo}`, {
      responseType: 'blob',
      headers:{
        Authorization: `Bearer ${token}`
      }

    })

      // Tangani respons dan simpan file
      console.log(res)
      const file = new Blob([res.data], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(file);
      saveAs(fileURL, `msr-${id}.pdf`);

  }
  const fatchData =  async () =>{
    const res :Msr = await getCurrentMsr(params.msrNo)
    setMsrstate(res)
  }
  console.log('MSR DATA >>>', msrstate)
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      <AddToInventoryModal
        isOpen={addToInventoryModalOpen}
        onClose={handleCloseAddToInventoryModal}
        msrNo={msrstate.msr_number}
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
        >{moment(msrstate.created_at).format('dddd, MMMM D YYYY')}</Typography>
        <Box>
          <StatusChip label="Approval from PO" color={1} />
        </Box>
      </Grid>

      {/* title */}
      <Grid
        container
        direction={'column'}
        gap={'10px'}
        alignItems={'start'}
        marginTop={'16px'}
      >
        <TitleDashboardText>Details Material Services Request</TitleDashboardText>
        {/* <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} /> */}
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '24px',
            color: 'rgba(75, 70, 92, 1)'
          }}
        >{msrstate.msr_number}</Typography>
      </Grid>

      {/* order data detail & excel download */}
      <Grid
        container
        direction={'row'}
        gap={'24px'}
        alignItems={'center'}
        marginTop={'75px'}
      >
        {/* detail */}
        <Grid
          container
          direction={'column'}
          sx={{
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
              <DetailValueText>{convertToCapitalcase(msrstate.depts.dept_name)}</DetailValueText>
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
              <DetailValueText>{convertToCapitalcase(msrstate.work_location)}</DetailValueText>
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
              <DetailValueText>{msrstate.project_code}</DetailValueText>
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
              <DetailValueText>{moment(msrstate.delivered_at).format('dddd, MMMM D YYYY')}</DetailValueText>
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
              <DetailValueText>{convertToCapitalcase(msrstate.urgentcy)}</DetailValueText>
            </Box>
          </Grid>
        </Grid>
        {/* excel */}
        <Grid
          container
          direction={'row'}
          justifyContent={'space-between'}
          width={'300px'}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={'20px'}
            alignItems={'center'}
            onClick={DownloadExcel}
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
          column={selectedProductColumn}
          datas={msrstate.list_of_items}
        />
         {/* <CustomCreateMsrTable
          datas={msrstate.list_of_items}
          column={selectedProductColumn}
        /> */}
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