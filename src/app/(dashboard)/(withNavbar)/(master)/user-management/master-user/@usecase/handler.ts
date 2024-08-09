import { apiRequest } from "@/config/api";
import { cookies } from "next/headers";




export const getMasterUser = async() =>{
    const token = cookies().get('token')?.value;
    const result = apiRequest.v1.get('/')
}