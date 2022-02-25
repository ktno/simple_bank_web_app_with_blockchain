import { useMemo } from 'react'
import { ContractNames } from '../types/ContractNames'
import { TokenNames } from '../types/TokenNames'
import { getContract, getTokenContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

export const useContract = (contractName: ContractNames) => {
  const web3 = useWeb3()
  return useMemo(() => getContract(contractName, web3), [contractName, web3])
}

export const useTokenContract = (tokenName: TokenNames) => {
  const web3 = useWeb3()
  return useMemo(() => getTokenContract(tokenName, web3), [tokenName, web3])
}
