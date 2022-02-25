import tokens from './tokens'
import { Bank } from './types'

const bank: Bank = {
  token: tokens.simpleToken,
  contractAddress: {
    97: '0xb5a1e45fA3e50D1C9d91d3d5A90aCB62D4acC314',
    1337: process.env.REACT_APP_LOCAL_SIMPLE_BANK_CONTRACT_ADDRESS,
  },
}

export default bank
