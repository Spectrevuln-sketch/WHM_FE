'use client';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid } from "@mui/material";
import { ApproveMsr, getMsr,  updateStatus } from "./@usecase/handle";
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator";
import { TInitialData } from "../(master)/@interface";
import { Checklist, RemoveRedEye } from "@mui/icons-material";
import { blue, green } from "@mui/material/colors";
import { useAppSelector } from "@/store/store";
import { PrivilageChecker, StatusChecker } from "@/helpers/checker";
import { convertToUpperSnakeCase } from '@/helpers/converterHelper';
import GlobalModal from '@/components/modals/GlobalModal';
import CustomTextareaField from '@/components/inputs/CustomTextareaField';
import { RejectDoc } from '../@usecase/handler';
const  CustomContainedButton = dynamic(()=> import("@/components/buttons/CustomContainedButton"))
const  CustomContainedButtonRed = dynamic(()=> import("@/components/buttons/CustomContainedButtonRed"))
const  TitleDashboardText  = dynamic(()=> import("@/components/text/styledText").then(mod => mod.TitleDashboardText))
const  CustomTextButton = dynamic(()=> import("@/components/buttons/CustomTextButton"))
const  MasterTableGrid = dynamic(()=> import("@/components/tables/MasterTableGrid"))
const  FlexWrapper = dynamic(()=> import("@/components/wrappers/FlexWrapper"))

export interface MsrData {
  msrNumber: string,
  reqBy: string,
  urgency: string,
  creationDate: string,
  status: React.ReactElement,
  action: React.ReactElement,
}
export interface IState {
  msr_id:string
  reason: string
}
export interface IModal{
  modalReject: boolean
}
const CreateMsr: React.FC = () => {
  const initializeModal: IModal = {
    modalReject: false
  }
  const initialState:IState = {
    msr_id: '',
    reason: ''
  }
  const [modal, setModal] = useState<IModal>(initializeModal)
  const [state, setState] = useState<IState>(initialState)
  const router = useRouter();
  const user = useAppSelector((state)=> state.users.currentUser)
  const [data, setData] = useState<TInitialData | DemoTreeDataValue>({
    columns: [],
    initialState:{
      columns:{
        columnVisibilityModel:{
          id: false
        }
      }
    },
    rows: []
  })

const Reject = async () =>{
  const res = await RejectDoc(`/reject-msr/${state.msr_id}`, {msr_id: state.msr_id, note: state.reason})
  if(res.resp_code === '99'){
    alert('Gagal Reject Dokumen')
    window.location.reload();
  }else{
    alert('Document Rejected !')
    window.location.reload();
  }
}

const StatusChange = async (row)=>{
  try{
    const statusData = await updateStatus(row.id);
    if(statusData.data.resp_code === "99")
      return alert("Harap Update Status Kembali")
    return window.location.reload();
  }catch(err){
    return alert("Terjadi kesalahan silahkan di coba kembali")
  }
}


const Approvement = async (row)=>{
  try{
    const res = await ApproveMsr({
      msrId: row.id
      })
      if(res.data.resp_code === "99")
        return alert("Harap Approve Kembali")
      return window.location.reload();

  }catch(err){
    return alert("Terjadi kesalahan silahkan di coba kembali")
  }
}

const fetchData = useCallback(async () => {
  const res = await getMsr({ page: 1 }); // Assuming page is always 1 for simplicity
  if (!res) {
    setData({ columns: [], initialState: { columns: { columnVisibilityModel: { id: false } } }, rows: [] });
    return;
  }
  if (res.columns.length > 0 && user.data.roles.name === 'admin') {
    res.columns.push({
      field: "action",
      headerName: 'ACTIONS',
      sortable: false,
      editable: false,
      hide: false,
      headerAlign: 'center',
      width: 300,
      renderCell: ({ row }) => {
        const status = convertToUpperSnakeCase(row.status)
        return(
          <Box>
              <>
                {PrivilageChecker(user.data.roles.name, status) && (
                  <>
                    <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={() => StatusChange(row)} />
                    <CustomTextButton type="submit" variant="contained" label="Reject" bgcolor="error" color="#fff" isDisabled={false} onClick={() => {
                      setState({...state, msr_id: row.id})
                      setModal({...modal, modalReject: !modal.modalReject})
                    }} />
                  </>
                )}
                {status === 'APPROVE_MSR' && StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                  <CustomTextButton color={green[300]} icon={<Checklist />} isDisabled={false} onClick={() => Approvement(row)} />
                )}
              </>
            <CustomTextButton icon={<RemoveRedEye />} color={blue[300]} isDisabled={false} onClick={() => router.push(`/material-service-request/${row.id}`)} />
          </Box>
        )
      },
    });
  }
  setData({
    columns: res.columns,
    initialState: { columns: { columnVisibilityModel: { id: false } } },
    rows: res.rows,
  });
}, [user.data]);


useEffect(()=>{
    fetchData()
  },[fetchData])

  // console.log('users data res >>', data)
  return(
    <>
    <Grid
      container
      direction={'column'}
      sx={{}}
      >

      <TitleDashboardText>Material Services Request</TitleDashboardText>
      <Box
        sx={{
          marginTop: '24px',
          width: '150px'
        }}
      >
        <CustomContainedButton label="Create MSR" isDisabled={false} onClick={() => router.push('/material-service-request/create')} />
      </Box>

      {/* content */}
      <FlexWrapper direction="column" justifyContent="center" alignItems="center" padding="1em">
             <MasterTableGrid initialData={data}/>
      </FlexWrapper>

    </Grid>
    <GlobalModal isOpen={modal.modalReject} onClose={()=> setModal({...modal, modalReject:!modal.modalReject })} >
        <Box sx={{
          display: 'flex',
          padding: '20px',
          textAlign: 'left',
          width: '50em',
          height: '10em'
        }}>
           <CustomTextareaField
            label="Reason"
            placeholder="Enter your reason"
            rows={3}
            value={state.reason}
            onChange={(val) => setState({
              ...state,
              reason: val
            })}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
        <CustomContainedButtonRed label="Reject" isDisabled={false} onClick={Reject} />
    </GlobalModal>
  </>
  );
}

export default CreateMsr