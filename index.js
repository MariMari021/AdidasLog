import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StatusBar, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConnection';

export function Index({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'gerente@gmail.com') {
        setUser(user);
      } else {
        navigation.navigate('Login');
      }
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe on unmount
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao deslogar: ', error);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={{ backgroundColor: '#EAEEEF' }}>
      <StatusBar backgroundColor="#eaeeef" barStyle="dark-content" />
      <View style={style.container}>
        <View style={style.parteUm}>
          <View style={style.headerContainer}>
            <View style={style.header}>
              <Image source={require('./assets/logo.png')} style={style.logo} />
              <Text style={style.headerTexto}>Adidas<Text style={style.destaqueLogo}>Log</Text></Text>
            </View>
            <TouchableOpacity style={style.logout} onPress={handleLogout}>
              <Text style={style.sair}>Sair</Text>
              <Image source={require('./assets/logout.png')} style={style.sairIcon} />
            </TouchableOpacity>
          </View>
          <View style={style.containerImagem}>
            <Image source={require('./assets/tenis.png')} style={style.tenis} />
            <View style={style.conteudoImagem}>
              <Image source={require('./assets/work.png')} style={style.work} />
              <View style={style.caixaAmarela}>
                <Text style={style.workTexto}>Just for Workers</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={style.parteDois}>
          <View style={style.Destaque}>
            <Text style={style.titulo}>Inventário</Text>
            <Text style={style.subtitulo}>Cadastro dos produtos</Text>
          </View>
          <View style={style.textoConteudo}>
            <Text style={style.texto}>
              Estamos empolgados em apresentar a você nossa nova funcionalidade de cadastro de calçados e sapatos. Aqui, você poderá adicionar facilmente informações detalhadas sobre os produtos que deseja vender ou organizar.
            </Text>
          </View>
          <View style={style.botaoContainer}>
            <Text style={style.clique}>Clique e cadastre!</Text>
            <TouchableOpacity style={style.botao} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={style.botaoTexto}>Ir cadastrar</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    </ScrollView>
  );
};


const style = StyleSheet.create({
  sair:{
    fontWeight:'700',
    fontSize:17
  },
  sairIcon:{
    width:35,
    height:35
  },
  container: {

  },
  parteUm: {
    paddingTop: '8%',
    paddingStart: '12%',
    paddingEnd: '12%',
    padding: '14%',
    marginBottom: 35
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  destaqueLogo: {
    color: '#EDE734'
  },
  containerImagem: {
    flexDirection: 'row',
  },
  tenis: {
    top: '23%',
    width: 247,
    height: 193,
  },
  conteudoImagem: {
    flexDirection: 'column'
  },
  work: {
    top: '10%',
    left: 14,
    width: 22.3,
    height: 22,
  },
  caixaAmarela: {
    top: '40%',
    right: 43,
    backgroundColor: '#FFDD00',
    borderRadius: 5,
    fontSize: 12,
    color: '#000',
    transform: [{ rotate: '90deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: 137,
  },
  workTexto: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700'
  },
  parteDois: {
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingBottom: '14%',
    paddingEnd: '12%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  textoConteudo: {
    paddingTop: '7%',
    paddingStart: '12%',
    paddingBottom: '10%',
  },
  texto: {
    textAlign: 'justify',
    fontWeight: '400',
    fontSize: 17.5,
    color: 'rgba(0, 0, 0, 0.72)'
  },
  botaoContainer: {
    paddingStart: '12%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '2%',
  },
  clique: {
    width: 85,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.62)',
    fontSize: 17.8
  },
  botao: {
    backgroundColor: '#616161',
    width: 186,
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
  logout: {
    flexDirection: "row",
    alignItems: "center"
  }



});



