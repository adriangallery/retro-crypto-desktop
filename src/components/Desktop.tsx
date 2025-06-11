import React, { useEffect } from 'react';
import Draggable from 'react-draggable';
import { useDesktopStore } from '../store/desktopStore';
import deskBg from '../assets/Desk.png';
import docIcon from '../assets/Doc.png';
import folderIcon from '../assets/Folder_1.png';
import trashIcon from '../assets/Trash.png';
import diskIcon from '../assets/Disc_5.png';
import colorWindow from '../assets/Color.png';

export const Desktop: React.FC = () => {
  const { 
    windows, 
    icons, 
    addWindow, 
    addIcon, 
    updateIcon, 
    updateWindow,
    removeWindow,
    setActiveWindow 
  } = useDesktopStore();

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
    addWindow({
      title: 'Color',
      content: <img src={colorWindow} alt="Color Window" className="w-full h-full object-contain" />,
      position: { x: 100, y: 100 },
      size: { width: 400, height: 300 }
    });
  };

  return (
    <div 
      className="w-screen h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${deskBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Iconos del escritorio */}
      {icons.map((icon) => (
        <Draggable
          key={icon.id}
          position={icon.position}
          onStop={(_, data) => {
            updateIcon(icon.id, {
              position: { x: data.x, y: data.y }
            });
          }}
        >
          <div 
            className="absolute cursor-move select-none"
            onClick={() => icon.image === diskIcon && handleDiskClick()}
          >
            <img 
              src={icon.image} 
              alt={icon.label} 
              className="w-16 h-16 object-contain"
            />
            <div className="text-center text-white text-sm mt-1">
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
        >
          <div 
            className="absolute bg-white border-2 border-gray-400 shadow-lg"
            style={{
              width: window.size.width,
              height: window.size.height,
              zIndex: window.zIndex
            }}
            onClick={() => setActiveWindow(window.id)}
          >
            <div className="bg-gray-200 p-1 flex justify-between items-center">
              <div className="text-sm font-bold">{window.title}</div>
              <button
                onClick={() => removeWindow(window.id)}
                className="w-4 h-4 bg-red-500 rounded-full"
              />
            </div>
            <div className="p-2">{window.content}</div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}; 