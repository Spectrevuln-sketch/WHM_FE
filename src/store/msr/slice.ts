import { AccountData } from '@/app/(dashboard)/(withNavbar)/material-service-request/@usecase/handle'
import { ProductInterface } from '@/components/modals/AddMsrProductModal'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IState {
 selected : {
  uoms: [],
  product: ProductInterface[],
  statusMsr: [],
  coaCodes: AccountData['data'],
  groupCodes: [],
  depts: [],
  supplyer: [],
 }
}

const initialState: IState = {
  selected : {
    uoms: [],
    product: [],
    statusMsr: [],
    coaCodes: [],
    groupCodes: [],
    depts:[],
    supplyer: [],
   }
}

export const MsrSlices = createSlice({
  name: 'msr',
  initialState,
  reducers: {
    setSelectedInput: (state, action: PayloadAction<IState['selected']>) =>{
      state.selected = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedInput } = MsrSlices.actions

export default MsrSlices.reducer