'use client'
import React from 'react'
import moment from 'moment'
import RoundedContainedButton from '@/components/buttons/RoundedContainedButton';
import { BoxCompo, BoxTable, Col, ColEnd, PEMasterCoa } from './styles';
import MasterTableGrid from '@/components/tables/MasterTableGrid';
import { useMasterBudgetCode } from './@usecase';
import ModalUploadDnd from '@/components/modals/ImportExceModal';



export default function MasterBudgetCode(){
  const { data, ImportBudgetCode, router, payload, setPayload, setComponents, components} = useMasterBudgetCode()

  console.log('data', data)

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
      <RoundedContainedButton fullWidth={false} label='Import Budget Data XLSX' isDisabled={false} onClick={() => setComponents({...components, filterModal: !components.filterModal})} />
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
      <ModalUploadDnd isOpen={components.filterModal} file={payload?.files} setFile={setPayload} onUpload={ImportBudgetCode} remark="*file must be xlsx"  onClose={()=> setComponents({...components, filterModal: !components.filterModal})}/>
    </PEMasterCoa>
  )
}
