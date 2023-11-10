import React, { useEffect, useState} from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, where, getDocs,getFirestore, Firestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.config';
import axios from 'axios';


const Produtos = () => {
    const navigation = useNavigation();
    const [ImageUrls, setImageUrls] = useState([])
    const [caminhos, setCaminhos] = useState("")

    // useEffect(() =>{
    //     pegarProdutos()
    // },[])

    // useEffect(() =>{
    //     teste()
    // },[produtos])

    const handleNavigateToNotificacao = () => {
        navigation.navigate('Notificacao');
    };
    const handleNavigateToHome = () => {
        navigation.navigate('Home');
    };

    const pegarProdutos = async() =>{
        try {
            const response = await axios.get()
        } catch (error) {
            
        }
        let listaProdutos = []
        let listacomImages = []
        var listaUrl = []
 
        for (let index = 0; index < listacomImages.length; index++) {
            const reference = ref(storage,"imagens/"+listacomImages[index]+".png")
            const URL = await getDownloadURL(reference)
            listaUrl.push(URL)
        }
 
        setImageUrls(listaUrl)
    }

    // const teste = () =>{
    //     fetch('file///C:/Users/Pichau/Desktop/Projeto_Michael_Adhayne/StitchStore/assets/imagens/Produto1.png').then(res => console.log(res))
        
    // }

    return (
        <ScrollView style={{ backgroundColor: "#F3D9F2", width: "100%", height: "100%"}}>

            <View style={{ width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                <TouchableOpacity
                     onPress={pegarProdutos}
                >
                    <Image source={require("../../assets/icons/menu.png")} style={{ width: 44, height: 44, }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Meus Favoritos</Text>
                <TouchableOpacity onPress={handleNavigateToNotificacao}>
                    <Image source={require('../../assets/icons/carrinho.png')} style={{ width: 48, height: 44, }} />
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", height: 180, marginTop: 10, alignItems: "center"}}>
                <Image source={require('../../assets/Stitch2.png')} style={{ width: 140, height: 155}} />
            </View>
            <View style={{width:'100%', height:1, backgroundColor: "#F5F5F5"}}/>
            <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center',}}>
                {produtos.map((item, index) => {
                    return(
                        <View key={index} style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                            <Image key={index} source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                            <Image source={require('../../assets/imagens/Produto1.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                            <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>{item.nomeProduto}</Text>
                            <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ {item.precoProduto}</Text>
                        </View>
                    )
                })}
                {/* <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto2.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Agenda personalizada</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 40,00 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto3.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Almofada personalizada</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 23,50 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto4.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Bruxo Stitch</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 27,00 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto5.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Moletom Feminino</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 30,90 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto6.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Roupa Pet</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 20,00 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto7.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Camiseta Juvenil</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 43,30 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto8.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Vestido Infantil</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 70,00 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto9.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Colar Stitch</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 49,90 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto10.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Pingente Stitch</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 20,00 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto11.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Berloque - Aço</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 25,00 </Text>
                </View>
                <View style={{ width: 180, marginTop: 28, flexDirection: "col", height:199, backgroundColor: "#ffffff", marginLeft:20, borderRadius:8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.25, shadowRadius: 3.84, elevation: 5}}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{position:"absolute", zIndex:10, marginLeft:130, marginTop:1, width: 40, height: 40, }} />
                    <Image source={require('../../assets/imagens/Produto12.png')} style={{ width: 180, height: 136, borderTopRightRadius:8, borderTopLeftRadius: 8}} />
                    <Text style={{fontSize: 14, fontWeight:500, marginLeft: 9}}>Conjunto Lilo Stitch</Text>
                    <Text style={{fontSize: 20, fontWeight:700, marginLeft: 9, color:'#ED4667', marginTop:10}}>R$ 70,00 </Text>
                </View> */}
            </View>

        </ScrollView>
    )

};

export default Produtos;
