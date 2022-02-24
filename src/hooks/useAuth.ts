import { useCallback } from 'react'
import Web3 from 'web3'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { useAppDispatch } from '../state'
import { logout, setLoggedIn } from '../state/actions'
import { ConnectorNames } from '../types/ConnectorNames'
import { setupNetwork } from '../utils/setupNetwork'
import { connectorsByName } from '../utils/web3React'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const dispatch = useAppDispatch()
  const handleLogout = useCallback(() => {
    deactivate()
    dispatch(logout())
  }, [deactivate, dispatch])

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      let isError = false
      const connector = connectorsByName[connectorID]
      if (connector) {
        activate(connector, async (error: Error) => {
          isError = true
          dispatch(logout())
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              await activate(connector)
            }
          } else {
            if (error instanceof NoEthereumProviderError) {
              alert('No provider was found')
            } else if (error instanceof UserRejectedRequestErrorInjected) {
              alert('Please authorize to access your account')
            } else {
              alert(error.message)
            }
          }
        }).then(async () => {
          if (!isError) {
            try {
              const provider = await connector?.getProvider()
              const web3 = new Web3(provider)
              const account = (await web3.eth.getAccounts())[0]
              dispatch(
                setLoggedIn({
                  loginType: connectorID,
                  account,
                })
              )
            } catch (e: any) {
              handleLogout()
            }
          }
        })
      } else {
        alert('The connector config is wrong')
      }
    },
    [activate, dispatch, handleLogout]
  )
  return { login, logout: handleLogout }
}

export default useAuth
