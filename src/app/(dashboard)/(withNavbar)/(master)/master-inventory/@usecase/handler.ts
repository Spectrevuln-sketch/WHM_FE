'use server'

import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";
import { HeaderFilter } from "../../@usecase";
import { TInitialData } from "../../@interface";




export const getInventory = async ()=>{
  const token = cookies().get('token')?.value;
    const result = await apiRequest.v1.get('/inventory', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    return result.data
}

export const getMasterInventory =  async ()=>{
  try {
    const token = cookies().get('token')?.value;
    const result = await apiRequest.v1.get('/inventory', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    let columns : TInitialData['columns'] = [];
    let rows : TInitialData['rows'] = [];
    if(result.data.data.length){
      const key = Object.keys(result.data.data[0]).filter((keyData: string)=>keyData !== 'coa' && keyData !=='po' && keyData !== 'po_id' && keyData !== 'coa_id')
      columns = key.map((val, idx)=>{
          return {
            field: val,
            headerName: HeaderFilter(key, idx),
            // headerName: key[idx],
            sortable: true,
            width: 160,
            editable: false,
            hide: false,
            // headerAlign: 'center',
          }
      })
      rows = result.data.data
    }
    return {
      columns: columns.filter(column => column.field !== undefined),
      rows
    }
  } catch (err: any) {
    console.log(err);
    return err;
  }
}