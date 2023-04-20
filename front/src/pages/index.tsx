import { BaseProvider } from '@metamask/providers'
import { ethers } from 'ethers'
import Head from 'next/head'
import { NextPage } from 'next/types'

import { abi as contractAbi } from '../../../artifacts/src/Booking.sol/Booking.json'

const useEthereum = () => {
  // デプロイされたアドレス
  const contractAddress = ''
  const { ethereum } = window as unknown as { ethereum: BaseProvider }

  // コントラクトの取得
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    console.log({ contractAddress, contractAbi, signer })
  }
  return {
    getContract,
  }
}

const Home: NextPage = () => {
  //
  return (
    <>
      <Head>
        <title>Contract App</title>
        <meta name="description" content="Contract application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello world</h1>
        <button type="button">ボタン</button>
      </main>
    </>
  )
}

export default Home
