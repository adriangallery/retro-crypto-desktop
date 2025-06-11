
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
  onClick,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
    onClick();
  };

  return (
    <div
      className={`absolute w-16 h-20 flex flex-col items-center cursor-pointer group ${
        isSelected ? 'bg-blue-500 bg-opacity-50' : ''
      }`}
      style={{ left: position.x, top: position.y }}
      onClick={handleClick}
    >
      <div className="w-8 h-8 mb-1 pixelated">
        <img 
          src={icon} 
          alt={name} 
          className="w-full h-full pixelated object-contain"
        />
      </div>
      <span className="text-xs text-black font-mono text-center px-1 leading-tight">
        {name}
      </span>
    </div>
  );
};
