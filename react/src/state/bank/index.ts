import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { BankState } from '../types'
import {
  deposit,
  getBalance,
  getTotal,
  transfer,
  approve,
  withdraw,
} from '../../utils/callHelpers'

const initialState: BankState = {
  loading: false,
  data: {
    balance: new BigNumber(0),
    total: new BigNumber(0),
  },
}

export const BankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getBalanceThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(getBalanceThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(getBalanceThunk.fulfilled, (state, action) => {
      state.data = { ...state.data, ...action.payload }
      state.loading = false
    })
    addCase(getTotalThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(getTotalThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(getTotalThunk.fulfilled, (state, action) => {
      state.data = { ...state.data, ...action.payload }
      state.loading = false
    })
    addCase(depositThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(depositThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(depositThunk.fulfilled, (state, action) => {
      state.loading = false
    })
    addCase(withdrawThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(withdrawThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(withdrawThunk.fulfilled, (state, action) => {
      state.loading = false
    })
    addCase(transferThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(transferThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(transferThunk.fulfilled, (state, action) => {
      state.loading = false
    })
    addCase(approveThunk.pending, (state, action) => {
      state.loading = true
    })
    addCase(approveThunk.rejected, (state, action) => {
      state.loading = false
    })
    addCase(approveThunk.fulfilled, (state, action) => {
      state.loading = false
    })
  },
})

export const getBalanceThunk = createAsyncThunk(
  'bank/getBalance',
  async ({ contract, account }: { contract: any; account: string }) => {
    const balance = await getBalance(contract, account)

    return {
      balance: new BigNumber(balance / 10 ** 18),
    }
  }
)

export const getTotalThunk = createAsyncThunk(
  'bank/getTotal',
  async (contract) => {
    const total = await getTotal(contract)

    return {
      total: new BigNumber(total / 10 ** 18),
    }
  }
)

export const depositThunk = createAsyncThunk(
  'bank/deposit',
  async ({
    contract,
    account,
    amount,
  }: {
    contract: any
    account: string
    amount: string
  }) => {
    await deposit(contract, account, amount)
  }
)

export const withdrawThunk = createAsyncThunk(
  'bank/withdraw',
  async ({
    contract,
    account,
    amount,
  }: {
    contract: any
    account: string
    amount: string
  }) => {
    await withdraw(contract, account, amount)
  }
)

export const transferThunk = createAsyncThunk(
  'bank/transfer',
  async ({
    contract,
    account,
    to,
    amount,
  }: {
    contract: any
    account: string
    to: string
    amount: string
  }) => {
    await transfer(contract, account, to, amount)
  }
)

export const approveThunk = createAsyncThunk(
  'bank/approve',
  async ({
    contract,
    account,
    spender,
    allowance,
  }: {
    contract: any
    account: string
    spender: string
    allowance: string
  }) => {
    await approve(contract, account, spender, allowance)
  }
)

export default BankSlice.reducer
