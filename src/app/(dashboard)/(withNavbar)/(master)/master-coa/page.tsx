'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CustomSelect from '@/components/inputs/CustomSelect';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import { getMasterCoa } from './@usecase/handler';
import { BoxCompo, Col, PEMasterCoa, Row } from './styles';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import { TInitialData } from '../@interface';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import { DeleteForever, EditNoteOutlined } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IProps {
  masterCoa: object | null
}

const MasterCoa = () => {
  const router = useRouter()
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
  const handleChange = async() =>{
    console.log('change')
  }
  return (
    <PEMasterCoa>
      <BoxCompo>
        <div>
          Coa
        </div>
        <div>
        {moment().format('dddd, DD MMM YYYY')}
        </div>
      </BoxCompo>
      <BoxCompo>
        <Col>
          <p>List Coa</p>
          <Row>
            <Col>
              <CustomSelect
              label='Kode Perkiraan'
              placeholder='Pilih Kode Perkiraan'
              value={''}
              isDisabled={false}
              isError={false}
              textHelper=''
              options={[
                {
                  value: 'en',
                  label: 'English',
                },
                {
                  value: 'id',
                  label: 'Indonesia'
                }
              ]}
              onChange={handleChange}
            />
            </Col>
            <Col>
              <CustomSelect
                label='Nama'
                placeholder='Pilih Nama'
                value={''}
                isDisabled={false}
                isError={false}
                textHelper=''
                options={[
                  {
                    value: 'en',
                    label: 'English',
                  },
                  {
                    value: 'id',
                    label: 'Indonesia'
                  }
                ]}
                onChange={(e) => console.log(e)}
              />
            </Col>
          </Row>
        </Col>
        <CustomTextButton label='Add COA' icon={<></>} color='#FFFFF' isDisabled={false} onClick={()=>router.push('/master-inventory/add')} bgcolor={'secondary'} variant={'contained'} />
      </BoxCompo>
      <BoxCompo>
        <Col>
          <p>Seluruh Data Coa</p>
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
      </BoxCompo>
    </PEMasterCoa>
  )
}

export default MasterCoa