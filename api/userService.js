import {getItem,saveItem} from"./asyncStorage";

const USER_KEY = "users";

const defaultUsers = [
    {
        id: 1,
        role: "patient",
        name: "Ahmed Zaiem",
        email: "ahmed@gmail.com",
        password: "1234",
    },
    {
        id: 2,
        role: "pharmacien",
        name: "Pharmacien 1",
        email: "pharma1@gmail.com",
        password: "1234",
    },
];

export const initializeUsers = async () => {
    const existing = await getItem(USER_KEY);

    if (!existing) {
        await saveItem(USER_KEY, defaultUsers);
    }
};

export const getUsers = async () => {
    await initializeUsers();
    return (await getItem(USER_KEY)) || [];
};

