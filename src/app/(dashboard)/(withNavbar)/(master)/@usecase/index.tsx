import { apiRequest } from "@/config/api"
import { getToken } from "./handler"
export const HeaderFilter = (key: string[], idx: number) =>{
  switch(key[idx]){
    case 'coa_id':
      return key[idx] = 'COA NUMBER'
    case 'ProductCode':
      return key[idx] = 'PRODUCT CODE'
    case 'PurchasePrice':
      return key[idx] = 'PURCHASE PRICE'
    case 'YearOfLastPurchase':
        return key[idx] = 'YEAR OF LAST PURCHASE'
    default:
          return key?.[idx]?.toUpperCase()?.replaceAll("_", " ")
  }
}

export interface IProps {
  url: string;
  payload: {
    files : File[]
  }
}
export const UploadFile = async ({url, payload}:IProps)=>{
  const token = await getToken()
    const res = await apiRequest.v1.post(url, {
      file : payload.files[0]
    },{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
}