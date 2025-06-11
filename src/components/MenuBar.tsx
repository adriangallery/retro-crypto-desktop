
import React, { useState } from 'react';
import { Apple } from 'lucide-react';

export const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    { 
      id: 'apple', 
      icon: <Apple size={14} className="fill-current" />, 
      items: ['About This Mac...', '-', 'System Preferences...', '-', 'Restart...', 'Shut Down...'] 
    },
    { 
      id: 'file', 
      label: 'File', 
      items: ['New', 'Open...', 'Close', '-', 'Save', 'Save As...', '-', 'Page Setup...', 'Print...'] 
    },
    { 
      id: 'edit', 
      label: 'Edit', 
      items: ['Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Clear', '-', 'Select All'] 
    },
    { 
      id: 'view', 
      label: 'View', 
      items: ['by Icon', 'by Name', 'by Date', 'by Size', '-', 'Clean Up'] 
    },
  ];

  return (
    <div className="h-6 bg-[#f0f0f0] border-b-2 border-[#808080] flex items-center px-2 text-xs font-mono relative z-50">
      {menus.map((menu) => (
        <div key={menu.id} className="relative">
          <button
            className={`px-2 py-0.5 hover:bg-[#0066cc] hover:text-white transition-colors ${
              activeMenu === menu.id ? 'bg-[#0066cc] text-white' : 'text-black'
            }`}
            onMouseEnter={() => setActiveMenu(activeMenu ? menu.id : null)}
            onClick={() => setActiveMenu(activeMenu === menu.id ? null : menu.id)}
          >
            {menu.icon || menu.label}
          </button>
          
          {activeMenu === menu.id && (
            <div className="absolute top-full left-0 bg-[#f0f0f0] border border-[#808080] shadow-lg min-w-40 z-50">
              {menu.items.map((item, index) => (
                <div key={index}>
                  {item === '-' ? (
                    <div className="border-t border-[#808080] my-1" />
                  ) : (
                    <button className="block w-full text-left px-3 py-1 hover:bg-[#0066cc] hover:text-white text-black">
                      {item}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="flex-1" onClick={() => setActiveMenu(null)} />
      
      <div className="text-black">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
