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