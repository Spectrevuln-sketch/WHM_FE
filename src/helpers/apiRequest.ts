import axios from "axios";


export const generateApiRequest = (endpointMenu: string) => {
  return axios.create({
    baseURL: endpointMenu,
    headers: {
      // 'Content-Security-Policy': 'default-src https:',
      'accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
  });
};