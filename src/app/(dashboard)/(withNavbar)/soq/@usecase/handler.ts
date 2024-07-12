'use server'
import { getCurrentUser } from "@/helpers/tokenChecker"
import { HeaderFilter } from "../../(master)/@usecase";
import moment from "moment-timezone";
import { TInitialData } from "../../@interface";
import { cookies } from "next/headers";
import { apiRequest } from "@/config/api";
import { convertToCapitalcase } from "@/helpers/converterHelper";

export interface IPayloadApproveSoq{
  soq_id: string
}
export const ApproveSoq = async (payload: IPayloadApproveSoq) =>{
  await getCurrentUser()

  console.log('payload data >>', payload)
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.post('/po-create',payload, {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  console.log('data result data >>>', result)
  return result.data
}



export interface IParamsGet{
  page?: number;
  limit?: number;
}
export const getSoqData = async ({page=1, limit=10} :IParamsGet)=>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.get('/get-all-soq', {
    params: {
      page,
      limit
    },
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })

  console.log('RESULT DATA >>', result.data.data)
  let columns : TInitialData['columns'] = [];
  let rows : TInitialData['rows'] = [];
  if(result.data.data.length){
    const key = Object.keys(result.data.data[0]).filter((keyData: string)=>keyData !== 'depts' && keyData !== 'list_of_items' && keyData !== 'dept_id' && keyData !== 'qty_on_hand' && keyData !== 'msr_index' && keyData !== 'MsrIndex' && keyData !== 'work_location' && keyData !== 'id' && keyData !== 'suggest_supplayer' && keyData !== 'updated_at' && keyData !== 'listOfItemVendor' && keyData !== 'prData' )
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
          width: 160,
          editable: false,
          hide: false,
          // headerAlign: 'center',
        }
      }
    })
      columns.push({
        field: 'prNumber',
        headerName: 'PR Number',
        sortable: true,
        width: 160,
        editable: false,
        hide: false
      })
          rows= result.data.data.map(row => {
            return {
                ...row,
                prNumber: row.prData.prNumber,
                status: convertToCapitalcase(row.status),
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