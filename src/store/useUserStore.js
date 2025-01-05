import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null, // Initial user state

      // Set user data in the store
      setUser: (user) => set({ user }),

      // Reset user data (for logout, etc.)
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user-store", // Local storage key name
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useUserStore;
