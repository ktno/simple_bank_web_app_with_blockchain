import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'
import { State } from './types'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useIsLoggedIn = () => {
  return useSelector((state: State) => state.profile.isLoggedIn)
}

export const useAccount = () => {
  return useSelector((state: State) => state.profile.account)
}
