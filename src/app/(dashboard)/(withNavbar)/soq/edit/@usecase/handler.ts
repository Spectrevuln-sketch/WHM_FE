import { apiRequest } from "@/config/api"


export interface  IPortResponse {
  currentSoq : ''
}

interface IPortCurrentSoq {

}

export const PortCurrentSoq = async () =>{
  const res = apiRequest.v1.get('')
  console.log('data res', res)
}