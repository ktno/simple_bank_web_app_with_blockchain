import { ConnectorNames } from '../types/ConnectorNames'

export interface ProfileState {
  account: string | null
  isLoggedIn: ConnectorNames | null
}

export interface State {
  profile: ProfileState
}
