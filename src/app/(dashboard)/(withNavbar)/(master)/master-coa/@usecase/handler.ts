'use server';

import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";
import { TInitialData } from "../../@interface";
import { HeaderFilter } from "../../@usecase";

export const getMasterCoa = async () =>{
  try {
    const token = cookies().get('token')?.value;
    const result = await apiRequest.v1.get('/coas', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    let columns : TInitialData['columns'] = [];
    let rows : TInitialData['rows'] = [];
    if(result.data.data.length){
      const key = Object.keys(result.data.data[0]).filter((keyData: string)=>keyData !== 'coa')
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