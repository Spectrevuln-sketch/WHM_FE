'use server'
import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";
import { ColumnTable, TInitialData } from "../../@interface";
import { HeaderFilter } from "../../@usecase";
import { getCurrentUser } from "@/helpers/tokenChecker";


export const GetAllMasterBudget = async () =>{
    await getCurrentUser()
    const token = cookies().get('token')?.value;
    const result = await apiRequest.v1.get('/budgetCode',{
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
}


// Create Budget code
export const create = async ()=>{
  console.log('createing budget code')
}