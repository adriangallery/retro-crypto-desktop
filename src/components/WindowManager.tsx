
import React from 'react';
import { MacWindow } from './MacWindow';
import type { WindowData } from '../types/desktop';

interface WindowManagerProps {
  windows: WindowData[];
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onClose,
  onBringToFront,
  onUpdatePosition,
}) => {
  return (
    <>
      {windows.map((window) => (
        <MacWindow
          key={window.id}
          windowData={window}
          onClose={onClose}
          onBringToFront={onBringToFront}
          onUpdatePosition={onUpdatePosition}
        />
      ))}
    </>
  );
};
