import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IState {
  value: number
  currentUser: {
      data: any;
      id: string;
      fullname: string;
      username: string;
      email: string;
      phone: string;
      dept_id: string;
      depts: {
          id: string;
          updated_at: string;
          dept_name: string;
      };
      role_id: string;
      roles: {
          id: string;
          updated_at: string;
          name: string;
      };
  }
}

const initialState: IState = {
  value: 0,
  currentUser: {
      id: '',
      fullname: '',
      username: '',
      email: '',
      phone: '',
      dept_id: '',
      depts: {
          id: '',
          updated_at: '',
          dept_name: '',
      },
      role_id: '',
      roles: {
          id: '',
          updated_at: '',
          name: '',
      },
  }
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserLogin : (state, action: PayloadAction<IState['currentUser']>) =>{
      state.currentUser = action.payload
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setCurrentUserLogin } = userSlice.actions

export default userSlice.reducer