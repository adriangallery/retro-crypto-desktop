
export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isResizable?: boolean;
  icon?: string;
}

export interface IconData {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  onClick: () => void;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}
