const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('SimpleBank', function () {
  beforeEach(async () => {
    SimpleToken = await ethers.getContractFactory('SimpleToken')
    const totalSupply = ethers.constants.MaxUint256
    simpleToken = await SimpleToken.deploy(totalSupply)

    SimpleBank = await ethers.getContractFactory('SimpleBank')
    simpleBank = await SimpleBank.deploy(simpleToken.address)

    account = await ethers.getSigner()

    amount = ethers.utils.parseEther('1')
    await simpleToken.approve(simpleBank.address, ethers.constants.MaxUint256)
  })

  it('Should deposit balance successfully', async function () {
    // when
    expect(await simpleBank.balance()).to.equal(0)
    expect(await simpleBank.total()).to.equal(0)
    // action
    await simpleBank.deposit(amount)
    // assert
    expect(await simpleBank.balance()).to.equal(amount)
    expect(await simpleBank.total()).to.equal(amount)
  })

  it('Should withdraw balance successfully', async function () {
    // when
    expect(await simpleBank.balance()).to.equal(0)
    expect(await simpleBank.total()).to.equal(0)
    await simpleBank.deposit(amount)
    expect(await simpleBank.balance()).to.equal(amount)
    expect(await simpleBank.total()).to.equal(amount)
    // action
    const withdrawAmount = ethers.utils.parseEther('0.5')
    await simpleBank.withdraw(withdrawAmount)
    // assert
    const remainingBalance = amount.sub(withdrawAmount)
    const remainingTotalBalance = amount.sub(withdrawAmount)
    expect(await simpleBank.balance()).to.equal(remainingBalance)
    expect(await simpleBank.total()).to.equal(remainingTotalBalance)
  })

  it('Should transfer balance successfully', async function () {
    // when
    const accounts = await ethers.getSigners()
    /* account #0 */
    expect(await simpleBank.balance()).to.equal(0)
    expect(await simpleBank.total()).to.equal(0)
    await simpleBank.deposit(amount)
    expect(await simpleBank.balance()).to.equal(amount)
    expect(await simpleBank.total()).to.equal(amount)
    /* account #1 */
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(0)
    await simpleToken
      .connect(accounts[1])
      .approve(simpleBank.address, ethers.constants.MaxUint256)
    await simpleToken.transfer(accounts[1].address, amount)
    await simpleBank.connect(accounts[1]).deposit(amount)
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(amount)
    expect(await simpleBank.total()).to.equal(amount.add(amount))
    // action
    const transferAmount = ethers.utils.parseEther('0.5')
    await simpleBank.transfer(accounts[1].address, transferAmount)
    // assert
    expect(await simpleBank.balance()).to.equal(amount.sub(transferAmount))
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(
      amount.add(transferAmount)
    )
    expect(await simpleBank.total()).to.equal(amount.add(amount))
  })

  it('Should get balance and total balance in SimpleBank successfully', async () => {
    // when
    const accounts = await ethers.getSigners()
    await simpleToken
      .connect(accounts[1])
      .approve(simpleBank.address, ethers.constants.MaxUint256)
    await simpleToken.transfer(accounts[1].address, amount)
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(0)
    expect(await simpleBank.balance()).to.equal(0)
    expect(await simpleBank.total()).to.equal(0)
    // action
    await simpleBank.deposit(amount)
    await simpleBank.connect(accounts[1]).deposit(amount)
    // assert
    expect(await simpleBank.balance()).to.equal(amount)
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(amount)
    expect(await simpleBank.total()).to.equal(amount.add(amount))
  })
})
