'use server'

import { apiRequest } from "@/config/api";
import { getCurrentUser } from "@/helpers/tokenChecker"
import { cookies } from "next/headers";
import { TInitialData } from "../../(master)/@interface";
import moment from "moment";
import { HeaderFilter } from "../../(master)/@usecase";

export interface IParamsGet{
  page?: number;
  limit?: number;
}
export const getPurchaseOrder = async({page=1, limit=10} :IParamsGet) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.get('/get-all-po', {
    params: {
      page,
      limit
    },
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  let columns : TInitialData['columns'] = [];
  let rows : TInitialData['rows'] = [];
  if(result.data.data.length){
    // const key = Object.keys(result.data.data[0])
    const key = Object.keys(result.data.data[0]).filter((keyData: string)=> keyData !== 'work_location' && keyData !== 'id' && keyData !== 'suggest_supplayer' && keyData !== 'updated_at' && keyData !== 'msrData' && keyData !== 'msrID')
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
          rows= result.data.data.map(row => {
            return {
                ...row,
                // status: convertToCapitalcase(row.status),
                delivered_at: moment.utc(row.delivered_at).tz('Asia/Jakarta').format('DD MMM YYYY HH:mm'),
                created_at: moment.utc(row.created_at).tz('Asia/Jakarta').format('DD MMM YYYY HH:mm'),
                updated_at: moment.utc(row.updated_at).tz('Asia/Jakarta').format('DD MMM YYYY HH:mm'),
              };
            })
    }
  return {
    columns: columns.filter(column => column.field !== undefined),
    rows
  }
}

export const ApprovePo = async (payload: IPayloadApproveMsr) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.post('/purchase-request',payload, {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  console.log('resultDAta >>',  result)
}

