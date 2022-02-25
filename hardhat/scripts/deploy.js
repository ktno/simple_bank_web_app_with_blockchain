// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SimpleBank = await hre.ethers.getContractFactory('SimpleBank')
  const SimpleToken = await hre.ethers.getContractFactory('SimpleToken')

  const totalSupply = hre.ethers.constants.MaxUint256
  const simpleToken = await SimpleToken.deploy(totalSupply)
  await simpleToken.deployed()
  console.log('SimpleToken deployed to:', simpleToken.address)

  const simpleBank = await SimpleBank.deploy(simpleToken.address)
  await simpleBank.deployed()
  console.log('SimpleBank deployed to:', simpleBank.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
