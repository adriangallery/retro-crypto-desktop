import React from 'react';
import { ethers } from 'ethers';
import { useDesktopStore } from '../store/desktopStore';

const WalletConnect: React.FC = () => {
  const { wallet, setWalletState } = useDesktopStore();

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();

        setWalletState({
          address,
          isConnected: true,
          chainId: Number(network.chainId),
        });
      } else {
        alert('Please install MetaMask to use this feature');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Error connecting wallet');
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {wallet.isConnected ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect; 