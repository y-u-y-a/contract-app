import { BaseProvider } from '@metamask/providers'
import { Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'

import abiJson from '../../../artifacts/contracts/Transactions.sol/Transactions.json'

export const useEthereum = () => {
  const [ethereum, setEthereum] = useState<BaseProvider>()
  const [contract, setContract] = useState<Contract>() // TODO: set correct type.
  const [currentAccountAddress, setCurrentAcocuntAddress] = useState('')

  /** Get ethereum & contract instance. */
  useEffect(() => {
    const isCSR = typeof window !== 'undefined'
    if (!isCSR) return
    // Get ethereum instance.
    const newEthereum = (window as unknown as { ethereum: BaseProvider }).ethereum
    setEthereum(newEthereum)
    // Get contract instance.
    const contractAbi = JSON.parse(JSON.stringify(abiJson.abi))
    const contractAddress = process.env.CONTRACT_ADDRESS || ''
    const provider = new ethers.providers.Web3Provider(newEthereum)
    const signer = provider.getSigner()
    const newContract = new ethers.Contract(contractAddress, contractAbi, signer)
    setContract(newContract)
  }, [])

  /** Request to contract to send transaction */
  const sendTransaction = async (params: any[]) => {
    console.log('sendTransaction')
    if (!ethereum) return
    await ethereum.request({ method: 'eth_sendTransaction', params })
  }

  /** Show popup to connect wallet */
  const connectWallet = async () => {
    if (!ethereum) return alert('Please install metamask.')
    const accounts = (await ethereum.request<string[]>({ method: 'eth_requestAccounts' })) as string[]
    if (accounts && accounts.length > 0) {
      setCurrentAcocuntAddress(accounts[0])
    }
  }

  return {
    contract,
    currentAccountAddress,
    connectWallet,
    sendTransaction,
  }
}
