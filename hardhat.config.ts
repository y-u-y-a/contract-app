import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/types'
import '@nomicfoundation/hardhat-toolbox'

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
    mumbai: {
      url: process.env.MUMBAI_ALCHEMY_URL || '',
      accounts: [process.env.WALLET_PRIVATE_KEY || ''],
    },
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
