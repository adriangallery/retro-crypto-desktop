import { ReactNode } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Window {
  id: string;
  title: string;
  content: ReactNode;
  position: Position;
  size: Size;
  zIndex?: number;
}

export interface DesktopIcon {
  id: string;
  image: string;
  label: string;
  position: Position;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
}
