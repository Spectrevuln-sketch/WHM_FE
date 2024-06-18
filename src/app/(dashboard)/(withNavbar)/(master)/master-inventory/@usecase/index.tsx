"use client"
import React, { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { TInitialData } from "../../@interface"
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator"
import { getCurrentUser } from "@/helpers/tokenChecker"
import { UploadFile } from "../../@usecase"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { AxiosResponse } from "axios"
export interface IPayload {
  [type: string]: File[]
}
export interface IComponents {
  filterModal: boolean
}

export interface IReturn {
  router: AppRouterInstance
  ImportInventory: () =>void
  payload: IPayload
  setPayload: Dispatch<SetStateAction<IPayload>>
  components: IComponents
  setComponents: Dispatch<SetStateAction<IComponents>>
}


export const useMasterInventory = ():IReturn => {
  const router = useRouter()
  const initialState : IPayload={
    file: []
  }
  const utilsState: IComponents ={
    filterModal : false
  }
  const [payload, setPayload] = useState(initialState)
  const [components, setComponents] = useState(utilsState)



  const ImportInventory = async () =>{
  try{
    await getCurrentUser()
    const url = '/import-master-inv'
    await UploadFile({url, payload})
    window.location.reload()
  }catch(err){
    alert("Gagal Import Data Silahkan Coba Kembali")
  }
  }
  return {
    router,
    ImportInventory,
    payload,
    setPayload,
    components,
    setComponents
  }
}

