import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectorNames } from '../../types/ConnectorNames'
import { ProfileState } from '../types'

const initialState: ProfileState = {
  isLoggedIn: null,
  account: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoggedIn: (
      state,
      action: PayloadAction<{
        loginType: ConnectorNames
        account: string
      }>
    ) => {
      state.isLoggedIn = action.payload.loginType
      state.account = action.payload.account
    },
    logout: (state) => {
      state.isLoggedIn = null
      state.account = null
    },
  },
})

export const { setLoggedIn, logout } = profileSlice.actions
export default profileSlice.reducer
