
import React from 'react';

export const MenuBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-[#e6e6e6] border-b border-[#808080] flex items-center px-2 z-50">
      <div className="flex items-center gap-4">
        <div className="text-xs font-bold font-mono">🍎</div>
        <div className="text-xs font-mono">File</div>
        <div className="text-xs font-mono">Edit</div>
        <div className="text-xs font-mono">View</div>
        <div className="text-xs font-mono">Special</div>
      </div>
      <div className="flex-1" />
      <div className="text-xs font-mono">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
