import { ethers } from 'ethers'
import Head from 'next/head'
import { NextPage } from 'next/types'
import { ChangeEvent, useState } from 'react'

import { useEthereum } from '@/hooks/useEthereum'

const Home: NextPage = () => {
  const { contract, currentAccountAddress, connectWallet, sendTransaction } = useEthereum()
  const [inputFormData, setInputFormData] = useState({ toAddress: '', amount: '' })
  //
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setInputFormData(input => ({ ...input, [name]: value }))
  }
  //
  const handleSubmit = async () => {
    if (!contract || !inputFormData.toAddress || !inputFormData.amount) return

    const params = {
      gas: '0x2710', // TODO: hex decimal
      from: currentAccountAddress,
      to: inputFormData.toAddress,
      value: ethers.utils.parseEther(inputFormData.amount)._hex, // to hex decimal
    }

    await sendTransaction([params])
    const txHash = await contract.addToBlockChain(params.to, params.value)
    console.log({ params, txHash })
    console.log(`ロード中・・・${txHash.hash}`)
    await txHash.wait()
    console.log(`送金に成功しました！`)
  }
  //
  return (
    <>
      <Head>
        <title>Crypt App</title>
        <meta name="description" content="Contract application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello Ethereum</h1>
        <button type="button" onClick={connectWallet}>
          ウォレット連携
        </button>
        <div>
          <input type="text" placeholder="to address" name="toAddress" onChange={handleChange} />
          <input type="text" placeholder="ETH amount" name="amount" onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSubmit}>
          送金する
        </button>
      </main>
    </>
  )
}

export default Home
