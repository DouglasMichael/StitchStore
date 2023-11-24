import React, { useState } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login';
import Cadastro from './src/pages/cadastro';
import { AppLoading } from 'expo';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Favoritos from "./src/pages/favoritos";
import EsqueciSenha from '../StitchStore/src/pages/EsqueciSenha';
import Home from "./src/pages/Home";
import Notificacao from "./src/pages/Notificacoes";
import FreteScreen from "./src/pages/Frete";
import Produtos from "./src/pages/produtos";
import Carrinho from "./src/pages/Carrinho";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen
          name="Produtos"
          component={Produtos}
          options={{headerShown: false, title: "Home"}}
        /> */}
        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{headerShown: false, title: "Home"}}
        /> */}
        {/* <Stack.Screen
          name="Favoritos"
          component={Favoritos}
          options={{headerShown: false, title: "Home"}}
          /> */}
        {/* <Stack.Screen
          name="EsqueciSenha"
          component={EsqueciSenha}
          options={{headerShown: false, title: "Home"}}
        /> */}
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, title: "Home"}}
        /> */}
        {/* <Stack.Screen
          name="Notificacao"
          component={Notificacao}
          options={{headerShown: false, title: "Home"}}
        /> */}
        {/* <Stack.Screen
          name="Frete"
          component={FreteScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#F3D9F2',
            },
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;