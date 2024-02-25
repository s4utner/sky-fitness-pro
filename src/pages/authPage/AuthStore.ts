import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MyStore = {
  isAuthenticated: boolean
  toggleShow: () => void
}

export const useStore = create<MyStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      toggleShow: () => set({ isAuthenticated: true }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    },
  ),
)
