"use client"

import { Dispatch, SetStateAction,  useState } from "react";
import { getCurrentUser } from "@/helpers/tokenChecker";
import { UploadFile } from "../../@usecase";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export interface IPayload {
  files : File[]
}
export interface IComponents {
  filterModal: boolean
}

export interface IReturn {
  payload: IPayload
  setPayload: Dispatch<SetStateAction<IPayload>>
  // ImportVendor : () =>void
  createNewSoq: () => void
  setComponents: Dispatch<SetStateAction<IComponents>>
  components: IComponents
  router : AppRouterInstance
}

export const useSoq = (): IReturn =>{
  const router = useRouter()
  const initialState : IPayload={
    files: []
  }
  const utilsState: IComponents ={
    filterModal : false
  }
  const [payload, setPayload] = useState(initialState)
  const [components, setComponents] = useState(utilsState)
  // const ImportVendor = async () =>{
  //   await getCurrentUser()
  //   const url = '/import-master-vendor'
  //   const res = await UploadFile({url, payload})
  //   router.refresh()
  //   return res
  // }
  const createNewSoq = async () =>{
    console.log('SOQ Create')
  }
  return {
    payload,
    setPayload,
    // ImportVendor,
    createNewSoq,
    setComponents,
    components,
    router

  }
}
