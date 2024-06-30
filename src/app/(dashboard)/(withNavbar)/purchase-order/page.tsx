'use client';

import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import RoundedContainedButton from "@/components/buttons/RoundedContainedButton";
import StatusChip from "@/components/chips/StatusChip";
import CustomSearchField from "@/components/inputs/CustomSearchField";
import CustomTable, { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { TitleDashboardText } from "@/components/text/styledText";
import FlexWrapper from "@/components/wrappers/FlexWrapper";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { getMsr, getPurchaseOrder, IParamsGet } from "./@usecase/handle";
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator";
import { TInitialData } from "../(master)/@interface";
import CustomTextButton from "@/components/buttons/CustomTextButton";
import { Checklist, DeleteForever, EditNoteOutlined, RemoveRedEye } from "@mui/icons-material";
import { blue, green, red } from "@mui/material/colors";
import MasterTableGrid from "@/components/tables/MasterTableGrid";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PrivilageChecker, StatusChecker } from "@/helpers/checker";
import { ApproveMsr, updateStatusDoc } from "../material-service-request/@usecase/handle";
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
  po_id: string
  reason: string
}
export interface IModal{
  modalReject: boolean
}


const PurchaseOrder: React.FC = () => {

  const initializeModal: IModal = {
    modalReject: false
  }
  const initialState:IState = {
    po_id: '',
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

  const Reject = async ()=>{
    const res = await RejectDoc(`/reject-po/${state.po_id}`, {po_id: state.po_id, note: state.reason})
    if(res.resp_code === '99'){
      alert('Gagal Reject Dokumen')
      window.location.reload();
    }else{
      alert('Document Rejected !')
      window.location.reload();
    }
  }
  const ProcessStatus = async (row)=>{
    try{
      const res = await  updateStatusDoc('/update-status-po', row.id);
      if(res.resp_code === "99")
        return alert("Harap Update Status Kembali")
      return window.location.reload();
    }catch(err){
      if(err){
        return alert("Terjadi kesalahan silahkan di coba kembali")
      }
    }
  }

  // const Approvement = async (row)=>{
  //   try{
  //     const res = await ApprovePr({
  //       pr_id: row.id
  //     })
  //     console.log('PR RESPONSE APPROVE >>', res)
  //       if(res.resp_code === "99")
  //         return alert("Harap Approve Kembali")
  //       return window.location.reload();

  //   }catch(err){
  //     return alert("Terjadi kesalahan silahkan di coba kembali")
  //   }
  // }

  const fetchData = useCallback(async () =>{
      const res = await getPurchaseOrder({page});
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
            flex: 1,
            width: 160,
            renderCell: ({ row }) => {
              const status = convertToUpperSnakeCase(row.status)
              return (
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                    <>
                    {PrivilageChecker(user.data.roles.name, status) && (
                      <>
                        <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={()=>ProcessStatus(row)} />
                        <CustomTextButton type="submit" variant="contained" label="Reject" bgcolor="error" color="#fff" isDisabled={false} onClick={() => {
                          setState({...state, po_id: row.id})
                          setModal({...modal, modalReject: !modal.modalReject})
                        }} />
                      </>
                    )}
                      {/* <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/> */}
                      {/* {row.status === 'SEND_TO_SUPPLYER' && StatusChecker(user.data.roles.name, ['cost_control', 'admin']) &&  (
                        <>
                          {StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                            <CustomTextButton color={green[300]} icon={<Checklist/>} isDisabled={false} onClick={() =>{ ApproveMsr({
                              msrId: row.id
                              })
                              return window.location.reload();
                              }} />
                              )}
                        </>
                      )} */}
                    </>
                <CustomTextButton icon={<RemoveRedEye />} color={blue[300]} isDisabled={false} onClick={() => router.push(`/material-service-request/${row.id}`)} />
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

      <TitleDashboardText>Purchase Order</TitleDashboardText>


      {/* content */}
      <FlexWrapper direction="column" justifyContent="center" alignItems="center">
          <Grid
            container
            direction={'column'}
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '1.5em',
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

export default PurchaseOrder