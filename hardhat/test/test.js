const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleBank", function () {
  beforeEach(async () => {
    SimpleToken = await ethers.getContractFactory("SimpleToken");
    account = await ethers.getSigner();
    simpleToken = await SimpleToken.deploy(ethers.constants.MaxUint256);
  })

  it("Deployment should assign the total balance to the SimpleBank", async function () {
    // when
    const SimpleBank = await ethers.getContractFactory("SimpleBank");
    const initialBalance = ethers.utils.parseEther("100")
    // action
    const simpleBank = await SimpleBank.deploy({ value: initialBalance });
    // assert
    expect(await simpleBank.total()).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should deposit balance successfully and return the deposited balance of the caller", async function () {
    // when
    const SimpleBank = await ethers.getContractFactory("SimpleBank");
    const simpleBank = await SimpleBank.deploy();
    expect(await simpleBank.balance()).to.equal(0)
    // action
    simpleBank.deposit({ value: ethers.utils.parseEther("100") })
    // assert
    expect(await simpleBank.balance()).to.equal(ethers.utils.parseEther("100"))
  })

  it("Should withdraw balance successfully and return the deposited balance of the caller", async function () {
    // when
    const SimpleBank = await ethers.getContractFactory("SimpleBank");
    const simpleBank = await SimpleBank.deploy();
    expect(await simpleBank.balance()).to.equal(0)
    simpleBank.deposit({ value: ethers.utils.parseEther("100") })
    expect(await simpleBank.balance()).to.equal(ethers.utils.parseEther("100"))
    // action
    simpleBank.withdraw(ethers.utils.parseEther("50"))
    // assert
    expect(await simpleBank.balance()).to.equal(ethers.utils.parseEther("50"))
  })

  it("Should transfer balance successfully and return the deposited balance of the caller and the recipient", async function () {
    // when
    const SimpleBank = await ethers.getContractFactory("SimpleBank");
    const simpleBank = await SimpleBank.deploy();
    const accounts = await ethers.getSigners();
    expect(await simpleBank.balance()).to.equal(0)
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(0)
    simpleBank.deposit({ value: ethers.utils.parseEther("100") })
    simpleBank.connect(accounts[1]).deposit({ value: ethers.utils.parseEther("100") })
    expect(await simpleBank.balance()).to.equal(ethers.utils.parseEther("100"))
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(ethers.utils.parseEther("100"))
    // action
    simpleBank.transfer(accounts[1].address, ethers.utils.parseEther("50"))
    // assert
    expect(await simpleBank.balance()).to.equal(ethers.utils.parseEther("50"))
    expect(await simpleBank.connect(accounts[1]).balance()).to.equal(ethers.utils.parseEther("150"))
  })
});
