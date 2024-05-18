'use server';

import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser =  async () => {
  try {
    const token = cookies().get('token')?.value;
    // Check token to be valid
    const userToken = await apiRequest.v1.get('/token-check', {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    return {
      responseCode : '00',
      responseDescription: 'user token is valid',
      data: userToken.data
    }
  } catch (err: any) {
    cookies().delete('token')
    return redirect('/')
    return {
      responseCode : '99',
      responseDescription: err.response.data.message,
      error: err.response.data
    }
  }
}