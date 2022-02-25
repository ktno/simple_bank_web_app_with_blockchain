import { BigNumber } from 'bignumber.js'
import { ConnectorNames } from '../types/ConnectorNames'

export interface ProfileState {
  loading: boolean
  account: string | null
  isLoggedIn: ConnectorNames | null
  allowance: BigNumber
}

export interface BankState {
  loading: boolean
  data: {
    balance: BigNumber
    total: BigNumber
  }
}

export interface State {
  profile: ProfileState
  bank: BankState
}
