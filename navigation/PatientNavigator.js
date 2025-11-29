import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdonnanceListScreen from "../screens/patient/OrdonnanceListScreen";
import { OrdonnanceDetailScreen } from "../screens/patient/OrdonnanceDetailScreen";
import CommandeCreateScreen from "../screens/patient/CommandeCreateScreen";
import CommandeDetailScreen from "../screens/patient/CommandeDetailScreen";
import CommandeListScreen from "../screens/patient/CommandeListScreen";
const Stack = createNativeStackNavigator();

export default function PatientNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ordonnances"
        component={OrdonnanceListScreen}
      />
      <Stack.Screen
        name="OrdonnanceDetail"
        component={OrdonnanceDetailScreen}
      />
      <Stack.Screen
        name="CommandeCreate"
        component={CommandeCreateScreen}
        options={{ title: "Create Commande" }}
      />
      <Stack.Screen
        name="CommandeDetail"
        component={CommandeDetailScreen}
        options={{ title: "Commande Details" }}
      />
      <Stack.Screen
        name="Commandes"
        component={CommandeListScreen}
      />
      
    </Stack.Navigator>
  );
}