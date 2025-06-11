
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
          await getBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setIsConnected(true);
        setAddress(accounts[0]);
        await getBalance(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet!');
    }
  };

  const getBalance = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    setBalance('');
  };

  return (
    <div className="absolute top-8 right-4 z-40">
      <div className="bg-[#f0f0f0] border-2 border-[#808080] p-3 shadow-lg max-w-64">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="bg-[#e6e6e6] border-2 border-[#808080] px-4 py-2 text-xs font-mono hover:bg-[#d9d9d9] active:border-[#404040] transition-all"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-2">
            <div className="text-xs font-mono">
              <div className="font-bold mb-1">Connected:</div>
              <div className="break-all text-[10px] bg-white p-1 border border-[#808080]">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
            </div>
            <div className="text-xs font-mono">
              <div className="font-bold">Balance:</div>
              <div className="bg-white p-1 border border-[#808080]">
                {parseFloat(balance).toFixed(4)} ETH
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-[#e6e6e6] border-2 border-[#808080] px-3 py-1 text-xs font-mono hover:bg-[#d9d9d9] active:border-[#404040] transition-all w-full"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
