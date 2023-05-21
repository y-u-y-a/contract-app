import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/types'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: process.env.GOERLI_ALCHEMY_URL || '',
      accounts: [process.env.WALLET_PRIVATE_KEY || ''],
    },
    sepolia: {
      url: process.env.SEPOLIA_ALCHEMY_URL || '',
      accounts: [process.env.WALLET_PRIVATE_KEY || ''],
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
