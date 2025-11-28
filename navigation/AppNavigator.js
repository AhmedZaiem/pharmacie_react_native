import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";
import AuthNavigator from "./AuthNavigator";
import PatientNavigator from "./PatientNavigator";
import PharmacienNavigator from "./PharmacienNavigator";

export default function AppNavigator() {
    const user = useAuthStore((state) => state.user);

    return (
        <NavigationContainer>
            {user === null ? (
                <AuthNavigator />
            ) : user?.role === "patient" ? (
                <PatientNavigator />
            ) : (
                <PharmacienNavigator />
            )}
        </NavigationContainer>
    );
}