import { create } from 'zustand';
import { Window, DesktopIcon, WalletState } from '../types/desktop';

interface DesktopStore {
  windows: Window[];
  icons: DesktopIcon[];
  wallet: WalletState;
  activeWindowId: string | null;
  
  // Window actions
  addWindow: (window: Omit<Window, 'id' | 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Window>) => void;
  setActiveWindow: (id: string | null) => void;
  
  // Icon actions
  addIcon: (icon: Omit<DesktopIcon, 'id'>) => void;
  removeIcon: (id: string) => void;
  updateIcon: (id: string, updates: Partial<DesktopIcon>) => void;
  
  // Wallet actions
  setWalletState: (state: Partial<WalletState>) => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  windows: [],
  icons: [],
  wallet: {
    address: null,
    isConnected: false,
    chainId: null,
  },
  activeWindowId: null,

  addWindow: (window) => set((state) => ({
    windows: [...state.windows, {
      ...window,
      id: Date.now().toString(),
      zIndex: state.windows.length,
    }],
  })),

  removeWindow: (id) => set((state) => ({
    windows: state.windows.filter((w) => w.id !== id),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),

  updateWindow: (id, updates) => set((state) => ({
    windows: state.windows.map((w) =>
      w.id === id ? { ...w, ...updates } : w
    ),
  })),

  setActiveWindow: (id) => set((state) => ({
    activeWindowId: id,
    windows: state.windows.map((w) => ({
      ...w,
      zIndex: w.id === id ? state.windows.length : w.zIndex,
    })),
  })),

  addIcon: (icon) => set((state) => ({
    icons: [...state.icons, {
      ...icon,
      id: Date.now().toString(),
    }],
  })),

  removeIcon: (id) => set((state) => ({
    icons: state.icons.filter((i) => i.id !== id),
  })),

  updateIcon: (id, updates) => set((state) => ({
    icons: state.icons.map((i) =>
      i.id === id ? { ...i, ...updates } : i
    ),
  })),

  setWalletState: (state) => set((store) => ({
    wallet: { ...store.wallet, ...state },
  })),
})); 