export const approve = async (
  contract: any,
  account: string,
  spender: string,
  allowance: string
) => {
  const gasPrice = 5000000000
  try {
    const tx = await contract.methods.approve(spender, allowance).send({
      from: account,
      gasPrice,
    })
    return tx
  } catch (e) {
    console.error(e)
  }
}

export const deposit = async (
  contract: any,
  account: string,
  amount: string
) => {
  const gasPrice = 5000000000
  try {
    const tx = await contract.methods
      .deposit(`0x${(parseInt(amount) * 10 ** 18).toString(16)}`)
      .send({
        from: account,
        gasPrice,
      })
    return tx
  } catch (e) {
    console.error(e)
  }
}

export const withdraw = async (
  contract: any,
  account: string,
  amount: string
) => {
  const gasPrice = 5000000000
  try {
    const tx = await contract.methods
      .withdraw(`0x${(parseInt(amount) * 10 ** 18).toString(16)}`)
      .send({
        from: account,
        gasPrice,
      })
    return tx
  } catch (e) {
    console.error(e)
  }
}

export const transfer = async (
  contract: any,
  account: string,
  to: string,
  amount: string
) => {
  const gasPrice = 5000000000
  try {
    const tx = await contract.methods
      .transfer(to, `0x${(parseInt(amount) * 10 ** 18).toString(16)}`)
      .send({
        from: account,
        gasPrice,
      })
    return tx
  } catch (e) {
    console.error(e)
  }
}

export const getBalance = async (contract: any, account: string) => {
  try {
    const balance = await contract.methods.balance().call({ from: account })
    return balance
  } catch (e) {
    console.error(e)
  }
}

export const getTotal = async (contract: any) => {
  try {
    const total = await contract.methods.total().call()
    return total
  } catch (e) {
    console.error(e)
  }
}

export const getAllowance = async (
  contract: any,
  account: string,
  spender: string
) => {
  try {
    const allowance = await contract.methods.allowance(account, spender).call()
    return allowance
  } catch (e) {
    console.error(e)
  }
}
