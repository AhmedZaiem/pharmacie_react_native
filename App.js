import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { initializeUsers } from './api/userService';

export default function App() {
  useEffect(() => {
    initializeUsers();
  }, []);

  return <AppNavigator />;
}


