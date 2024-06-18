'use client'
import RoundedContainedButton from "@/components/buttons/RoundedContainedButton";
import StatusChip from "@/components/chips/StatusChip";
import { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { TitleDashboardText } from "@/components/text/styledText";
import FlexWrapper from "@/components/wrappers/FlexWrapper";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator";
import { TInitialData } from "../(master)/@interface";
import CustomTextButton from "@/components/buttons/CustomTextButton";
import { Checklist, RemoveRedEye } from "@mui/icons-material";
import { blue, green, red } from "@mui/material/colors";
import MasterTableGrid from "@/components/tables/MasterTableGrid";
import {  useAppSelector } from "@/store/store";
import { ApprovePr, getPr } from "./@usecase/handle";
import { updateStatusDoc } from "../material-service-request/@usecase/handle";
import { StatusChecker } from "@/helpers/checker";

export interface MsrData {
  msrNumber: string,
  reqBy: string,
  urgency: string,
  creationDate: string,
  status: React.ReactElement,
  action: React.ReactElement,
}

const PurchaseRequest: React.FC = () => {

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
  const Approvement = async (row)=>{
    // try{
      const res = await ApprovePr({
        pr_id: row.id
      })
      console.log('PR RESPONSE APPROVE >>', res)
        if(res.resp_code === "99")
          return alert("Harap Approve Kembali")
        return window.location.reload();

    // }catch(err){
    //   return alert("Terjadi kesalahan silahkan di coba kembali")
    // }
  }
  useEffect(()=>{
    const fetchData = async () =>{
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
            resizable: true,
            width: 300,
            // align: 'center',
            // display: 'flex' as const,
            renderCell: ({ row }) => {
              return (
                <Box>
                  {StatusChecker(user.data.roles.name, ['admin', 'procurement', 'am_manager']) && (
                    <>
                    {StatusChecker(user.data.roles.name, ['admin', 'cost_control']) && StatusChecker(row.status, ['WAITING_APPROVE_PM', 'WAITING_APPROVE_AM_MANAGER', 'WAITING_APPROVE_PROCUREMENT']) && (
                      <CustomTextButton type="submit" variant="contained" label="Update Status" bgcolor="success" color="#fff" isDisabled={false} onClick={()=>ProcessStatus(row)} />
                      )}
                      {/* <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/> */}
                      {row.status === 'SEND_TO_SUPPLYER' && StatusChecker(user.data.roles.name, ['cost_control', 'admin']) &&  (
                        <>
                          {StatusChecker(user.data.roles.name, ['cost_control', 'admin']) && (
                            <CustomTextButton color={green[300]} icon={<Checklist/>} isDisabled={false} onClick={() =>Approvement(row) } />
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

      <TitleDashboardText>Purchase Request</TitleDashboardText>
      {/* <Box
        sx={{
          marginTop: '24px',
          width: '150px'
        }}
      >
        <CustomContainedButton label="Create Pr" isDisabled={false} onClick={() => router.push('/material-service-request/create')} />
      </Box> */}

      {/* content */}
      <FlexWrapper direction="column" justifyContent="center" alignItems="center">
        {
          msrData && msrData.length > 0
          ?
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
            {/* <CustomSearchField
              placeholder="Search MSR Number"
              isDisabled={false}
              isError={false}
              onChange={(val) => setSearch(val)}
              textHelper=""
              value={search}
            /> */}
             <MasterTableGrid initialData={data}/>
          </Grid>
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

export default PurchaseRequest