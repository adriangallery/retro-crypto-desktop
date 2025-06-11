
import React, { useState, useCallback } from 'react';
import { MenuBar } from './MenuBar';
import { DesktopIcons } from './DesktopIcons';
import { WindowManager } from './WindowManager';
import { WalletConnection } from './WalletConnection';
import type { WindowData, IconData } from '../types/desktop';

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
    <div className="h-screen w-full bg-[#c0c0c0] overflow-hidden select-none relative">
      {/* Desktop Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000000' fill-opacity='0.4'%3E%3C/path%3E%3C/svg%3E")`,
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
