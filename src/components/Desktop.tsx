import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useDesktopStore } from '../store/desktopStore';
import deskBg from '../assets/desk.png';
import docIcon from '../assets/doc.png';
import folderIcon from '../assets/folder_1.png';
import trashIcon from '../assets/trash.png';
import diskIcon from '../assets/Disc_5.png';
import colorWindow from '../assets/color.png';
import paperWindow from '../assets/500.png';
import docWindow from '../assets/1000.png';
import lineWindow from '../assets/line.png';

interface IconPosition {
  x: number;
  y: number;
}

interface DraggableIconProps {
  id: string;
  image: string;
  label: string;
  position: IconPosition;
  onPositionChange: (id: string, newPosition: IconPosition) => void;
  onIconClick?: () => void;
}

const DraggableIcon: React.FC<DraggableIconProps> = ({
  id,
  image,
  label,
  position,
  onPositionChange,
  onIconClick
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <Draggable
      position={position}
      onStart={() => setIsDragging(true)}
      onStop={(_, data) => {
        setIsDragging(false);
        onPositionChange(id, { x: data.x, y: data.y });
      }}
      bounds="parent"
    >
      <div 
        className={`absolute cursor-move ${isDragging ? 'z-50 scale-110' : 'z-10'}`}
        style={{ transition: 'transform 0.1s' }}
      >
        <div 
          className="relative"
          onClick={(e) => {
            if (!isDragging && onIconClick) {
              e.stopPropagation();
              onIconClick();
            }
          }}
        >
          <img 
            src={image} 
            alt={label} 
            className="w-16 h-16 object-contain"
            draggable="false"
          />
          <div className="icon-label text-center text-white text-sm mt-1 px-1">
            {label}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

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

  useEffect(() => {
    // Inicializar iconos con posiciones específicas
    const initialIcons = [
      { image: docIcon, position: { x: 40, y: 40 }, label: 'Documento' },
      { image: folderIcon, position: { x: 40, y: 140 }, label: 'Carpeta' },
      { image: trashIcon, position: { x: 40, y: 240 }, label: 'Papelera' },
      { image: diskIcon, position: { x: 40, y: 340 }, label: 'Disco' }
    ];

    // Limpiar iconos existentes y agregar los nuevos
    initialIcons.forEach(icon => {
      addIcon({
        image: icon.image,
        position: icon.position,
        label: icon.label
      });
    });
  }, [addIcon]);

  const handleIconClick = (iconId: string) => {
    const icon = icons.find(i => i.id === iconId);
    if (!icon) return;

    let windowContent;
    let windowTitle = icon.label;
    let windowSize = { width: 400, height: 300 };
    let imageToLoad;

    switch (iconId) {
      case 'disk':
        imageToLoad = colorWindow;
        break;
      case 'doc':
        imageToLoad = docWindow;
        break;
      case 'folder':
        imageToLoad = lineWindow;
        break;
      case 'trash':
        imageToLoad = paperWindow;
        break;
      default:
        return;
    }

    // Cargar la imagen para obtener sus dimensiones
    const img = new Image();
    img.src = imageToLoad;
    img.onload = () => {
      // Calcular el tamaño de la ventana manteniendo la proporción
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
      const aspectRatio = img.width / img.height;

      if (aspectRatio > 1) {
        // Imagen más ancha que alta
        windowSize.width = Math.min(maxWidth, img.width);
        windowSize.height = windowSize.width / aspectRatio;
      } else {
        // Imagen más alta que ancha
        windowSize.height = Math.min(maxHeight, img.height);
        windowSize.width = windowSize.height * aspectRatio;
      }

      // Calcular la posición en cascada
      const cascadeOffset = 30; // Píxeles de desplazamiento para el efecto cascada
      const basePosition = { x: 50, y: 50 }; // Posición base para la primera ventana
      const windowCount = windows.length;
      const position = {
        x: basePosition.x + (windowCount * cascadeOffset),
        y: basePosition.y + (windowCount * cascadeOffset)
      };

      // Asegurar que la ventana no se salga de la pantalla
      position.x = Math.min(position.x, window.innerWidth - windowSize.width - 50);
      position.y = Math.min(position.y, window.innerHeight - windowSize.height - 50);

      windowContent = (
        <img 
          src={imageToLoad} 
          alt={`${windowTitle} Window`} 
          className="w-full h-full object-contain"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      );

      addWindow({
        title: windowTitle,
        content: windowContent,
        position,
        size: windowSize
      });
    };
  };

  return (
    <div 
      className="desktop-bg"
      style={{
        backgroundImage: `url(${deskBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Iconos */}
      {icons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          id={icon.id}
          image={icon.image}
          label={icon.label}
          position={icon.position}
          onPositionChange={(id, newPosition) => {
            updateIcon(id, { position: newPosition });
          }}
          onIconClick={() => handleIconClick(icon.id)}
        />
      ))}

      {/* Ventanas */}
      {windows.map((window) => (
        <Draggable
          key={window.id}
          position={window.position}
          handle=".window-handle"
          bounds="parent"
          onStop={(_, data) => {
            updateWindow(window.id, {
              position: { x: data.x, y: data.y }
            });
          }}
        >
          <div 
            className={`absolute bg-white border-2 border-gray-400 shadow-lg rounded ${
              window.id === activeWindowId ? 'window-active z-30' : 'z-20'
            }`}
            style={{
              width: window.size.width,
              height: window.size.height
            }}
            onClick={() => setActiveWindow(window.id)}
          >
            <div className="window-handle bg-gray-200 p-2 flex justify-between items-center cursor-move rounded-t">
              <div className="text-sm font-bold">{window.title}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeWindow(window.id);
                }}
                className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              />
            </div>
            <div className="p-2 overflow-auto" style={{ height: 'calc(100% - 2.5rem)' }}>
              {window.content}
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}; 