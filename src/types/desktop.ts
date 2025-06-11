
import React from 'react';

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  icon?: string;
}
