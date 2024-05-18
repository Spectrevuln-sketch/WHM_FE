'use server'

import { apiRequest } from "@/config/api";
import { IPayload } from ".";
import { cookies } from 'next/headers'

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
  } catch (err) {
    console.log(err);
    return {
      responseCode: '99',
      responseMessage: 'Filed Login'
    }
  }
}

