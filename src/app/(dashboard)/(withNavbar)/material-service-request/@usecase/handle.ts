'use server'

import { apiRequest } from "@/config/api";
import { Dayjs } from "dayjs";
import moment from "moment-timezone";
import { cookies } from "next/headers";
import { TInitialData } from "../../@interface";
import { HeaderFilter } from "../../(master)/@usecase";
import { getCurrentUser } from "@/helpers/tokenChecker";
import { convertToCapitalcase } from "@/helpers/converterHelper";

export interface SelectedMaterialServiceInterface{
  isManual?: boolean;
  qty: number;
  uom: string;
  name: string;
  reqBy: string;
  purpose: string;
  coaCode?: string;
  groupCode?: string;
  productCode?: string;
}

export interface IPayload {
  msr_number: string;
  work_location: string;
  vessel: string;
  project_code: string;
  deliveryDate: string | Dayjs;
  urgency: string;
  suggestedSupplier: string;
  notes: string;
  acknowledgement: string;
  attachment?: File;
}
export interface IPayloadPr{
  msrId: string;
  qty: number;
  description: string;
  uom: string;
  supplayerID: string;
}
export interface IRequest {
  date_time: string | Dayjs;
  dept_id: string;
  urgentcy: string;
  suggestedSupplier: string;
  // list_of_items: {
  //   description: string;
  //   product_code: string;
  //   purpose: string;
  //   qty: number;
  //   qty_on_hand: number;
  //   requested_by: string;
  //   uom: string;
  // }[];
  list_of_items: SelectedMaterialServiceInterface[];
  msr_number: string;
  project_code: string;
  status: string;
  work_location: string;
}
export interface IParamsGet{
  page?: number;
  limit?: number;
}
export const getUomQty = async () => {
  await getCurrentUser()
  try {
    const token = cookies().get('token')?.value;
    const resUom = await apiRequest.v1.get('/uoms', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    return resUom.data
  } catch (err:any) {
    return err.response.datas
  }
}

export const getDepartament = async () =>{
  await getCurrentUser()
  const token =  cookies().get('token')?.value
  const depts = await apiRequest.v1.get('/depts',{
    headers :{
      'Authorization': 'Bearer ' + token
    }
  })
  return depts.data
}

export const getSupplyer = async () =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value
  const supplyer = await  apiRequest.v1.get('/vendors',{
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  return supplyer.data
}

export const getGroupCode = async () =>{
  await getCurrentUser()
  const token =cookies().get('token')?.value
  const groupCodes = await apiRequest.v1.get('/groupcodes', {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  return groupCodes.data
}
export const getStatusMsr = async () =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;

  const statusMsr = await apiRequest.v1.get('/get-status-msr', {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  return statusMsr.data
}

// global update status
export const updateStatusDoc = async (url: string, id: string) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.patch(`${url}/${id}`,{},{
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  console.log('result.data\n\n',result.data)
  return  result.data
}


export const updateStatus = async (id: string) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.patch(`/update-status-msr/${id}`,{},{
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  return  result.data
}


export const getMsr = async ({page=1, limit=10} :IParamsGet) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.get('/get-all-msr', {
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
    const key = Object.keys(result.data.data[0]).filter((keyData: string)=>keyData !== 'depts' && keyData !== 'list_of_items' && keyData !== 'dept_id' && keyData !== 'qty_on_hand' && keyData !== 'msr_index' && keyData !== 'MsrIndex' && keyData !== 'work_location' && keyData !== 'id' && keyData !== 'suggest_supplayer' && keyData !== 'updated_at' )
    columns = key.map((val, idx)=>{

      return {
        field: val,
        headerName: HeaderFilter(key, idx),
        // headerName: key[idx],
        sortable: true,
        width: 120,
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


export interface AccountData {
  resp_code: string;
  data: Account[];
}

interface Account {
  id: string;
  created_at: string;
  updated_at: string;
  coa_name: string;
  coa_code: string;
}
// Get Coa Code
export const getCoaCodes = async (): Promise<AccountData> => {
  await getCurrentUser()
  const token = cookies().get('token')?.value

  const coaCodes = await apiRequest.v1.get('/coas',{
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  return coaCodes.data

}



// Create MSR
export const createMsr = async (payload: IRequest) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  try {
    const newCoa = await apiRequest.v1.post('/create-msr', payload, {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    return newCoa.data
  } catch (err: any) {
    return err.response.data
  }

}


export interface IPayloadApproveMsr{
  msrId: string
}
// Approve MSR
export const ApproveMsr = async (payload: IPayloadApproveMsr) =>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.post('/purchase-request',payload, {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  console.log('resultDAta >>',  result)
}