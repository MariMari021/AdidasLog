import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { auth } from './firebaseConnection'; // Import auth from your firebaseConnection.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import functions from Firebase Auth
import { ScrollView } from 'react-native-gesture-handler';

export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.email === 'gerente@gmail.com') {
        navigation.navigate('Index');
      } else {
        setError('Acesso negado. Apenas gerente pode acessar esta página.');
        await auth.signOut(); // Log out unauthorized user
      }
    } catch (err) {
      setError('Falha na autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor="#eaeeef" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.parteUm}>
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.headerTexto}>Adidas<Text style={styles.destaqueLogo}>Log</Text></Text>
          </View>
        </View>
        <View style={styles.parteDois}>
          <View style={styles.Destaque}>
            <Text style={styles.titulo}>Login!</Text>
            <Text style={styles.subtitulo}>Inventário de produtos</Text>
          </View>
          <View style={styles.imgPrincipal}>
            <Image source={require('./assets/user-icon.png')} style={styles.userIcon} />
          </View>
          <View style={styles.containerForm}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image source={require('./assets/email-icon.png')} style={styles.inputIcon} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image source={require('./assets/password-icon.png')} style={styles.inputIcon2} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.botaoContainer}>
            <Text style={styles.clique}>Clique e faça login!</Text>
            <TouchableOpacity style={styles.botao} onPress={handleLogin}>
              <Text style={styles.botaoTexto}>Fazer Login</Text>
            </TouchableOpacity>
          </View>
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  parteUm: {
    paddingTop: '8%',
    paddingStart: '12%',
    paddingEnd: '12%',
    padding: '14%',
    marginBottom: 35
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    width: 160,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 15
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  headerTexto: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16.4
  },
  parteDois: {
    
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingBottom: '14%',
    paddingEnd: '12%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  destaqueLogo: {
    color: '#EDE734'
  },
  Destaque: {
    backgroundColor: '#FFDD00',
    paddingStart: '12%',
    paddingTop: '7%',
    paddingBottom: '7%',
    marginEnd: '10%'
  },
  titulo: {
    fontWeight: '800',
    fontSize: 27
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: 'rgba(0, 0, 0, 0.62)'
  },
  imgPrincipal: {
    alignItems: "center",
    paddingStart: '12%',
    paddingTop: '9%',
    paddingBottom: '7%'
  },
  userIcon: {
    width: 92,
    height: 90
  },
  containerForm: {
    paddingStart: '12%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    borderRadius: 5,
    marginRight: 8,
  },
  inputIcon:{
    width:25,
    height:25
  },
  inputIcon2:{
    width:27,
    height:27
  },
  inputWithCounter: {
    flex: 1,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#d9d9d9',
  },
  helperText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
  },
  botaoContainer: {
    paddingTop: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '36.7%',
  },
  clique: {
    width: 95,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.62)',
    fontSize: 17.8
  },
  botao: {
    backgroundColor: '#000',
    width: 194,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18
  },
  error: {
    color: '|#000',
    marginBottom: 12,
    textAlign: 'center',
    
  },
});

