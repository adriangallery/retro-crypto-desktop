import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useDesktopStore } from '../store/desktopStore';
import deskBg from '../assets/desk.png';
import docIcon from '../assets/doc.png';
import folderIcon from '../assets/folder_1.png';
import trashIcon from '../assets/trash.png';
import diskIcon from '../assets/Disc_5.png';
import colorWindow from '../assets/color.png';

export const Desktop: React.FC = () => {
  const { 
    windows, 
    icons, 
    addWindow, 
    addIcon, 
    updateIcon, 
    updateWindow,
    removeWindow,
    setActiveWindow,
    activeWindowId
  } = useDesktopStore();

  const [isDragging, setIsDragging] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    // Inicializar iconos del escritorio
    const initialIcons = [
      { image: docIcon, position: { x: 50, y: 50 }, label: 'Documento' },
      { image: folderIcon, position: { x: 50, y: 150 }, label: 'Carpeta' },
      { image: trashIcon, position: { x: 50, y: 250 }, label: 'Papelera' },
      { image: diskIcon, position: { x: 50, y: 350 }, label: 'Disco' }
    ];

    initialIcons.forEach(icon => addIcon(icon));
  }, [addIcon]);

  const handleDiskClick = () => {
    if (!isDragging) {
      addWindow({
        title: 'Color',
        content: <img src={colorWindow} alt="Color Window" className="w-full h-full object-contain" />,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 }
      });
    }
  };

  const handleIconDragStart = (iconId: string) => {
    setIsDragging(true);
    setSelectedIcon(iconId);
  };

  const handleIconDragStop = () => {
    setIsDragging(false);
    setSelectedIcon(null);
  };

  return (
    <div 
      className="desktop-bg"
      style={{
        backgroundImage: `url(${deskBg})`,
      }}
    >
      {/* Iconos del escritorio */}
      {icons.map((icon) => (
        <Draggable
          key={icon.id}
          position={icon.position}
          onStart={() => handleIconDragStart(icon.id)}
          onStop={(_, data) => {
            handleIconDragStop();
            updateIcon(icon.id, {
              position: { x: data.x, y: data.y }
            });
          }}
          bounds="parent"
        >
          <div 
            className={`icon absolute cursor-move select-none ${
              selectedIcon === icon.id ? 'scale-110' : ''
            }`}
            onClick={() => icon.image === diskIcon && handleDiskClick()}
          >
            <img 
              src={icon.image} 
              alt={icon.label} 
              className="w-16 h-16 object-contain"
              draggable="false"
            />
            <div className="icon-label text-center text-white text-sm mt-1">
              {icon.label}
            </div>
          </div>
        </Draggable>
      ))}

      {/* Ventanas */}
      {windows.map((window) => (
        <Draggable
          key={window.id}
          position={window.position}
          onStop={(_, data) => {
            updateWindow(window.id, {
              position: { x: data.x, y: data.y }
            });
          }}
          bounds="parent"
        >
          <div 
            className={`window absolute bg-white border-2 border-gray-400 shadow-lg ${
              window.id === activeWindowId ? 'window-active' : ''
            }`}
            style={{
              width: window.size.width,
              height: window.size.height,
              zIndex: window.zIndex
            }}
            onClick={() => setActiveWindow(window.id)}
          >
            <div className="bg-gray-200 p-1 flex justify-between items-center cursor-move">
              <div className="text-sm font-bold">{window.title}</div>
              <button
                onClick={() => removeWindow(window.id)}
                className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              />
            </div>
            <div className="p-2">{window.content}</div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}; 