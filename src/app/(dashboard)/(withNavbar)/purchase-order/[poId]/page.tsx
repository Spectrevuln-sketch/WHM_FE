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
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, IconButton,  Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Msr, getCurrentMsr, getToken, getStatusMsr, getCurrentPr, getStatusPr } from "./@usecase/handle";
import moment from "moment";
import { convertToCapitalcase } from "@/helpers/converterHelper";
import { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { apiRequest } from "@/config/api";
import { saveAs } from 'file-saver';



export interface MsrData{
  id: string;
  created_at: string;
  updated_at: string;
  MsrIndex: number;
  msr_number: string;
  work_location: string;
  dept_id: string;
  depts: any; // Specify the structure if known
  project_code: string;
  delivered_at: string;
  status: string;
  urgentcy: string;
  list_of_items: any; // Specify the structure if known
  suggest_supplayer: string;
  reasonReject: string;
}

interface IRes {
  id: string;
  created_at: string;
  updated_at: string;
  PrIndex: number;
  prNumber: string;
  msrID: string;
  msrData: MsrData;
  description: string;
  status: string;
  rejectReason: string;
}

interface IStepper {
    label: string,
    description: string,
    notes: []
}



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
    id: 'description',
    label: 'Description',
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

const PrDetail = ({ params }: { params: { prId: string } }) => {
  const initialState: IRes = {
    id: '',
    created_at: '',
    updated_at: '',
    PrIndex: 0,
    prNumber: '',
    msrID: '',
    msrData: {
      id: '',
      created_at: '',
      updated_at: '',
      MsrIndex: 0,
      msr_number: '',
      work_location: '',
      dept_id: '',
      depts: {}, // Define the actual structure here
      project_code: '',
      delivered_at: '',
      status: '',
      urgentcy: '',
      list_of_items: [], // Change to appropriate type if needed
      suggest_supplayer: '',
      reasonReject: ''
    },
    description: '',
    status: '',
    rejectReason: ''
};

  const [prState, setPrState] = useState<IRes >(initialState)
  const [stepper, setStepper] = useState<IStepper[]>([])
  const router = useRouter();

  const [status, setStatus] = React.useState('')
  const [notes, setNotes] = React.useState('')


  const [addToInventoryModalOpen, setAddToInventoryModalOpen] = React.useState(false)

  const handleOpenAddToInventoryModal = () => {
    setAddToInventoryModalOpen(true)
  }
  const handleCloseAddToInventoryModal = () => {
    setAddToInventoryModalOpen(false)
  }

  React.useEffect(() => {
    setStatus('approvalPo')
    fatchData()
    StatusMsr()
  }, []);


  const DownloadExcel = async ()=>{
    const token =getToken()
    const res = await apiRequest.v1.get(`/download-pr-xlsx/${params.prId}`, {
      responseType: 'blob',
      headers:{
        Authorization: `Bearer ${token}`
      }

    })

      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(file);
      saveAs(fileURL, `msr-${params.prId}.pdf`);

  }
  const fatchData =  async () =>{
    const res = await getCurrentPr(params.prId)
    if (res.resp_code !== '00')
      return alert('PR Tidak Tidak Terdaftar !')
      setPrState(res.data)
  }

  //  getall status msr

  const StatusMsr = async ()=>{
    const res = await getStatusPr()
    if(res.resp_code !== '00')
      return setStepper([])
    res.data.forEach((status:string) => {
      setStepper((prevStepper) => [
        ...prevStepper,
        {
          label: status,
          description: status,
          notes: [],
        },
      ]);
    });
  }
  console.log('depts data >>', stepper)
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      <AddToInventoryModal
        isOpen={addToInventoryModalOpen}
        onClose={handleCloseAddToInventoryModal}
        msrNo={prState?.msrData.msr_number}
        qrCode={params.prId}
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
        >{moment(prState.created_at).format('dddd, MMMM D YYYY')}</Typography>
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
        <TitleDashboardText>Details Purchase Request</TitleDashboardText>
        {/* <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} /> */}
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '24px',
            color: 'rgba(75, 70, 92, 1)'
          }}
        >{prState.prNumber}</Typography>
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
              <DetailValueText>{convertToCapitalcase(prState.msrData.depts.dept_name)}</DetailValueText>
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
              <DetailValueText>{convertToCapitalcase(prState.msrData.work_location)}</DetailValueText>
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
              <DetailValueText>{prState.msrData.project_code}</DetailValueText>
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
              <DetailValueText>{moment(prState.msrData.delivered_at).format('dddd, MMMM D YYYY')}</DetailValueText>
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
              <DetailValueText>{convertToCapitalcase(prState.msrData.urgentcy)}</DetailValueText>
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
          <IconButton onClick={DownloadExcel}>
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
          steps={stepper}
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
          datas={prState.msrData.list_of_items ?? []}
        />
         {/* <CustomCreateMsrTable
          datas={prState.list_of_items}
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
              <CustomContainedButtonBlue label="Creating Purchase Request" isDisabled={false} onClick={() => router.push(`/material-service-request/create-pr/${params.prId}`)} />
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

export default PrDetail;