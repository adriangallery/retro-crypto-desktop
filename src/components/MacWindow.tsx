
import React, { useState, useRef } from 'react';
import type { WindowData } from '../types/desktop';

interface MacWindowProps {
  windowData: WindowData;
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  windowData,
  onClose,
  onBringToFront,
  onUpdatePosition,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - windowData.x, y: e.clientY - windowData.y });
      onBringToFront(windowData.id);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onUpdatePosition(windowData.id, Math.max(0, newX), Math.max(24, newY));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      ref={windowRef}
      className="absolute bg-[#e6e6e6] border border-[#808080] mac-outset select-none"
      style={{
        left: windowData.x,
        top: windowData.y,
        width: windowData.width,
        height: windowData.height,
        zIndex: windowData.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div className="window-header h-5 bg-[#e6e6e6] border-b border-[#808080] flex items-center justify-between px-1 cursor-move">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#ff6b6b] border border-[#000] cursor-pointer" onClick={() => onClose(windowData.id)} />
          <div className="w-2 h-2 bg-[#ffdd59] border border-[#000]" />
        </div>
        <div className="text-xs font-mono font-bold flex-1 text-center">{windowData.title}</div>
        <div className="w-6" />
      </div>
      
      {/* Content */}
      <div className="p-2 h-full overflow-auto bg-white">
        {windowData.content}
      </div>
    </div>
  );
};
