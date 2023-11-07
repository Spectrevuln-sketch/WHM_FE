import { generateApiRequest } from "@/helpers/apiRequest";

export const apiRequest = {
  v1: generateApiRequest(process.env.NEXT_PUBLIC_URL_V1!)
}