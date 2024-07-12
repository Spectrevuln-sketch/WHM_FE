'use server'

import { apiRequest } from "@/config/api";
import { getCurrentUser } from "@/helpers/tokenChecker";
import { cookies } from "next/headers";

export const getCurrentMsr = async (id: string):Promise<Msr>=>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const request = await apiRequest.v1.get(`/current-msr/${id}`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return {
    ...request.data.data,
    list_of_items: JSON.parse(request.data.data.list_of_items)
  }
}