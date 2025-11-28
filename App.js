import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { initializeUsers } from './api/userService';
import { initializeOrdonnances } from './api/ordonnanceService';


export default function App() {
  useEffect(() => {
    initializeUsers();
    initializeOrdonnances();
  }, []);

  return <AppNavigator />;
}


