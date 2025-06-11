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
  zIndex: number;
}

export interface DesktopIcon {
  id: string;
  image: string;
  position: Position;
  label: string;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
}
