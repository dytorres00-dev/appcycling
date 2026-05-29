import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  profile: any | null
  isAuthenticated: boolean
  setAuth: (user: User | null, profile: any | null) => void
  setUnauth: () => void
}

export const useStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  setAuth: (user, profile) => set({ user, profile, isAuthenticated: !!user }),
  setUnauth: () => set({ user: null, profile: null, isAuthenticated: false }),
}))
