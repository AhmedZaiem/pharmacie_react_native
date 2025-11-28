import { create } from "zustand";
import { getOrdonnances, addOrdonnance, updateOrdonnance } from "../api/ordonnanceService";

export const useOrdonnanceStore = create((set) => ({
    ordonnances: [
        {
            "id": "o001",
            "patientId": "p1",
            "medecinId": "m100",
            "date": "2025-02-26",
            "medicaments": [
                {
                    "idMedicament": "m001",
                    "quantiteParJour": 2,
                    "duree": 3
                },
                {
                    "idMedicament": "m003",
                    "quantiteParJour": 1,
                    "duree": 7
                }
            ]
        },
        {
            "id": "o002",
            "patientId": "p2",
            "medecinId": "m101",
            "date": "2025-03-01",
            "medicaments": [
                {
                    "idMedicament": "m002",
                    "quantiteParJour": 1,
                    "duree": 5
                },
                {
                    "idMedicament": "m004",
                    "quantiteParJour": 3,
                    "duree": 2
                }
            ]
        }
    ],
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
