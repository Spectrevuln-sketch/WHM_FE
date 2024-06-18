"use client"

import { Dispatch, SetStateAction,  useState } from "react";
import { getCurrentUser } from "@/helpers/tokenChecker";
import { UploadFile } from "../../@usecase";
import { useRouter } from "next/navigation";
export interface IPayload {
  [type: string]: File[]
}
export interface IComponents {
  filterModal: boolean
}

export interface IReturn {
  payload: IPayload
  setPayload: Dispatch<SetStateAction<IPayload>>
  ImportVendor : () =>void
  setComponents: Dispatch<SetStateAction<IComponents>>
  components: IComponents
}

export const useMasterVendorV2 = (): IReturn =>{
  const router = useRouter()
  const initialState : IPayload={
    file: []
  }
  const utilsState: IComponents ={
    filterModal : false
  }
  const [payload, setPayload] = useState(initialState)
  const [components, setComponents] = useState(utilsState)
  const ImportVendor = async () =>{
    try{
    await getCurrentUser()
    const url = '/import-master-vendor'
    await UploadFile({url, payload})
    window.location.reload()
  }catch(err){
    alert("Gagal Import Data Silahkan Coba Kembali")
  }
  }
  return {
    payload,
    setPayload,
    ImportVendor,
    setComponents,
    components

  }
}
