import { TokenList } from './types'

const tokens: TokenList = {
  simpleToken: {
    symbol: 'ST',
    decimals: 18,
    address: {
      97: '0xD05C072B71687514DeBaf7c8282447377436b433',
      1337: process.env.REACT_APP_LOCAL_SIMPLE_TOKEN_ADDRESS,
    },
  },
}

export default tokens
