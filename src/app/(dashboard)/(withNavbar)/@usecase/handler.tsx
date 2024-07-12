'use server'

import { apiRequest } from "@/config/api";
import { getCurrentUser } from "@/helpers/tokenChecker";
import { cookies } from "next/headers";


export interface IRejectedPr {
  [id: string]: string;
  note: string;
}

export const RejectDoc = async (url:string, payload: IRejectedPr) => {
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const result = await apiRequest.v1.patch(url, payload, {
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  console.log('REjected doc >>', result.data)
  return result.data

}
