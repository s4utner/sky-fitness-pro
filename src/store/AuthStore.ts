import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ICustomUser } from 'types'

interface IMyStore {
  user: ICustomUser | undefined
  setUser: (user: ICustomUser | undefined) => void
}

export const useStore = create<IMyStore>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
