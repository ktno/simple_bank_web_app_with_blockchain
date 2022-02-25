import { TokenList } from './types'

const tokens: TokenList = {
  simpleToken: {
    symbol: 'ST',
    decimals: 18,
    address: {
      97: '',
      1337: process.env.REACT_APP_LOCAL_SIMPLE_TOKEN_ADDRESS,
    },
  },
}

export default tokens
