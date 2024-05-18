'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import RoundedContainedButton from '@/components/buttons/RoundedContainedButton';
import { GetAllMasterBudget } from './@usecase/handler';
import { BoxCompo, BoxTable, Col, ColEnd, PEMasterCoa } from './styles';
import { useRouter } from 'next/navigation';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import { DeleteForever, EditNoteOutlined } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import { TInitialData } from '../@interface';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';


interface IProps{
  master: object | null;
}
export default function MasterBudgetCode(){
  const router = useRouter()
  const [error, setError] = useState<{}>()
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetAllMasterBudget();
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
        width: 160,
        editable: false,
        hide: false,
        headerAlign: 'center',
        renderCell: (params) => {
          return (
            <div>
              <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/>
              <CustomTextButton icon={<EditNoteOutlined/>} color={blue[300]} isDisabled={false} onClick={()=> console.log('Edit')}/>
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
          <p>Budget Code</p>
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>
      <ColEnd>
        <RoundedContainedButton fullWidth={false} label='Add Budget Code' isDisabled={false} onClick={()=>router.push('/master-budget-code/add')} />
      </ColEnd>
      <BoxTable>
        <Col>
          <p>Seluruh Data Budget Code</p>
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
