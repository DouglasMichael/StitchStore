import React, { useState} from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Favoritos = () => {
    const navigation = useNavigation();

    const handleNavigateToNotificacao = () => {
        navigation.navigate('Notificacao');
    };
    const handleNavigateToHome = () => {
        navigation.navigate('Home');
    };


    return (
        <View style={{ backgroundColor: "#F3D9F2", width: "100%", height: "100%" }}>

            <View style={{ width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center', paddingTop: 50 }}>
                <TouchableOpacity
                     onPress={handleNavigateToHome}
                >
                    <Image source={require("../../assets/icons/menu.png")} style={{ width: 44, height: 44, }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Meus Favoritos</Text>
                <TouchableOpacity onPress={handleNavigateToNotificacao}>
                    <Image source={require('../../assets/icons/carrinho.png')} style={{ width: 48, height: 44, }} />
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", height: 200, marginTop: 50, justifyContent: 'flex-end', alignItems: "center", }}>
                <Image source={require('../../assets/Stitch2.png')} style={{ width: 200, height: 220}} />
            </View>
            <View style={{width:'100%', height:1, backgroundColor: "#F5F5F5", marginTop: 10}}></View>
            <View style={{ width: "100%", marginTop: 38, flexDirection: "row" }}>
                <Image source={require('../../assets/imagens/Produto1.png')} style={{ width: 180, height: 130, marginLeft:20}} />
            </View>

        </View>
    )

};

export default Favoritos;
