'use client'
import React, { useCallback, useEffect, useState } from 'react'
import moment from "moment-timezone";
import { BoxCompo, BoxTable, Col, ColEnd, PEMasterCoa } from './styles';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import {Checklist, EditNoteOutlined, RemoveRedEye } from '@mui/icons-material';
import { blue, green, } from '@mui/material/colors';
import { TInitialData } from '../@interface';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import { useRouter } from 'next/navigation';
import { ApproveSoq, getSoqData } from "./@usecase/handler";
import { PrivilageChecker, StatusChecker } from '@/helpers/checker';
import { updateStatusDoc } from '../material-service-request/@usecase/handle';
import { useAppSelector } from '@/store/store';
import { convertToUpperSnakeCase } from '@/helpers/converterHelper';
import GlobalModal from '@/components/modals/GlobalModal';
import { Box } from '@mui/material';
import CustomTextareaField from '@/components/inputs/CustomTextareaField';
import CustomContainedButtonRed from '@/components/buttons/CustomContainedButtonRed';
import { RejectDoc } from '../@usecase/handler';

interface IProps {
  masterDept : object | null
}


export interface IState {
  soq_id: string
  reason: string
}
export interface IModal{
  modalReject: boolean
}

export default function Soq() {
  const initializeModal: IModal = {
    modalReject: false
  }
  const initialState:IState = {
    soq_id:'',
    reason: ''
  }
  const [modal, setModal] = useState<IModal>(initializeModal)
  const [state, setState] = useState<IState>(initialState)


  const router = useRouter()
  const user = useAppSelector((state)=> state.users.currentUser)
  const [page, setPage] = React.useState(1);
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


  const Reject = async ()=>{
    const res = await RejectDoc(`/reject-soq/${state.soq_id}`, {soq_id: state.soq_id, note: state.reason})
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
      const res = await updateStatusDoc('/update-status-soq', row.id);
      if(res.resp_code === "99")
        return alert("Harap Update Status Kembali")
      return window.location.reload();
    }catch(err){
      if(err){
        return alert("Terjadi kesalahan silahkan di coba kembali")
      }
    }
  }


  const Approvement = async (row)=>{
    // try{
      console.log('APPROVE SOQ')
      const res = await ApproveSoq({
        soq_id: row.id
      })
      console.log('data res', res)
        if(res.data.resp_code === "99")
          return alert("Harap Approve Kembali")
        // return window.location.reload();

    // }catch(err){
    //   return alert("Terjadi kesalahan silahkan di coba kembali")
    // }
  }
  const fetchData = useCallback(async () => {
    const res = await getSoqData({page});
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
    res?.columns?.push({
      field: "action",
      headerName: 'ACTIONS',
      sortable: false,
      width: 300,
      editable: false,
      hide: false,
      headerAlign: 'center',
      renderCell: ({row}) => {
        const status = convertToUpperSnakeCase(row.status)
        return (
          <div>
                  <>
                  { PrivilageChecker(user.data.roles.name, status) && (
                    <>
                    <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={()=> ProcessStatus(row)} />
                    <CustomTextButton type="submit" variant="contained" label="Reject" bgcolor="error" color="#fff" isDisabled={false} onClick={() => {
                      setState({...state, soq_id: row.id})
                    }} />
                    </>
                    )}
                  { PrivilageChecker(user.data.roles.name, status) || (status === 'WAITING_FOR_PO_CREATE' && StatusChecker(user.data.roles.name, ['cost_control', 'admin'])) && (
                    <CustomTextButton
                      icon={<EditNoteOutlined />}
                      color={blue[300]}
                      isDisabled={false}
                      onClick={() => console.log('Edit')}
                    />
                  )}
                    {status === 'WAITING_FOR_PO_CREATE' && StatusChecker(user.data.roles.name, ['cost_control', 'admin']) &&  (
                      <>
                        {StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                          <CustomTextButton color={green[300]} icon={<Checklist/>} isDisabled={false} onClick={() => Approvement(row)} />
                        )}
                      </>
                    )}
                  </>
              <CustomTextButton icon={<RemoveRedEye />} color={blue[300]} isDisabled={false} onClick={() => router.push(`/material-service-request/${row.id}`)} />
          </div>
        );
      }
    });
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <PEMasterCoa>
      <BoxCompo>
        <div>
          <p>SOQ</p>
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>

      <BoxTable>
        <Col>
          <p>Seluruh Data Soq</p>
          <MasterTableGrid initialData={data}/>
        </Col>
      </BoxTable>
    </PEMasterCoa>
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
  )
}
