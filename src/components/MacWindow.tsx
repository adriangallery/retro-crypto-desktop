
import React, { useState, useRef, useCallback } from 'react';
import { X, Minus, Square } from 'lucide-react';
import type { WindowData, DragState } from '../types/desktop';

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
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-titlebar')) {
      onBringToFront(windowData.id);
      setDragState({
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        initialX: windowData.x,
        initialY: windowData.y,
      });
    }
  }, [windowData.id, windowData.x, windowData.y, onBringToFront]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragState.isDragging) {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      const newX = Math.max(0, dragState.initialX + deltaX);
      const newY = Math.max(24, dragState.initialY + deltaY); // Account for menu bar
      onUpdatePosition(windowData.id, newX, newY);
    }
  }, [dragState, windowData.id, onUpdatePosition]);

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  }, []);

  React.useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className="absolute bg-[#f0f0f0] border-2 border-[#808080] shadow-lg"
      style={{
        left: windowData.x,
        top: windowData.y,
        width: windowData.width,
        height: windowData.height,
        zIndex: windowData.zIndex,
      }}
      onMouseDown={() => onBringToFront(windowData.id)}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar h-6 bg-gradient-to-b from-[#e6e6e6] to-[#cccccc] border-b border-[#808080] flex items-center justify-between px-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {windowData.icon && (
            <img src={windowData.icon} alt="" className="w-4 h-4 pixelated" />
          )}
          <span className="text-xs font-mono text-black">{windowData.title}</span>
        </div>
        
        <div className="flex gap-1">
          <button
            className="w-4 h-4 bg-[#ffff00] border border-[#808080] hover:bg-[#ffff80] flex items-center justify-center"
            onClick={() => {}} // Minimize functionality
          >
            <Minus size={8} />
          </button>
          <button
            className="w-4 h-4 bg-[#00ff00] border border-[#808080] hover:bg-[#80ff80] flex items-center justify-center"
            onClick={() => {}} // Maximize functionality
          >
            <Square size={6} />
          </button>
          <button
            className="w-4 h-4 bg-[#ff0000] border border-[#808080] hover:bg-[#ff8080] flex items-center justify-center"
            onClick={() => onClose(windowData.id)}
          >
            <X size={8} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(100%-24px)] bg-white border-t border-[#cccccc] overflow-auto">
        {windowData.content}
      </div>
    </div>
  );
};
