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