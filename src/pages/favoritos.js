import React, { useEffect, useState} from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase.config';

const Favoritos = () => {
    const navigation = useNavigation();
    const [ImageUrls, setImageUrls] = useState([])
    const [produtos, setProdutos] = useState("")

    useEffect(() =>{
        pegarProdutos()
    },[])

    const pegarProdutos = async() =>{
        let listaProdutos = []
        var listaUrl = []

        listaProdutos = JSON.parse(await AsyncStorage.getItem('favoritos'))
        setProdutos(JSON.parse(await AsyncStorage.getItem('favoritos')))
 
        for (let index = 0; index < listaProdutos.length; index++) {
            const reference = ref(storage,`produtos/Produto${listaProdutos[index].CodigoProduto}.png`)
            const URL = await getDownloadURL(reference)
            listaUrl.push(URL)
        }
 
        setImageUrls(listaUrl)
    }


    return (
        <View style={{ backgroundColor: "#F3D9F2", width: "100%", height: "100%" }}>

            <View style={{ width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center', paddingTop: 50 }}>
                <TouchableOpacity
                     onPress={() => navigation.navigate("Home")}
                >
                    <Image source={require("../../assets/icons/menu.png")} style={{ width: 44, height: 44, }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Meus Favoritos</Text>
                <View style={{flexDirection: "row", width: '20%', justifyContent: 'space-around',}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notificacao")}>
                        <Image source={require('../../assets/icons/notificacao.png')} style={{ width: 40, height: 40, }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/icons/carrinho.png')} style={{ width: 48, height: 44, }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ width: "100%", height: 200, marginTop: 50, justifyContent: 'flex-end', alignItems: "center", }}>
                <Image source={require('../../assets/Stitch2.png')} style={{ width: 200, height: 220}} />
            </View>
            <View style={{width:'100%', height:1, backgroundColor: "#F5F5F5", marginTop: 10}}></View>
            <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center',}}>
                {ImageUrls.length >0 ?
                produtos.map((item, index) => {
                    return(
                        <TouchableOpacity key={index} style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                            <Image source={{uri: ImageUrls[index]}} style={{width: '100%', height: '70%', position: 'absolute'}} resizeMode='cover'/>
                            <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9, position: 'absolute', top: 140,}}>{item.nomeProduto}</Text>
                            <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10, position: 'absolute', top: 160}}>R$ {item.precoProduto}</Text>
                        </TouchableOpacity>
                    )
                }): null}
            </View>

        </View>
    )

};

export default Favoritos;
