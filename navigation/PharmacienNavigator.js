import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommandeListScreen } from "../screens/pharmacien/CommandeListScreen";
import { CommandeDetailScreen } from "../screens/pharmacien/CommandeDetailScreen";  
import MedicamentListScreen from "../screens/pharmacien/MedicamentListScreen";
import MedicamentFormScreen from "../screens/pharmacien/MedicamentFormScreen";

const Stack = createNativeStackNavigator();

export default function PharmacienNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Commandes"
            component={ CommandeListScreen}
        />
        <Stack.Screen
            name="CommandeDetail"
            component={CommandeDetailScreen}
        />
        <Stack.Screen
            name="Medicaments"
            component={MedicamentListScreen}
        />
        <Stack.Screen
            name="MedicamentForm"
            component={MedicamentFormScreen}
        />
        
    </Stack.Navigator>
  );
}