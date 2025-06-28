import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ColorStore {
  textColor: string
  bgColor: string
  setTextColor: (color: string) => void
  setBgColor: (color: string) => void
}

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      textColor: '#000000',
      bgColor: '#ffffff',
      savedPalettes: [],

      setTextColor: (color) => set({ textColor: color }),
      setBgColor: (color) => set({ bgColor: color }),
    }),
    { name: 'color-storage' }
  )
)
