'use client'
import RoundedContainedButton from "@/components/buttons/RoundedContainedButton";
import StatusChip from "@/components/chips/StatusChip";
import { TitleDashboardText } from "@/components/text/styledText";
import FlexWrapper from "@/components/wrappers/FlexWrapper";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator";
import { TInitialData } from "../(master)/@interface";
import CustomTextButton from "@/components/buttons/CustomTextButton";
import { Checklist, RemoveRedEye } from "@mui/icons-material";
import { blue, green } from "@mui/material/colors";
import MasterTableGrid from "@/components/tables/MasterTableGrid";
import {  useAppSelector } from "@/store/store";
import { ApprovePr, getPr } from "./@usecase/handle";
import { updateStatusDoc } from "../material-service-request/@usecase/handle";
import { PrivilageChecker, StatusChecker } from "@/helpers/checker";
import { convertToUpperSnakeCase } from "@/helpers/converterHelper";
import GlobalModal from "@/components/modals/GlobalModal";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import CustomContainedButtonRed from "@/components/buttons/CustomContainedButtonRed";
import { RejectDoc } from "../@usecase/handler";

export interface MsrData {
  msrNumber: string,
  reqBy: string,
  urgency: string,
  creationDate: string,
  status: React.ReactElement,
  action: React.ReactElement,
}


export interface IState {
  pr_id: string,
  reason: string
}
export interface IModal{
  modalReject: boolean
}

const PurchaseRequest: React.FC = () => {

  const initializeModal: IModal = {
    modalReject: false
  }
  const initialState:IState = {
    pr_id: '',
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

  const [page, setPage] = React.useState(1);

  const ProcessStatus = async (row)=>{
    try{
      const res = await updateStatusDoc('/update-status-pr', row.id);
      if(res.resp_code === "99")
        return alert("Harap Update Status Kembali")
      return window.location.reload();
    }catch(err){
      if(err){
        return alert("Terjadi kesalahan silahkan di coba kembali")
      }
    }
  }

  const Reject = async () =>{
    const res = await RejectDoc(`/reject-pr/${state.pr_id}`, {pr_id: state.pr_id, note: state.reason})
    if(res.resp_code === '99'){
      alert('Gagal Reject Dokumen')
      window.location.reload();
    }else{
      alert('Document Rejected !')
      window.location.reload();
    }
  }

  const Approvement = async (row)=>{
    try{
      const res = await ApprovePr({
        pr_id: row.id
      })
        if(res.data.resp_code === "99")
          return alert("Harap Approve Kembali")
        return window.location.reload();

    }catch(err){
      return alert("Terjadi kesalahan silahkan di coba kembali")
    }
  }

  const fetchData = useCallback(async () =>{
    const res = await getPr({page});
    if (res === undefined){
      return setData({
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
    }
    if (res.columns.length > 0){
      if(user.data.roles.name === 'admin'){

        res?.columns?.push({
          field: "action",
          headerName: 'ACTIONS',
          sortable: false,
          editable: false,
          hide: false,
          headerAlign: 'center',
          width: 300,
          renderCell: ({ row }) => {
            const status = convertToUpperSnakeCase(row.status)
            return (
              <Box>
                  <>
                  {PrivilageChecker(user.data.roles.name, status) && (
                    <>
                    <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={()=>ProcessStatus(row)} />
                    <CustomTextButton type="submit" variant="contained" label="Reject" bgcolor="error" color="#fff" isDisabled={false} onClick={() => {
                      setState({...state, pr_id: row.id})
                      setModal({...modal, modalReject: !modal.modalReject})
                    }} />
                    </>
                    )}
                    {/* <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/> */}
                    {status === 'SEND_TO_SUPPLYER' &&  (
                      <>
                        {StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                          <CustomTextButton color={green[300]} icon={<Checklist/>} isDisabled={false} onClick={() =>Approvement(row) } />
                          )}
                      </>
                    )}
                  </>
              <CustomTextButton icon={<RemoveRedEye />} color={blue[300]} isDisabled={false} onClick={() => router.push(`/purchase-request/${row.id}`)} />
              </Box>
            );
          },
        });
  }
}
  setData({
    columns: res?.columns,
      initialState:{
        columns:{
          columnVisibilityModel:{
            id: false,
          }
        }
      },
      rows: res?.rows,
    })
  }, [user.data])


  useEffect(()=>{
    fetchData()
  },[])




  return(
    <>
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      <TitleDashboardText>Purchase Request</TitleDashboardText>

      {/* content */}
      <FlexWrapper direction="column" justifyContent="center" alignItems="center">
          <Grid
            container
            direction={'column'}
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '1.5em',
              marginTop: '72px'
            }}
          >
             <MasterTableGrid initialData={data}/>
          </Grid>
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

export default PurchaseRequest