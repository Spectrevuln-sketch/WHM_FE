'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { BoxCompo, Col, PEMasterCoa } from './styles';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import RoundedContainedButton from '@/components/buttons/RoundedContainedButton';
import { useMasterCoa } from './@usecase';
import { BoxTable, ColEnd } from '../master-budget-code/styles';
import ModalUploadDnd from '@/components/modals/ImportExceModal';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import { DeleteForever, EditNoteOutlined } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import { getMasterCoa } from './@usecase/handler';
import { TInitialData } from '../@interface';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';

const MasterCoa = () => {
  const {ImportCoa, components, payload, setComponents, setPayload} = useMasterCoa()

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

  const fetchData = async () => {
    const res = await getMasterCoa();
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
      renderCell: ({row}) => {
        return (
          <div>
            <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/>
            <CustomTextButton icon={<EditNoteOutlined/>} color={blue[300]} isDisabled={false} onClick={()=> console.log('Edit')}/>
          </div>
        );
      }
    });
    setData({
      columns: res.columns ?? [],
      initialState:{
        columns:{
          columnVisibilityModel:{
            id: false,
          }
        }
      },
      rows: res.rows ?? [],
    })
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PEMasterCoa>
      <BoxCompo>
        <div>
          <p>Coa</p>
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>
      <ColEnd>
        <RoundedContainedButton fullWidth={false} label='Import Coa Data XLSX' isDisabled={false} onClick={() => setComponents({...components, filterModal: !components.filterModal})} />
      </ColEnd>
      <BoxTable>
        <Col>
          <p>Seluruh Data Coa</p>
          <MasterTableGrid initialData={data}/>

        </Col>
      </BoxTable>
      <ModalUploadDnd isOpen={components.filterModal} file={payload} setFile={setPayload} onUpload={ImportCoa} remark="*file must be xlsx"  onClose={()=> setComponents({...components, filterModal: !components.filterModal})}/>
    </PEMasterCoa>
  )
}

export default MasterCoa