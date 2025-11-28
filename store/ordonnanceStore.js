import { create } from "zustand";
import { getOrdonnances, addOrdonnance, updateOrdonnance } from "../api/ordonnanceService";

export const useOrdonnanceStore = create((set) => ({
    
    ordonnances: [],
    loadOrdonnances: async () => {
        const data = await getOrdonnances();
        set({ ordonnances: data });
    },
    addOrdonnance: async (ordonnance) => {
        const updated = await addOrdonnance(ordonnance);
        set({ ordonnances: updated });
    },
    updateOrdonnance: async (id, updated) => {
        const newList = await updateOrdonnance(id, updated);
        set({ ordonnances: newList });
    }
}));
