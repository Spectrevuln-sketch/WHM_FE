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
import React, { useEffect, useState } from "react";
import { ApproveMsr, getMsr, IParamsGet, updateStatus } from "./@usecase/handle";
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator";
import { TInitialData } from "../(master)/@interface";
import CustomTextButton from "@/components/buttons/CustomTextButton";
import { Checklist, DeleteForever, EditNoteOutlined, RemoveRedEye } from "@mui/icons-material";
import { blue, green, grey, red } from "@mui/material/colors";
import MasterTableGrid from "@/components/tables/MasterTableGrid";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { StatusChecker } from "@/helpers/checker";
import { convertToCapitalcase } from "@/helpers/converterHelper";

export interface MsrData {
  msrNumber: string,
  reqBy: string,
  urgency: string,
  creationDate: string,
  status: React.ReactElement,
  action: React.ReactElement,
}

const CreateMsr: React.FC = () => {

  const router = useRouter();
  const user = useAppSelector((state)=> state.users.currentUser)

  const msrHeader: CustomTableColumnInterface[] = [
    {
      id: 'msrNumber',
      label: 'MSR Number',
    },
    {
      id: 'reqBy',
      label: 'Requested By',
    },
    {
      id: 'urgent',
      label: 'Urgent',
    },
    {
      id: 'creationDate',
      label: 'Creation Date',
    },
    {
      id: 'status',
      label: 'Status',
    },
    {
      id: 'aksi',
      label: 'Aksi',
    },
  ]
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
  const [msrData] = React.useState<MsrData[]>([
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Normal',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Approval" color={1} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/material-service-request/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Very Urgent',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Rejected form Logistik" color={4} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/material-service-request/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Normal',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Approval" color={1} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/material-service-request/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Very Urgent',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Waiting for Approval from PM" color={0} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/material-service-request/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Normal',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Approval" color={1} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/material-service-request/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Very Urgent',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Waiting for Approval from PR" color={0} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/material-service-request/QFE12345678910')} />
    },
  ])

  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);



const ProcessUpload = async (row)=>{
  try{
    const statusData = await updateStatus(row.id);
    if(statusData.resp_code === "99")
      return alert("Harap Update Status Kembali")
    return window.location.reload();
  }catch(err){
    return alert("Terjadi kesalahan silahkan di coba kembali")
  }
}


const Approvement = async (row)=>{
  // try{
    const res = await ApproveMsr({
      msrId: row.id
      })
      if(res.resp_code === "99")
        return alert("Harap Approve Kembali")
      return window.location.reload();

  // }catch(err){
  //   return alert("Terjadi kesalahan silahkan di coba kembali")
  // }
}
  useEffect(()=>{
    const fetchData = async () =>{
      const res = await getMsr({page});
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
            resizable: true,
            width: 300,
            renderCell: ({ row }) => {
              return (
                <Box>
                  {StatusChecker(user.data.roles.name, ['admin', 'procurement', 'am_manager']) && (
                    <>
                    {StatusChecker(user.data.roles.name, ['admin', 'cost_control']) && StatusChecker(row.status, ['WAITING_FOR_VAL_FORM_COST_CONTROL', 'WAITING_FOR_VAL_FORM_WAREHOUSE_LOGISTIK']) && (
                      <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={()=>ProcessUpload(row)} />
                      )}
                      {/* <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/> */}
                      {row.status === 'APPROVE_MSR' && StatusChecker(user.data.roles.name, ['cost_control', 'admin']) &&  (
                        <>
                          {StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                            <CustomTextButton color={green[300]} icon={<Checklist/>} isDisabled={false} onClick={() => Approvement(row)} />
                      )}
                        </>
                      )}
                    </>
                  )}
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
    }
    fetchData()
  },[])
  return(
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
        {
          msrData && msrData.length > 0
          ?
          // <Grid>
             <MasterTableGrid initialData={data}/>
          //  </Grid>
          : <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '440px',
              flexGrow: 1
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '22px'
              }}
            >
              {`Oops, it looks like you haven't made a`}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '22px'
              }}
            >
              MATERIAL & SERVICE REQUISITION
            </Typography>
          </Box>
        }
      </FlexWrapper>

    </Grid>
  );
}

export default CreateMsr