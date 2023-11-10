import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import imagem1 from '../../assets/image1.png';
import { useNavigation } from '@react-navigation/native'; 

const { width, height } = Dimensions.get('window');
const EsqueciSenha = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Implemente a lógica para redefinir a senha aqui
    // Isso pode incluir o envio de um e-mail com um link de redefinição de senha, etc.
    // Após a ação ser realizada com sucesso, você pode redirecionar o usuário de volta para a página de login.
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imagem1} style={styles.logo} />
      <Text style={styles.texto}>Digite o seu e-mail para redefinir a senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TouchableOpacity
        onPress={handleResetPassword}
        style={styles.button}
      >
        <Text style={styles.textoInput2}>Redefinir Senha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3D9F2',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    fontSize: 19,
    marginBottom: 30,
    fontWeight:'bold'
  },
  textoInput: {
    fontSize: 15,
    color: '#ED4667',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  textoInput2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: 35,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.4,
    marginBottom: 30,
},
});

export default EsqueciSenha;
