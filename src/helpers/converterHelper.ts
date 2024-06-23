import { SelectOption } from "@/components/inputs/CustomSelect";
import { ProductInterface, UomInterface } from "@/components/modals/AddMsrProductModal";

export const convertProductToSelect = (input: ProductInterface[]): SelectOption[] => {
  return input?.map(product => ({value: product.id, label: product.ItemName}))
}
export const convertUomToSelect = (input: UomInterface[]): SelectOption[] => {
  return input?.map(uom => ({value: uom.id, label: uom.name}))
}
export const convertCoaCodeToSelect = (input: any[]): SelectOption[] => {
  return input?.map(coa => ({value: coa.id, label: coa.coa_name}))
}
export const convertToSelect = (input: any[], filter:string[]): SelectOption[] => {
  return input?.map(data => ({value: data[filter[0]], label: data[filter[1]]}))
}
export const convertToCapitalcase = (text: string): string =>{
  if (typeof text !== 'string') return ''
  // change string  uppercase to capital
  const capitalCase =  text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
  return capitalCase.replaceAll("_", " ")
}

export const convertToUpperSnakeCase = (str: string) =>{
  return str
    .toUpperCase()                // Convert the string to uppercase
    .replace(/\s+/g, '_');        // Replace spaces with underscores
}