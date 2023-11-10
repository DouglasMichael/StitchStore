import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Dimensions } from 'react-native';
import imagem1 from '../../assets/image1.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();

  const handleNavigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Logar = async () => {
    try {
      const response = await axios.post("http://192.168.15.22:4000/api/v1/login", {
        Email: email,
        senha: password
      })
      
      AsyncStorage.setItem('token', JSON.stringify(response.data))
      navigation.navigate('Home'); 

    } catch (error) {
      console.log(error)
      if(!error.response){
        alert("erro inersperado, contate o desenvolvedor")        
      } else{
        if(error.response.status == 404){
          alert("Email ou Senha incorretos!")
        }
      }
    }

  };
  const handleNavigateToEsqueciSenha = () => {
    navigation.navigate('EsqueciSenha'); // Navegar para a página "EsqueciSenha"
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imagem1} style={styles.logo} />
      <Text style={styles.title}>Stitch Store</Text>
      <Text style={styles.texto}>Sign in to continue.</Text>
      <Text style={styles.textoInput}>EMAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Email"
        keyboardType='email-address'
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text style={styles.textoInput}>SENHA</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        onPress={Logar}
        style={styles.button}
      >
        <Text style={styles.textoInput2}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleNavigateToEsqueciSenha}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToCadastro}>
          <Text style={styles.forgotPassword}>Cadastre-se</Text>
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
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    fontSize: 15,
    marginBottom: 30,
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
    justifyContent:'center',
  },
  input: {
    backgroundColor: "#83BAE3",
    width: '100%',
    height: 40,
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
    alignItems:'center',
   justifyContent:'center',
   display:'flex',
  },
  forgotPassword: {
    fontSize: 15,
    marginTop: 10,
    color: '#ED4667',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
