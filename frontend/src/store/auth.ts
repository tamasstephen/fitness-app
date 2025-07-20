import { AuthStore } from "@/interfaces/authStore.interface";
import { create } from "zustand";

const useAuthStoreBase = create<AuthStore>((set, get) => ({
  user_id: "",
  setUser: (user_id) => set({ user_id }),
  clearUser: () => set({ user_id: "" }),
  getUserId: () => get().user_id,
}));

export const useAuthStore = () => {
  const { user_id, setUser, clearUser, getUserId } = useAuthStoreBase();
  return { user_id, setUser, clearUser, getUserId };
};
