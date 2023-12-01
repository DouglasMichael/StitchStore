import React, { useEffect, useState} from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Produtos = () => {
    const navigation = useNavigation();
    const [ImageUrls, setImageUrls] = useState([])
    const [produtos, setProdutos] = useState("")

    useEffect(() =>{
        pegarProdutos()
    },[])

    const pegarProdutos = async() =>{
        let listaProdutos = []
        var listaUrl = []
        try {
            const response = await axios.get("http://10.109.83.7:3000/api/v1/produtos/")
            listaProdutos = response.data
            setProdutos(response.data)
        } catch (error) {
            console.log(error)
        }
 
        for (let index = 1; index <= listaProdutos.length; index++) {
            const reference = ref(storage,`produtos/Produto${[index]}.png`)
            const URL = await getDownloadURL(reference)
            listaUrl.push(URL)
        }
 
        setImageUrls(listaUrl)
    }

    const adicionarFavoritos = async (index) => {

        const value = await AsyncStorage.getItem('favoritos');

        const dadosExistente = value ? JSON.parse(value) : [];

        const elementoJaExiste = dadosExistente.some(item => (
            item.CodigoProduto === produtos[index].CodigoProduto
        ));

        if (!elementoJaExiste) {
            dadosExistente.push(produtos[index]);
            AsyncStorage.setItem('favoritos', JSON.stringify(dadosExistente));
          }
          alert("Item adicionado aos favoritos!")
    }

    const adicionarcarrinho = async (index) => {

        const value = await AsyncStorage.getItem('carrinho');

        const dadosExistente = value ? JSON.parse(value) : [];

        const elementoJaExiste = dadosExistente.some(item => (
            item.CodigoProduto === produtos[index].CodigoProduto
        ));

        if (!elementoJaExiste) {
            dadosExistente.push(produtos[index] = {CodigoProduto: produtos[index].CodigoProduto, nomeProduto: produtos[index].nomeProduto, precoProduto: produtos[index].precoProduto, quantidade: 1});
        
            AsyncStorage.setItem('carrinho', JSON.stringify(dadosExistente));
            alert("Item adicionado ao carrinho!")
          }
    }

    return (
        <ScrollView style={{ backgroundColor: "#F3D9F2", width: "100%", height: "100%"}}>

            <View style={{ width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                 <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
                    <Image source={require("../../assets/icons/menu.png")} style={{width: 44, height: 44,}}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Todos os produtos</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                    <Image source={require('../../assets/icons/carrinho.png')} style={{ width: 48, height: 44, }} />
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", height: 180, marginTop: 10, alignItems: "center"}}>
                <Image source={require('../../assets/Stitch2.png')} style={{ width: 140, height: 155}} />
            </View>
            <View style={{width:'100%', height:1, backgroundColor: "#F5F5F5"}}/>
            <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center',}}>
                {ImageUrls.length >0 ?
                produtos.map((item, index) => {
                    return(
                        <TouchableOpacity key={index} style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}} onPress={() => adicionarcarrinho(index)}>
                            <Image source={{uri: ImageUrls[index]}} style={{width: '100%', height: '70%', position: 'absolute'}} resizeMode='cover'/>
                            <TouchableOpacity onPress={() => adicionarFavoritos(index)}>
                                <Image key={index} source={require('../../assets/icons/coracao.png')} style={{width: 40, height: 40, position: 'absolute', left: 140}} resizeMode='cover'/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9, position: 'absolute', top: 140,}}>{item.nomeProduto}</Text>
                            <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10, position: 'absolute', top: 160}}>R$ {item.precoProduto}</Text>
                        </TouchableOpacity>
                    )
                }): null}
            </View>

        </ScrollView>
    )

};

export default Produtos;
