import { getItem, saveItem } from "./asyncStorage";

const ORDONNANCE_KEY = "ordonnances";

const defaultOrdonnances = [
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
];

export const initializeOrdonnances = async () => {
    const existing = await getItem(ORDONNANCE_KEY);
    if (!existing) {
        await saveItem(ORDONNANCE_KEY, defaultOrdonnances);
    }
};
        

export const getOrdonnances = async () => {
    return (await getItem(ORDONNANCE_KEY)) || [];
};
export const addOrdonnance = async (ordonnance) => {
    const ords = await getOrdonnances();
    const newList = [...ords, ordonnance];
    await saveItem(ORDONNANCE_KEY, newList);
    return newList;
};
export const updateOrdonnance = async (id, updated) => {
    const ords = await getOrdonnances();
    const newList = ords.map((o) => (o.id === id ? { ...o, ...updated } :
        o));
    await saveItem(ORDONNANCE_KEY, newList);
    return newList;
};