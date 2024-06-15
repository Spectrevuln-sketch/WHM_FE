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
    let columns : TInitialData['columns'] = [];
    let rows : TInitialData['rows'] = [];
    if(result.data.data.length){
      const key = Object.keys(result.data.data[0]).filter((keyData: string)=>keyData !== 'coa')
      console.log('data key >>', key)
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
}


// Create Budget code
export const create = async ()=>{
  console.log('createing budget code')
}