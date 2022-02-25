import { HttpProviderOptions } from 'web3-core-helpers'
import Web3 from 'web3'

const node = process.env.REACT_APP_NODE!

const httpProvider = new Web3.providers.HttpProvider(node, {
  timeout: 10000,
} as HttpProviderOptions)

export const getWeb3 = () => new Web3(httpProvider)
