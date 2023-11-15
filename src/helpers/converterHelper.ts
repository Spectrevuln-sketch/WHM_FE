import { SelectOption } from "@/components/inputs/CustomSelect";
import { ProductInterface, UomInterface } from "@/components/modals/AddMsrProductModal";

export const convertProductToSelect = (input: ProductInterface[]): SelectOption[] => {
  return input.map(product => ({value: product.id, label: product.name}))
}
export const convertUomToSelect = (input: UomInterface[]): SelectOption[] => {
  return input.map(uom => ({value: uom.id, label: uom.name}))
}