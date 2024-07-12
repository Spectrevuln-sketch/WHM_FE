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
import { useRouter } from 'next/navigation';
import { useMasterInventory } from './@usecase';
import ModalUploadDnd from '@/components/modals/ImportExceModal';
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
  const {  ImportInventory, router, payload, setPayload, setComponents, components} = useMasterInventory()
  const [data, setData] = useState<TInitialData | DemoTreeDataValue>({
    columns: [],
    initialState: {
      columns: {
        columnVisibilityModel: {
          id: false
        }
      }
    },
    rows: []
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMasterInventory();
      if (res === undefined) {
        return setData({
          columns: [],
          initialState: {
            columns: {
              columnVisibilityModel: {
                id: false
              }
            }
          },
          rows: []
        });
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
              <CustomTextButton icon={<DeleteForever />} color={red[300]} isDisabled={false} onClick={() => console.log('Delete')} />
              <CustomTextButton icon={<EditNoteOutlined />} color={blue[300]} isDisabled={false} onClick={() => console.log('Edit')} />
            </div>
          );
        }
      });
      setData({
        columns: res?.columns,
        initialState: {
          columns: {
            columnVisibilityModel: {
              id: false,
            }
          }
        },
        rows: res?.rows,
      });
    };
    fetchData();
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
        <RoundedContainedButton fullWidth={false} label='Import Inventory Data XLSX' isDisabled={false} onClick={() => setComponents({...components, filterModal: !components.filterModal})} />
      </ColEnd>
      <BoxTable>
        <Col>
          <p>Seluruh Data Inventory</p>
          <MasterTableGrid initialData={data}/>

        </Col>
      </BoxTable>
      <ModalUploadDnd isOpen={components.filterModal} file={payload} setFile={setPayload} onUpload={ImportInventory} remark="*file must be xlsx"  onClose={()=> setComponents({...components, filterModal: !components.filterModal})}/>
    </PEMasterCoa>
  )
}
