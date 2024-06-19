'use server'

import { apiRequest } from "@/config/api";
import { IPayload } from ".";
import { cookies } from 'next/headers'
import { IError } from "@/helpers/interface/global.interface";
import { AnyAaaaRecord } from "dns";

export const SigninHandler = async (payload: IPayload['login']) =>{
  try {
    const response = await apiRequest.v1.post('/login', payload);
    cookies().set('token', response.data.token, {
      maxAge: Date.now() * 60 * 60,
      httpOnly: true
    })
    return {
      responseCode: '00',
      responseMessage: 'Success Login'
    }
  } catch (err: any) {
    return {
      responseCode: '99',
      responseMessage: err?.response?.data?.message
    }
  }
}

