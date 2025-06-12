import { create } from 'zustand';
import { Window, DesktopIcon, WalletState } from '../types/desktop';

interface DesktopState {
  windows: Window[];
  icons: DesktopIcon[];
  activeWindowId: string | null;
  wallet: WalletState;
  addWindow: (window: Omit<Window, 'id'>) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Window>) => void;
  setActiveWindow: (id: string | null) => void;
  addIcon: (icon: Omit<DesktopIcon, 'id'>) => void;
  updateIcon: (id: string, updates: Partial<DesktopIcon>) => void;
  setWalletState: (state: Partial<WalletState>) => void;
}

export const useDesktopStore = create<DesktopState>((set) => ({
  windows: [],
  icons: [],
  activeWindowId: null,
  wallet: {
    address: null,
    isConnected: false,
    balance: '0',
    chainId: null
  },
  addWindow: (window) =>
    set((state) => ({
      windows: [
        ...state.windows,
        {
          ...window,
          id: Math.random().toString(36).substr(2, 9),
          zIndex: state.windows.length + 1,
        },
      ],
    })),
  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),
  updateWindow: (id, updates) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, ...updates } : window
      ),
    })),
  setActiveWindow: (id) =>
    set((state) => ({
      activeWindowId: id,
      windows: state.windows.map((window) =>
        window.id === id
          ? { ...window, zIndex: state.windows.length + 1 }
          : window
      ),
    })),
  addIcon: (icon) =>
    set((state) => ({
      icons: [
        ...state.icons,
        {
          ...icon,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  updateIcon: (id, updates) =>
    set((state) => ({
      icons: state.icons.map((icon) =>
        icon.id === id ? { ...icon, ...updates } : icon
      ),
    })),
  setWalletState: (state) =>
    set((currentState) => ({
      wallet: { ...currentState.wallet, ...state },
    })),
})); 