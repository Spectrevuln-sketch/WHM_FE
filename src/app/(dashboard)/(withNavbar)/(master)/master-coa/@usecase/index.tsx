'use client'

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { UploadFile } from "../../@usecase"
import { getCurrentUser } from "@/helpers/tokenChecker"
import CustomTextButton from "@/components/buttons/CustomTextButton"
import { DeleteForever, EditNoteOutlined } from "@mui/icons-material"
import { blue, red } from "@mui/material/colors"
import { TInitialData } from "../../@interface"
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator"
import { getMasterCoa } from "./handler"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export interface IPayload {
  [type: string]: File[]
}

export interface IComponents{
  filterModal: boolean
}

export interface IReturn {
  router: AppRouterInstance,
  ImportCoa: ()=> void
  fetchData:()=> void
  setData: React.Dispatch<React.SetStateAction<TInitialData | DemoTreeDataValue>>,
  data: TInitialData | DemoTreeDataValue
  payload: IPayload,
  setPayload: React.Dispatch<React.SetStateAction<IPayload>>,
  components: IComponents,
  setComponents:React.Dispatch<React.SetStateAction<IComponents>>
}

export const useMasterCoa = ()=>{
  const router = useRouter()
  const initialState : IPayload={
    xlsx:[]
  }
  const utilsState: IComponents ={
    filterModal : false
  }
  const [payload, setPayload] = useState(initialState)
  const [components, setComponents] = useState(utilsState)


  const ImportCoa = async () =>{
    try{
      await getCurrentUser()
      const url = '/import-master-coa'
      const res = await UploadFile({url, payload})
      if(res.status === 400)
        return alert(res.data.message)
      window.location.reload()
    }catch(err){
      if(err.response)
        return alert(err.response.data.message)
      return alert("Gagal Import Data Silahkan Coba Kembali")
    }
  }


    return {
      router,
      ImportCoa,
      payload,
      setPayload,
      components,
      setComponents
    }
  }