import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { MemberNFT } from '../typechain-types'

describe('MemberNFT Contract tests', () => {
  let contract: MemberNFT
  const tokenName = 'MemberNFT'
  const symbol = 'MEM'
  let owner: SignerWithAddress

  beforeEach(async () => {
    ;[owner] = await ethers.getSigners() // 所有している全てのアカウントアドレス
    contract = await (await (await ethers.getContractFactory('MemberNFT')).deploy()).deployed()
    // await contract.deployed()
  })

  it('トークン名とシンボルがセットされるべき', async () => {
    expect(await contract.name()).to.equal(tokenName)
    expect(await contract.symbol()).to.equal(symbol)
  })
  // デプロイアドレス=デプロイ時に署名をしたアカウントアドレス
  it('デプロイアドレスがOwnerにセットされるべき', async () => {
    expect(await contract.owner()).to.equal(owner.address)
  })
})
