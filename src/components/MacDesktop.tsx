
import React, { useState, useCallback } from 'react';
import { MenuBar } from './MenuBar';
import { DesktopIcons } from './DesktopIcons';
import { WindowManager } from './WindowManager';
import { WalletConnection } from './WalletConnection';
import type { WindowData } from '../types/desktop';

const MacDesktop = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = useCallback((windowData: Omit<WindowData, 'id' | 'zIndex'>) => {
    const newWindow: WindowData = {
      ...windowData,
      id: Date.now().toString(),
      zIndex: nextZIndex,
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id 
        ? { ...window, zIndex: nextZIndex }
        : window
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(window =>
      window.id === id ? { ...window, x, y } : window
    ));
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden select-none relative">
      {/* Desktop Background with uploaded image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/lovable-uploads/e24e3121-4715-430d-b5c6-9dcbc6d9644b.png')`,
          backgroundRepeat: 'repeat',
          imageRendering: 'pixelated'
        }}
      />
      
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Desktop Icons */}
      <DesktopIcons onIconClick={openWindow} />
      
      {/* Wallet Connection */}
      <WalletConnection />
      
      {/* Window Manager */}
      <WindowManager 
        windows={windows}
        onClose={closeWindow}
        onBringToFront={bringToFront}
        onUpdatePosition={updateWindowPosition}
      />
    </div>
  );
};

export default MacDesktop;
