"use client";
import React, { useEffect, useState } from "react";
import { SigninHandler } from "./handler";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { setCurrentUserLogin } from "@/store/users/slice";
import { getCurrentUser } from "@/helpers/tokenChecker";

export type IPayload = {
  login:{
    [key :string]: string;
    // password: string;
  },
  initial:{
    lang: string;
    disabledButton: boolean;
  }
}
export interface HILogin {
  handleClickSignIn : (payload: IPayload['login']) => void;
  payload: IPayload['login'];
  initialState :IPayload['initial'];
  setInitalState: React.Dispatch<IPayload['initial']>;
  setPayload: React.Dispatch<IPayload['login']>;
  handleClickPrivacyPolicy: () => void;
}


export const useLogin = () : HILogin =>{
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [initialState, setInitalState] = useState({
    lang: 'en',
    disabledButton: true,
  })
  const [payload, setPayload] = useState<IPayload['login']>({
    username: '',
    password: ''
  });

  const handleClickSignIn = async (payload: IPayload['login']) => {
    const login = await SigninHandler(payload);
    if (login.responseCode === '99')
      return alert(login.responseMessage);
    const getUsers = await getCurrentUser();
    dispatch(setCurrentUserLogin({
      ...getUsers.data
    }))
    return await router.replace('/dashboard');
  }

  const checkForm = () => {
    for ( const key in payload ) {
      if (payload[key] !== ''){
        return setInitalState({
          ...initialState,
          disabledButton: false
        });
      }
        return setInitalState({
          ...initialState,
          disabledButton: true
        });
    }
  }

  const handleClickPrivacyPolicy = () => {
    console.log('privacy policy clicked')
  }

 useEffect(() => {
    checkForm()
  }, [payload])

  return {
    payload,
    initialState,
    setPayload,
    setInitalState,
    handleClickPrivacyPolicy,
    handleClickSignIn,

  }
}
