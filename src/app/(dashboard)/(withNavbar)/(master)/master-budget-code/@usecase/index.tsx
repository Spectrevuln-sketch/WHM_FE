"use client"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getCurrentUser } from "@/helpers/tokenChecker"
import { UploadFile } from "../../@usecase"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { AxiosResponse } from "axios"
import CustomTextButton from "@/components/buttons/CustomTextButton"
import { DeleteForever, EditNoteOutlined } from "@mui/icons-material"
import { blue, red } from "@mui/material/colors"
import { GetAllMasterBudget } from "./handler"
import { TInitialData } from "../../@interface"
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator"
export interface IPayload {
  files : File[]
}
export interface IComponents {
  filterModal: boolean
}

export interface IReturn {
  router: AppRouterInstance
  data: TInitialData | DemoTreeDataValue,
  setData : Dispatch<SetStateAction<TInitialData | DemoTreeDataValue>>
  ImportBudgetCode: () => Promise<void>
  payload: IPayload
  setPayload: Dispatch<SetStateAction<IPayload>>
  components: IComponents
  setComponents: Dispatch<SetStateAction<IComponents>>
}


export const useMasterBudgetCode = ():IReturn => {
  const router = useRouter()
  const initialState : IPayload={
    files: []
  }
  const utilsState: IComponents ={
    filterModal : false
  }
  const [payload, setPayload] = useState(initialState)
  const [components, setComponents] = useState(utilsState)
  const [data, setData] = useState<TInitialData | DemoTreeDataValue>({
    columns: [],
    initialState:{
      columns:{
        columnVisibilityModel:{
          id: false
        }
      }
    },
    rows: []
  })

  const fetchData = async () => {
    const res = await GetAllMasterBudget();
    if (res === undefined){
      return setData({
        columns: [],
        initialState:{
          columns:{
            columnVisibilityModel:{
              id: false
            }
          }
        },
        rows: []
      })
    }
    res?.columns?.push({
      field: "action",
      headerName: 'ACTIONS',
      sortable: false,
      width: 160,
      editable: false,
      hide: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div>
            <CustomTextButton icon={<DeleteForever/>} color={red[300]} isDisabled={false} onClick={()=> console.log('Delete')}/>
            <CustomTextButton icon={<EditNoteOutlined/>} color={blue[300]} isDisabled={false} onClick={()=> console.log('Edit')}/>
          </div>
        );
      }
    });
    setData({
      columns: res?.columns,
      initialState:{
        columns:{
          columnVisibilityModel:{
            id: false,
          }
        }
      },
      rows: res?.rows,
    })
  };

  useEffect(() => {
    fetchData();
  }, []);


  const ImportBudgetCode = async () =>{
    await getCurrentUser()
    const url = '/import-master-budgetcode'
    await UploadFile({url, payload})
    fetchData()
    setComponents({...components, filterModal: !components.filterModal})
  }

  return {
    router,
    data,
    setData,
    ImportBudgetCode,
    payload,
    setPayload,
    components,
    setComponents
  }
}

