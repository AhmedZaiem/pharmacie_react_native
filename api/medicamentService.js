import { getItem, saveItem } from "./asyncStorage";
import medicamentPresetList from "../data/medicamentPresetList.json";

const MEDICAMENT_KEY = "medicaments";

export const getMedicaments = async () => {
    const data = await getItem(MEDICAMENT_KEY);
    if (!data || data.length === 0) {
        await saveItem(MEDICAMENT_KEY, medicamentPresetList);
        return medicamentPresetList;
    }
    return data;
};

export const addMedicament = async (medicament) => {
    const meds = await getMedicaments();
    const newList = [...meds, medicament];
    await saveItem(MEDICAMENT_KEY, newList);
    return newList;
};

export const updateMedicament = async (id, updated) => {
    const meds = await getMedicaments();
    const newList = meds.map((m) => (m.id === id ? { ...m, ...updated } : m));
    await saveItem(MEDICAMENT_KEY, newList);
    return newList;
};

export const deleteMedicament = async(id) => {
    const meds = await getMedicaments();
    const newList = meds.filter((m) => m.id !== id);
    await saveItem(MEDICAMENT_KEY, newList);
    return newList;
};