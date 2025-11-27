import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { usePatientStore } from "../store/patientStore";
import AuthNavigator from "./AuthNavigator";
import PatientNavigator from "./PatientNavigator";
import PharmacienNavigator from "./PharmacienNavigator";

export default function AppNavigator() {
    const user = usePatientStore((state) => state.user);

    return (
        <NavigationContainer>
            {user ? (
                <AuthNavigator />
            ) : user?.role === "patient" ? (
                <PatientNavigator />
            ) : (
                <PharmacienNavigator />
            )}
        </NavigationContainer>
    );
}