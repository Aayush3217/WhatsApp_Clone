import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // persists meaning -> data stored in local storage

const UserStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (userData) => set({ user: userData, isAuthenticated: true }),
            clearUser: () => set({ user:null, isAuthenticated: false }),
        }),
        {
            name: "user-storage",
            getStorage: () => localStorage
        }
    )
);

export default UserStore;