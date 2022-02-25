import tokens from './tokens'
import { Bank } from './types'

const bank: Bank = {
  token: tokens.simpleToken,
  contractAddress: {
    97: '0x07CEbC7Fd86Fffcb3557852Cc3B764FAa1b3A000',
    1337: process.env.REACT_APP_LOCAL_SIMPLE_BANK_CONTRACT_ADDRESS,
  },
}

export default bank
