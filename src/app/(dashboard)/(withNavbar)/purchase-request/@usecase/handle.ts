'use server'

import { apiRequest } from "@/config/api";
import { Dayjs } from "dayjs";
import moment from "moment-timezone";
import { cookies } from "next/headers";
import { TInitialData } from "../../(master)/@interface";
import { HeaderFilter } from "../../(master)/@usecase";
import { getCurrentUser } from "@/helpers/tokenChecker";


export interface IParamsGet{
  page?: number;
  limit?: number;
}

export interface IPayloadApprovePr {
  pr_id : string;
}

export const ApprovePr = async (payload: IPayloadApprovePr) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.post('/create-summary-soq',payload, {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  return result.data
}



export const getPr = async ({page=1, limit=10} :IParamsGet) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.get('/purchase-requests', {
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
    const key = Object.keys(result.data.data[0]).filter((keyData: string)=>keyData !== 'depts' && keyData !== 'list_of_items' && keyData !== 'dept_id' && keyData !== 'qty_on_hand' && keyData !== 'msr_index' && keyData !== 'MsrIndex' && keyData !== 'work_location' && keyData !== 'id' && keyData !== 'suggest_supplayer' && keyData !== 'updated_at' && keyData !== 'msrData' && keyData !== 'msrID' && keyData !== 'PrIndex' )
    columns = key.map((val, idx)=>{
      if(val === 'status'){
        return {
          field: val,
          headerName: HeaderFilter(key, idx),
          // headerName: key[idx],
          sortable: true,
          width: 300,
          editable: false,
          hide: false,
          // headerAlign: 'center',
        }
      }else{

        return {
          field: val,
          headerName: HeaderFilter(key, idx),
          // headerName: key[idx],
          sortable: true,
          width: 150,
          editable: false,
          hide: false,
          // headerAlign: 'center',
        }
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