
import React from 'react';
import { DesktopIcon } from './DesktopIcon';
import type { WindowData } from '../types/desktop';

interface DesktopIconsProps {
  onIconClick: (windowData: Omit<WindowData, 'id' | 'zIndex'>) => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onIconClick }) => {
  const icons = [
    {
      id: 'folder1',
      name: 'Documents',
      icon: '/placeholder.svg',
      position: { x: 20, y: 50 },
    },
    {
      id: 'app1',
      name: 'Blockchain Explorer',
      icon: '/placeholder.svg',
      position: { x: 20, y: 130 },
    },
    {
      id: 'app2', 
      name: 'Token Manager',
      icon: '/placeholder.svg',
      position: { x: 20, y: 210 },
    },
    {
      id: 'app3',
      name: 'NFT Gallery',
      icon: '/placeholder.svg',
      position: { x: 20, y: 290 },
    },
    {
      id: 'trash',
      name: 'Trash',
      icon: '/placeholder.svg',
      position: { x: 20, y: 450 },
    },
  ];

  const handleIconClick = (iconId: string) => {
    const windowConfigs: Record<string, Omit<WindowData, 'id' | 'zIndex'>> = {
      folder1: {
        title: 'Documents',
        content: <div className="p-4">Welcome to Documents folder!</div>,
        x: 100,
        y: 100,
        width: 400,
        height: 300,
        icon: '/placeholder.svg',
      },
      app1: {
        title: 'Blockchain Explorer',
        content: <div className="p-4">Blockchain Explorer - View transactions and blocks</div>,
        x: 150,
        y: 120,
        width: 500,
        height: 400,
        icon: '/placeholder.svg',
      },
      app2: {
        title: 'Token Manager',
        content: <div className="p-4">Token Manager - Manage your crypto tokens</div>,
        x: 200,
        y: 140,
        width: 450,
        height: 350,
        icon: '/placeholder.svg',
      },
      app3: {
        title: 'NFT Gallery',
        content: <div className="p-4">NFT Gallery - Browse your NFT collection</div>,
        x: 250,
        y: 160,
        width: 600,
        height: 450,
        icon: '/placeholder.svg',
      },
      trash: {
        title: 'Trash',
        content: <div className="p-4">Trash is empty</div>,
        x: 120,
        y: 180,
        width: 300,
        height: 200,
        icon: '/placeholder.svg',
      },
    };

    const config = windowConfigs[iconId];
    if (config) {
      onIconClick(config);
    }
  };

  return (
    <>
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          name={icon.name}
          icon={icon.icon}
          position={icon.position}
          onClick={() => handleIconClick(icon.id)}
        />
      ))}
    </>
  );
};
