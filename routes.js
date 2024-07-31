import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebaseConnection'; // Import the auth from your firebaseConnection.js
import { Index } from './index';
import { Cadastro } from './cadastro';
import { Login } from './login';

const Stack = createStackNavigator();

export function Routes() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'gerente@gmail.com') {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Index"
            component={Index}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
