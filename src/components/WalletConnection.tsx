
import React, { useState } from 'react';
import { ethers } from 'ethers';

export const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>('');

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount('');
  };

  return (
    <div className="absolute top-8 right-4 z-50">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="mac-button px-3 py-1 text-xs font-mono text-black hover:bg-gray-200"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-black bg-white px-2 py-1 border border-gray-400">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="mac-button px-2 py-1 text-xs font-mono text-black hover:bg-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
