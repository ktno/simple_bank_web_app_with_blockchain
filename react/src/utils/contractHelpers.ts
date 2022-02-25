import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { getWeb3 } from './web3'
import { ContractNames } from '../types/ContractNames'
import { TokenNames } from '../types/TokenNames'

const _getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? getWeb3()
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}

export const getContract = (contractName: ContractNames, web3?: Web3) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const abi = require(`../config/abi/${contractName}.json`)
  const contract = require(`../config/constants/${contractName}`).default
  const contractAddress = contract['contractAddress'][chainId!]
  return _getContract(abi, contractAddress, web3)
}

export const getTokenContract = (tokenName: TokenNames, web3?: Web3) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const abi = require(`../config/abi/${tokenName}.json`)
  const tokens = require('../config/constants/tokens').default
  const tokenAddress = tokens[tokenName]['address']![chainId!]
  return _getContract(abi, tokenAddress!, web3)
}
