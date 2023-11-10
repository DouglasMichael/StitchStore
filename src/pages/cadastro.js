import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import imagem1 from "../../assets/image2.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";



const { width, height } = Dimensions.get("window");

const Cadastro = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [CEP, setCEP] = useState("");
  const [Logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [Bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [UF, setUF] = useState("");
  const [Complemento, setComplemento] = useState("");

  const [dataNasc, setdataNasc] = useState();
  const [Disable, setDisable] = useState(true);

  const  enderecoAutomatico = async (CEP) =>{
    try {
        if(CEP.length == 0){
            setNumero("")
            setComplemento("")
            setLogradouro("")
            setBairro("")
            setCidade("")
            setUF("")
            setDisable(true)
        }
        if(CEP.length == 8){
            const response = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`)
            setCEP(CEP)
            setLogradouro(response.data.logradouro)
            setBairro(response.data.bairro)
            setCidade(response.data.localidade)
            setUF(response.data.uf)
            setDisable(false)
            
        }

    } catch (error) {
        console.log(error);
        
    }
  }

  const Cadastrar = async () => {
    try {
        const response = await axios.post("http://192.168.15.22:4000/api/v1/cadastro/",{
            Nome: nome,
            Email: email,
            senha: password,
            DataNasc: dataNasc,
            Logradouro: Logradouro,
            Numero: numero,
            Complemento: Complemento,
            Bairro: Bairro,
            Cidade: Cidade,
            CEP: CEP,
            UF: UF
        })

        if(response.status == 201){
            alert("Cadastrado com sucesso!")
            navigation.navigate("Login")
            
        }
    } catch (error) {
        alert("erro inersperado, contate o desenvolvedor")
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FED2D3",
        }}
      >
        <Image source={imagem1} style={styles.logo} />
      </View>
      <View style={{ backgroundColor: "#F3D9F2", padding: 20 }}>
        <Text style={styles.title}>Criar nova</Text>
        <Text style={styles.title2}>Conta</Text>
        <Text style={styles.texto}>
          Ainda não é cadastrado? Cadastre-se aqui!
        </Text>
        <Text style={styles.textoInput}>NOME</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Digite seu nome"
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>
        <Text style={styles.textoInput}>EMAIL</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Digite seu email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <Text style={styles.textoInput}>SENHA</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <Text style={styles.textoInput}>Endereço</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="CEP"
            keyboardType="numeric"
            maxLength={8}
            onChangeText={(text) => {enderecoAutomatico(text)}}
          />

        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Logradouro"
            onChangeText={(text) => setLogradouro(text)}
            value={Logradouro}
            editable={Disable}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Nº"
            keyboardType="numeric"
            onChangeText={(text) => setNumero(text)}
            value={numero}
          />
        </View>
        <View style={styles.input}>
            <TextInput
              placeholder="Bairro"
              onChangeText={(text) => setBairro(text)}
              value={Bairro}
              editable={Disable}
            />
        </View>
        <View style={styles.input}>
            <TextInput
              placeholder="Cidade"
              onChangeText={(text) => setCidade(text)}
              value={Cidade}
              editable={Disable}
            />
        </View>
        <View style={styles.input}>
            <TextInput
              placeholder="UF"
              maxLength={2}
              onChangeText={(text) => setUF(text)}
              value={UF}
              editable={Disable}
            />
        </View>
        <View style={styles.input}>
            <TextInput
              placeholder="Complemento"
              onChangeText={(text) => setComplemento(text)}
              value={Complemento}
            />
        </View>

        <Text style={styles.textoInput}>DATA DE NASCIMENTO</Text>
        <View style={styles.input}>
            <TextInput
              placeholder="AAAA-MM-DD"
              onChangeText={(text) => setdataNasc(text)}
              value={dataNasc}
              keyboardType="number-pad"
            />
        </View>


        <TouchableOpacity onPress={Cadastrar} style={styles.button}>
          <Text style={styles.textoInput2}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.4,
    marginBottom: 30,
  },
  forma: {
    height: 700,
    width: 700,
    top: 200,
    left: -200,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#F3D9F2",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title2: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  texto: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
  },
  textoInput: {
    fontSize: 15,
    color: "#ED4667",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  textoInput2: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#83BAE3",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    height: 35,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  forgotPassword: {
    fontSize: 15,
    marginTop: 10,
    color: "#ED4667",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Cadastro;
