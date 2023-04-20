import { ethers } from 'hardhat'

const deploy = async () => {
  const Transactions = await ethers.getContractFactory('Transactions')
  const transactions = await Transactions.deploy()
  await transactions.deployed()
  console.log('Transactions Contract deployed to: ', transactions.address)
  //
  const Booking = await ethers.getContractFactory('Booking')
  const booking = await Booking.deploy()
  await booking.deployed()
  console.log('Booking Contract deployed to: ', booking.address)

  return
}

const main = async () => {
  try {
    await deploy()
    process.exit(0)
  } catch (error) {
    console.log({ error })
    process.exit(1)
  }
}

main()
