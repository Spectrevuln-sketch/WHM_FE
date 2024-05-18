'use server'

import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";


export const getMasterInventory =  async ()=>{
  try {
    const token = cookies().get('token')?.value;
    const result = await apiRequest.v1.get('/inventory', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    return result.data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
}