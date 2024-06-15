'use server'

import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";
interface IPorp{
  handlerUpload:{
    endpoint: string
    payload:{
      files: any[]
    }
  }
}
export const UploadFileExcel = async({endpoint, payload}: IPorp["handlerUpload"])=>{
  const token = await cookies().get('token')?.value;

  const res = await apiRequest.v1.post(endpoint, {
    file : payload.files[0]
  },{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  return res
}

export const getToken = () =>{
  return cookies().get('token')?.value;
}