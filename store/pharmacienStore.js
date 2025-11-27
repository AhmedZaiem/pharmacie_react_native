import { create } from "zustand";
import { getMedicaments, addMedicament, updateMedicament, deleteMedicament } from "../api/medicamentService";
import { getCommandes, updateCommandeStatus } from "../api/commandeService";

export const usePharmacienStore = create((set) => ({
    medicaments: [],
    commandes: [],
    loadMedicaments: async () => {
        const data = await getMedicaments();
        set({ medicaments: data });
    },
    addMedicament: async (med) => {
        const updated = await addMedicament(med);
        set({ medicaments: updated });
    },
    updateMedicament: async (id, updated) => {
        const newList = await updateMedicament(id, updated);
        set({ medicaments: newList });
    },
    deleteMedicament: async (id) => {
        const newList = await deleteMedicament(id);
        set({ medicaments: newList });
    },
    loadCommandes: async () => {
        const data = await getCommandes();
        set({ commandes: data });
    },
    updateCommandeStatus: async (id, status) => {
        const newList = await updateCommandeStatus(id, status);
        set({ commandes: newList });
    }
}));
