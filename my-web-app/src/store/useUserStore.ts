import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  isAuthenticated: false,
  setAuthenticated: (val) => set({ isAuthenticated: val }),
}));
