import React from 'react';
import { ethers } from 'ethers';
import { useDesktopStore } from '../store/desktopStore';

export const WalletConnect: React.FC = () => {
  const { wallet, setWalletState } = useDesktopStore();

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const network = await provider.getNetwork();
        
        setWalletState({
          address: accounts[0],
          isConnected: true,
          chainId: Number(network.chainId)
        });
      } else {
        alert('Por favor instala MetaMask para usar esta aplicación');
      }
    } catch (error) {
      console.error('Error al conectar la wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {wallet.isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">
            {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Desconectar
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Conectar Wallet
        </button>
      )}
    </div>
  );
}; 