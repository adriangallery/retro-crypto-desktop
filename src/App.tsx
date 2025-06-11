import React from 'react';
import Desktop from './components/Desktop';
import WalletConnect from './components/WalletConnect';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Desktop />
      <WalletConnect />
    </div>
  );
};

export default App;
