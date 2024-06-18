"use client";

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import RoundedContainedButton from '@/components/buttons/RoundedContainedButton';
import { getMasterVendor } from './@usecase/handler';
import { BoxCompo, BoxTable, Col, ColEnd, PEMasterCoa } from './styles';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import { DeleteForever, EditNoteOutlined } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import { TInitialData } from '../@interface';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import {useMasterVendorV2 } from './@usecase';
import ModalUploadDnd from '@/components/modals/ImportExceModal';
// import ModalUploadDnd from '@/components/modals/ImportExceModal';

export default function MasterVendor() {
  const { payload, setPayload, ImportVendor, components, setComponents } = useMasterVendorV2();
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
      const res = await getMasterVendor();
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
  }, []);

  return (
    <>
      <PEMasterCoa>
        <BoxCompo>
          <div>
            <p>Vendor</p>
          </div>
          <div>
            {moment().format('dddd, DD MMM YYYY')}
          </div>
        </BoxCompo>
        <ColEnd>
          <RoundedContainedButton fullWidth={false} label='Import Vendor Data XLSX' isDisabled={false} onClick={() => setComponents({...components, filterModal: !components.filterModal})} />
        </ColEnd>
        <BoxTable>
          <Col>
            <p>Seluruh Data Vendor</p>
            <MasterTableGrid initialData={data} />
          </Col>
        </BoxTable>
      </PEMasterCoa>
      <ModalUploadDnd isOpen={components.filterModal}  file={payload} setFile={setPayload} onUpload={ImportVendor} remark="*file must be xlsx"  onClose={()=> setComponents({...components, filterModal: !components.filterModal})}/>
    </>
  );
}
