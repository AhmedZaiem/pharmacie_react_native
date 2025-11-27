import { create } from "zustand";
import { getUsers } from "../api/userService";

export const useAuthStore = create((set) => ({
    user: null,
    login: async (email, password) => {
        const users = await getUsers();
        const found = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!found) return null;

        set({ user: found });
        return found;
    },

    logout: () => {
        set({ user: null });
    },
}));