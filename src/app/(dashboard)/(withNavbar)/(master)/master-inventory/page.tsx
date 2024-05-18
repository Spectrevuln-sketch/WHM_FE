'use client'
import { Box, Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import RoundedContainedButton from '@/components/buttons/RoundedContainedButton';
import { getMasterInventory } from './@usecase/handler';
import { AxiosError } from 'axios';
import { BoxCompo, BoxTable, Col, ColEnd, PEMasterCoa } from './styles';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import {DeleteForever, Edit, EditNoteOutlined} from '@mui/icons-material';
import CustomContainedButtonRed from '@/components/buttons/CustomContainedButtonRed';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import { blue, red, yellow } from '@mui/material/colors';
import { TInitialData } from '../@interface';
interface IProps {
  masterInv: [] | undefined
}
interface Coa {
  id: string;
  created_at: string;
  updated_at: string;
  coa_name: string;
  coa_code: string;
}

interface Inventory {
  id: string;
  created_at: string;
  updated_at: string;
  ProductCode: string;
  coa_id: string;
  coa: Coa;
  GROUPITEM: string;
  GROUPCODE: string;
  ItemName: string;
  ITEM: string;
  ITEMCODE: string;
  SPECS: string;
  SPECSCODE: string;
  BRAND: string;
  BRANDCODE: string;
  UOM: string;
  QTY: number;
  PurchasePrice: string;
  YearOfLastPurchase: string;
}
export default function MasterInventory() {
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
  const HeaderFilter = (key: string[], idx: number) =>{
    switch(key[idx]){
      case 'coa_id':
        return key[idx] = 'COA NUMBER'
      case 'ProductCode':
        return key[idx] = 'PRODUCT CODE'
      case 'PurchasePrice':
        return key[idx] = 'PURCHASE PRICE'
      case 'YearOfLastPurchase':
        return key[idx] = 'YEAR OF LAST PURCHASE'
      default:
        return key?.[idx].toUpperCase().replace("_", " ")
    }
  }
  const MasterData = () => getMasterInventory().then((res)=>{
    const columns : TInitialData['columns'] = res.data?.map((val, idx)=>{
      const key = Object.keys(val).filter((keyData: string)=>keyData !== 'coa')
        return {
          field: key[idx],
          headerName: HeaderFilter(key, idx),
          sortable: true,
          width: 160,
          editable: false,
          hide: false,
          // headerAlign: 'center',
        }
    })
    columns.push({
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
      columns: columns,
      initialState:{
        columns:{
          columnVisibilityModel:{
            id: false,
            coa: false
          }
        }
      },
      rows: res.data.filter((data:Inventory)=> {
        if (data.coa_id){
          data.coa_id = data.coa.coa_code
        }
        const { coa: _ , ...rest } = data;
        return rest;
      }),
    })
  })
  useEffect(() => {
    MasterData()
  }, [])

  return (
    <PEMasterCoa>
      <BoxCompo>
        <div>
          <p>Inventory</p>
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>
      <ColEnd>
        <RoundedContainedButton fullWidth={false} label='Add Inventory' isDisabled={false} onClick={()=> console.log('add Inventory')} />
      </ColEnd>
      <BoxTable>
        <Col>
          <p>Seluruh Data Inventory</p>
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
