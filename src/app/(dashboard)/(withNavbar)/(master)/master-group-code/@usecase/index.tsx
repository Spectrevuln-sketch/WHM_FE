import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { TInitialData } from "../../@interface"
import { DemoTreeDataValue } from "@mui/x-data-grid-generator/services/tree-data-generator"
import { useState } from "react"
import { getCurrentUser } from "@/helpers/tokenChecker"
import { UploadFile } from "../../@usecase"
export interface IPayload {
  [type: string]: File[]
}

export interface IComponents{
  filterModal: boolean
}

export interface IReturn {
  router: AppRouterInstance,
  ImportGroupCode: ()=> void
  fetchData:()=> void
  setData: React.Dispatch<React.SetStateAction<TInitialData | DemoTreeDataValue>>,
  data: TInitialData | DemoTreeDataValue
  payload: IPayload,
  setPayload: React.Dispatch<React.SetStateAction<IPayload>>,
  components: IComponents,
  setComponents:React.Dispatch<React.SetStateAction<IComponents>>
}
export const useMasterGroupCode = () =>{
  const router = useRouter()
  const initialState : IPayload={
    xlsx:[]
  }
  const utilsState: IComponents ={
    filterModal : false
  }
  const [payload, setPayload] = useState(initialState)
  const [components, setComponents] = useState(utilsState)


  const ImportGroupCode = async () =>{
    try{
      await getCurrentUser()
      const url = '/import-master-groupcode'
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
      ImportGroupCode,
      payload,
      setPayload,
      components,
      setComponents
    }
}