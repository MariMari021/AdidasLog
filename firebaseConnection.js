

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDeUbTOqsAxoe-QIhoNVTlKsaUAG1UrBw",
  authDomain: "msg-123-2bc77.firebaseapp.com",
  projectId: "msg-123-2bc77",
  storageBucket: "msg-123-2bc77.appspot.com",
  messagingSenderId: "124212612710",
  appId: "1:124212612710:web:bc19f1ab5144ced0b367a7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const bancoExterno = getFirestore(app);

// Inicializa o Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Exporta o auth e bancoExterno
export { bancoExterno, auth };