
import React, { useState } from 'react';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  id, 
  name, 
  icon, 
  position, 
  onClick 
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`absolute cursor-pointer group ${isSelected ? 'z-10' : 'z-0'}`}
      style={{ left: position.x, top: position.y }}
      onDoubleClick={onClick}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="flex flex-col items-center w-16 p-1">
        <div className={`w-12 h-12 mb-1 flex items-center justify-center rounded ${
          isSelected ? 'bg-[#0066cc] bg-opacity-50' : ''
        }`}>
          <img 
            src={icon} 
            alt={name}
            className="w-10 h-10 pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <span className={`text-xs text-center leading-tight font-mono ${
          isSelected ? 'bg-[#0066cc] text-white px-1' : 'text-black bg-white bg-opacity-80'
        } shadow-sm`}>
          {name}
        </span>
      </div>
    </div>
  );
};
