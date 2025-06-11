import { Desktop } from './components/Desktop';
import { WalletConnect } from './components/WalletConnect';
import './index.css';

function App() {
  return (
    <div className="w-screen h-screen">
      <Desktop />
      <WalletConnect />
    </div>
  );
}

export default App;
