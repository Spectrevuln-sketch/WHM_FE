'use client'
import React, { useEffect, useState } from 'react'
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
import { StatusChecker } from '@/helpers/checker';
import { updateStatusDoc } from '../material-service-request/@usecase/handle';
import { useAppSelector } from '@/store/store';

interface IProps {
  masterDept : object | null
}
export default function Soq() {
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

  useEffect(() => {
    const fetchData = async () => {
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
          return (
            <div>
              {StatusChecker(user.data.roles.name, ['admin', 'procurement', 'am_manager']) && (
                    <>
                    {StatusChecker(user.data.roles.name, ['admin', 'cost_control']) && StatusChecker(row.status, ['WAITING_AM_MANAGER_APPROVE', 'APPROVE_AM_MANAGER', 'APPROVE_COST_CONTROL', 'APPROVE_PM', 'APPROVE_BOARD_DIRECTOR']) && (
                      <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={()=> ProcessStatus(row)} />
                      )}
                    {(
                      (StatusChecker(row.status, ['WAITING_AM_MANAGER_APPROVE']) && StatusChecker(user.data.roles.name, ['admin', 'am_manager'])) ||
                      (StatusChecker(row.status, ['APPROVE_AM_MANAGER']) && StatusChecker(user.data.roles.name, ['admin', 'cost_control'])) ||
                      (StatusChecker(row.status, ['APPROVE_PM']) && StatusChecker(user.data.roles.name, ['admin', 'board_of_director'])) ||
                      (StatusChecker(row.status, ['APPROVE_BOARD_DIRECTOR']) && StatusChecker(user.data.roles.name, ['admin', 'board_of_director'])) ||
                      (StatusChecker(row.status, ['WAITING_FOR_PO_CREATE', 'APPROVE_COST_CONTROL']) && StatusChecker(user.data.roles.name, ['admin', 'project_manager']))
                    ) && (
                      <CustomTextButton
                        icon={<EditNoteOutlined />}
                        color={blue[300]}
                        isDisabled={false}
                        onClick={() => console.log('Edit')}
                      />
                    )}
                      {row.status === 'WAITING_FOR_PO_CREATE' && StatusChecker(user.data.roles.name, ['cost_control', 'admin']) &&  (
                        <>
                          {StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                            <CustomTextButton color={green[300]} icon={<Checklist/>} isDisabled={false} onClick={() => Approvement(row)} />
                          )}
                        </>
                      )}
                    </>
                  )}
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
    };
    fetchData();
  }, []);
  return (
    <PEMasterCoa>
      <BoxCompo>
        <div>
          <p>SOQ</p>
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>
      <ColEnd>
        {/* <RoundedContainedButton fullWidth={false} label='Add Soq' isDisabled={false} onClick={()=> router.push('/soq/add')} /> */}
      </ColEnd>
      <BoxTable>
        <Col>
          <p>Seluruh Data Soq</p>
          <MasterTableGrid initialData={data}/>
          {/* <CustomTable
              column={msrHeader}
              datas={msrData}
              onPageChange={(page) => setPage(page)}
              rowsPerPage={4}
              page={page}
              count={msrData.length}
            /> */}
        </Col>
      </BoxTable>
    </PEMasterCoa>
  )
}
