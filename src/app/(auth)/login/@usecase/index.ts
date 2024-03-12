import { apiRequest } from "@/config/api";
import React, { useEffect, useState } from "react";

type IPayload = {
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
  const [initialState, setInitalState] = useState({
    lang: 'en',
    disabledButton: true,
  })
  const [payload, setPayload] = useState<IPayload['login']>({
    username: '',
    password: ''
  });

  const handleClickSignIn = async (payload: IPayload['login']) => {
    try {
      const response = await apiRequest.v1.post('/v1/login', payload);
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
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
