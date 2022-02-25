import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { ConnectorNames } from '../../types/ConnectorNames'
import { getAllowance } from '../../utils/callHelpers'
import { ProfileState } from '../types'

const initialState: ProfileState = {
  loading: false,
  isLoggedIn: null,
  account: null,
  allowance: new BigNumber(0),
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
  extraReducers: ({ addCase }) => {
    addCase(getAllowanceThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(getAllowanceThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(getAllowanceThunk.fulfilled, (state, action) => {
      state.allowance = action.payload.allowance
      state.loading = false
    })
  },
})

export const getAllowanceThunk = createAsyncThunk(
  'bank/getAllowance',
  async ({
    contract,
    account,
    spender,
  }: {
    contract: any
    account: string
    spender: string
  }) => {
    const allowance = await getAllowance(contract, account, spender)
    return {
      allowance: new BigNumber(allowance / 10 ** 18),
    }
  }
)

export const { setLoggedIn, logout } = profileSlice.actions
export default profileSlice.reducer
