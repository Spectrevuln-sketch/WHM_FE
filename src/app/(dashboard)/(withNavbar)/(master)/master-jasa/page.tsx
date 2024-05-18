'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import RoundedContainedButton from '@/components/buttons/RoundedContainedButton';
import { getMasterJasa } from './@usecase/handler';
import { BoxCompo, BoxTable, Col, ColEnd, PEMasterCoa } from './styles';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import { DeleteForever, EditNoteOutlined } from '@mui/icons-material';
import { TInitialData } from '../@interface';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import { blue, red } from '@mui/material/colors';
import MasterTableGrid from '@/components/tables/MasterTableGrid';

interface IProps {
  masterJasa: object | null
}
export default function MasterJasa() {
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
      const res = await getMasterJasa();
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
          <p>Jasa</p>
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>
      <ColEnd>
        <RoundedContainedButton fullWidth={false} label='Add Jasa' isDisabled={false} onClick={()=> console.log('add Jasa')} />
      </ColEnd>
      <BoxTable>
        <Col>
          <p>Seluruh Data Jasa</p>
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
