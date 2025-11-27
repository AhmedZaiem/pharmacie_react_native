import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import commandeListScreen from "../screens/pharmacien/CommandeListScreen";
import commandeDetailScreen from "../screens/pharmacien/CommandeDetailScreen";

const Stack = createNativeStackNavigator();

export default function PharmacienNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Commandes"
            component={commandeListScreen}
        />
        <Stack.Screen
            name="CommandeDetail"
            component={commandeDetailScreen}
        />
    </Stack.Navigator>
  );
}