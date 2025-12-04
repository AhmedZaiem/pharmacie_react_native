import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { initializeUsers } from './api/userService';
import { initializeOrdonnances } from './api/ordonnanceService';
import { useAuthStore } from './store/authStore';
import { resetOrdonnances } from './api/ordonnanceService';

export default function App() {
  const { loadUser } = useAuthStore();
  useEffect(() => {
    initializeUsers();
    initializeOrdonnances();
    resetOrdonnances();
    loadUser(); 
  }, []);

  return <AppNavigator />;
}


