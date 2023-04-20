import { time } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Lock', () => {
  it('Should set the right unlockTime', async () => {
    const lockedAmount = 1_000_000_000
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS
    console.log({ unlockTime })

    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    const Lock = await ethers.getContractFactory('Lock')
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount })

    // assert that the value is correct
    const result = await lock.unlockTime()
    console.log({ result })
    expect(result).to.equal(unlockTime)
  })
})
