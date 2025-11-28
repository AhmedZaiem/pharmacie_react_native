import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdonnanceListScreen from "../screens/patient/OrdonnanceListScreen";
import { OrdonnanceDetailScreen } from "../screens/patient/OrdonnanceDetailScreen";
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
    </Stack.Navigator>
  );
}