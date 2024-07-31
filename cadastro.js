import { bancoExterno } from './firebaseConnection';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, Modal, StyleSheet, FlatList } from 'react-native';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNModal from 'react-native-modal';

export function Cadastro() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCategoriaVisible, setModalCategoriaVisible] = useState(false);

  // Fetch categorias do Firestore
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const querySnapshot = await getDocs(collection(bancoExterno, 'categorias'));
        const categoriasArray = [];
        querySnapshot.forEach((doc) => {
          // Adiciona o ID como nome da categoria
          categoriasArray.push({ id: doc.id, nome: doc.id });
        });
        console.log('Categorias carregadas:', categoriasArray); // Depuração
        setCategorias(categoriasArray);
      } catch (e) {
        console.error('Erro ao buscar categorias: ', e);
      }
    };
    fetchCategorias();
  }, []);

  const handleCadastro = async () => {
    if (!nomeProduto || !categoria) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const produtoDoc = doc(collection(bancoExterno, 'categorias', categoria, 'produtos'), nomeProduto);
      await setDoc(produtoDoc, {
        nomeProduto,
        tamanho,
        cor,
        preco,
        descricao,
      });
      console.log('Produto cadastrado com sucesso!');
      setModalVisible(true);
    } catch (e) {
      console.error('Erro ao cadastrar produto: ', e);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNomeProduto('');
    setTamanho('');
    setCor('');
    setPreco('');
    setDescricao('');
    setCategoria('');
  };

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleNomeProdutoBlur = () => {
    setNomeProduto(capitalizeFirstLetter(nomeProduto));
  };

  const handleTamanhoBlur = () => {
    setTamanho(capitalizeFirstLetter(tamanho));
  };

  const handleCorBlur = () => {
    setCor(capitalizeFirstLetter(cor));
  };

  const handlePrecoChange = (text) => {
    const formattedText = text.replace(',', '.');
    setPreco(formattedText);
  };

  const handleDescricaoBlur = () => {
    setDescricao(capitalizeFirstLetter(descricao));
  };

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item); // Depuração
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setCategoria(item.id);
          setModalCategoriaVisible(false);
        }}
      >
        <Text style={styles.itemText}>{item.nome}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: '#EAEEEF' }}>
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
            <Text style={styles.titulo}>Cadastro!</Text>
            <Text style={styles.subtitulo}>Cadastro dos produtos</Text>
          </View>
          <View style={styles.containerForm}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="shopping-bag" size={22} color="#fff" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nome do produto"
                value={nomeProduto}
                onChangeText={setNomeProduto}
                onBlur={handleNomeProdutoBlur}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="list" size={22} color="#fff" />
              </View>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalCategoriaVisible(true)}
              >
                <Text style={styles.inputText}>
                  {categoria ? categorias.find(cat => cat.id === categoria)?.nome : 'Selecione uma categoria'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="expand" size={22} color="#fff" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Tamanho"
                value={tamanho}
                onChangeText={setTamanho}
                onBlur={handleTamanhoBlur}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="tint" size={22} color="#fff" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Cor"
                value={cor}
                onChangeText={setCor}
                onBlur={handleCorBlur}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="dollar" size={22} color="#fff" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Preço"
                value={preco}
                onChangeText={handlePrecoChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="align-left" size={22} color="#fff" />
              </View>
              <View style={styles.inputWithCounter}>
                <TextInput
                  style={styles.input}
                  placeholder="Descrição"
                  value={descricao}
                  onChangeText={setDescricao}
                  onBlur={handleDescricaoBlur}
                  maxLength={25}
                  multiline={true}
                />
                <Text style={styles.charCount}>{descricao.length}/25</Text>
              </View>
            </View>
          </View>
          <View style={styles.botaoContainer}>
            <Text style={styles.clique}>Clique e cadastre!</Text>
            <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
              <Text style={styles.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Image source={require('./assets/logo.png')} style={styles.logoModal} />
              <Text style={styles.modalText}>Cadastro realizado com sucesso!</Text>
              <Text style={styles.modalText2}>Visualize o produto adicionado no app <Text style={{ fontWeight: '800' }}>AdidasShoes</Text>.</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <RNModal
          isVisible={modalCategoriaVisible}
          onBackdropPress={() => setModalCategoriaVisible(false)}
        >
          <View style={styles.modalCategoriaContainer}>
            <FlatList
              data={categorias}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </RNModal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Defina seus estilos aqui
  modalCategoriaContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '60%',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  parteUm: {
    paddingTop: '8%',
    paddingStart: '12%',
    paddingEnd: '12%',
    padding: '14%',
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
  containerForm: {
    paddingTop: '12%',
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
  charCount: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    color: '#7f8c8d',
    fontSize: 12,
  },
  botaoContainer: {
    paddingTop: '7%',
    paddingStart: '12%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15.7%',
  },
  clique: {
    width: 85,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    paddingEnd: '6%',
    paddingStart: '6%',
  },
  modalText2: {
    textAlign: 'center',
    fontSize: 18,
    width: 255
  },
  modalButton: {
    backgroundColor: '#000',
    paddingHorizontal: 90,
    height: 45,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoModal: {
    width: 60,
    height: 60
  }


});
