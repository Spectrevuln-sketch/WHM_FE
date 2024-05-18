'use server'

import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";
import { TInitialData } from "../../@interface";
import { HeaderFilter } from "../../@usecase";


export const getMasterVendor =  async ()=>{
  try {
    const token = cookies().get('token')?.value;
    const result = await apiRequest.v1.get('/depts', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    const columns : TInitialData['columns'] = result.data.data?.map((val, idx)=>{
      const key = Object.keys(val).filter((keyData: string)=>keyData !== 'coa')
        return {
          field: key[idx],
          headerName: HeaderFilter(key, idx),
          // headerName: key[idx],
          sortable: true,
          width: 160,
          editable: false,
          hide: false,
          // headerAlign: 'center',
        }
    })
    const rows: TInitialData['rows'] = result.data.data
    return {
      columns: columns.filter(column => column.field !== undefined),
      rows
    }
  } catch (err: any) {
    console.log(err);
    return err;
  }
}