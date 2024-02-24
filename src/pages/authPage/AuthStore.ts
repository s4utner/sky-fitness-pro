import { create } from 'zustand'

type MyStore = {
  isAuthenticated: boolean
  toggleShow: () => void
}

export const useStore = create<MyStore>((set) => ({
  isAuthenticated: false,
  toggleShow: () => set({ isAuthenticated: true }),
}))
