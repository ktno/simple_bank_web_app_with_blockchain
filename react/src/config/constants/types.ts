export interface Address {
  [key: string]: string | undefined
}

export interface Token {
  symbol: string
  address: Address
  decimals: number
}

export interface TokenList {
  simpleToken: Token
}

export interface Bank {
  token: Token
  contractAddress: {
    [key: string]: string | undefined
  }
}
