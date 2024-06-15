"use server"

import { apiRequest } from "@/config/api"
import { getCurrentUser } from "@/helpers/tokenChecker";
import { cookies } from "next/headers";
import { MaterialServiceItemInterface } from "../page";

interface Department {
  id: string;
  created_at: string;
  updated_at: string;
  dept_name: string;
}

interface Item {
  qty_on_hand: number;
  qty: number;
  uom: string;
  description: string;
  requested_by: string;
  purpose: string;
  product_code: string;
}

export interface Msr {
  id: string;
  created_at: string;
  updated_at: string;
  MsrIndex: number;
  msr_number: string;
  work_location: string;
  dept_id: string;
  depts: Department;
  project_code: string;
  delivered_at: string;
  status: string;
  qty_on_hand: string;
  list_of_items: MaterialServiceItemInterface[];
  urgentcy: string;
}


export const getCurrentMsr = async (id: string):Promise<Msr>=>{
  await getCurrentUser()
  const token = cookies().get('token')?.value;
  const request = await apiRequest.v1.get(`/current-msr/${id}`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return {
    ...request.data.data,
    list_of_items: JSON.parse(request.data.data.list_of_items)
  }
}