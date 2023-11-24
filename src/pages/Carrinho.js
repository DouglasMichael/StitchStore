import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref } from 'firebase/storage';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { storage } from '../firebase.config';

const ItemCompra = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imagemContainer}>
                <View style={styles.imageWrapper}>
                    <Image source={item.imagem} style={styles.imagemCompra} />
                </View>
                <View style={styles.itemDetails}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.preco}>{item.preco}</Text>
                    <Text style={styles.quantidade}>{`Quantidade: ${item.quantidade}`}</Text>
                </View>
            </View>
        </View>
    );
};

const Carrinho = () => {
    const [ImageUrls, setImageUrls] = useState([])
    const [produtos, setProdutos] = useState("")

    useEffect(() =>{
        pegarProdutos()
    },[])

    const pegarProdutos = async() =>{
        let listaProdutos = []
        var listaUrl = []

        listaProdutos = JSON.parse(await AsyncStorage.getItem('carrinho'))
        setProdutos(JSON.parse(await AsyncStorage.getItem('carrinho')))
 
        for (let index = 0; index < listaProdutos.length; index++) {
            const reference = ref(storage,`produtos/Produto${listaProdutos[index].CodigoProduto}.png`)
            const URL = await getDownloadURL(reference)
            listaUrl.push(URL)
        }
 
        setImageUrls(listaUrl)
    }
    // const { carrinhoItens } = route.params;
    // const itensUnicos = {};

    // carrinhoItens.forEach((item) => {
    //     const key = item.nome;
    //     if (!itensUnicos[key]) {
    //         itensUnicos[key] = { ...item, quantidade: 0 };
    //     }
    //     itensUnicos[key].quantidade += 1;
    // });

    // const itensUnicosArray = Object.values(itensUnicos);
    // const [itensCarrinho, setItensCarrinho] = useState(itensUnicosArray);

    // const totalAPagar = itensUnicosArray.reduce((total, item) => {
    //     const precoNumerico = parseFloat(item.preco.replace('R$', '').trim().replace(',', '.'));
    //     const precoTotalItem = precoNumerico * item.quantidade;
    //     return total + precoTotalItem;
    // }, 0);

    // const limparCarrinho = () => {
    //     setItensCarrinho([]); // Define o carrinho como um array vazio ao clicar em "Pagar"
    // };

   

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Itens no Carrinho:</Text>
            <View>
                {/* {itensUnicosArray.map((item, index) => (
                    <ItemCompra key={index} item={item} />
                ))} */}
                  {ImageUrls.length >0 ?
                    produtos.map((item, index) => {
                    return(
                        <>
                        <View key={index} style={{width: 100, height: 70, flexDirection:'row'}}>
                            <Image source={{uri: ImageUrls[index]}} style={{width: '100%', height: '100%'}}/>
                            <View style={{marginLeft: 20}}>
                                <Text style={{fontSize: 20, fontWeight:500}}>{item.nomeProduto}</Text>
                                <Text style={{fontSize: 15, fontWeight:700, color:'#ED4667'}}>R$ {item.precoProduto}</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: '#9d9d9d', marginVertical: 10,}} />
                        </>
                    )
                }): null}
            </View>
            <View style={styles.totalContainer}>
                <View style={styles.line} />
                {/* <Text style={styles.total}>Total a Pagar: R$ {totalAPagar.toFixed(2)}</Text> */}
                <TouchableOpacity style={styles.botaoPagar}>
                    <Text style={styles.textoBotao}>Pagar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F3D9F2',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    preco: {
        fontSize: 16,
        color: '#ED4667',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    itemDetails: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    quantidade: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    imagemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    imageWrapper: {
        width: 100,
        height: 76,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 10,
    },
    imagemCompra: {
        width: '100%',
        height: '100%',
    },
    totalContainer: {
        paddingHorizontal: 16,
        marginTop: 20,
        alignItems: 'center',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#999',
        marginVertical: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ED4667',
    },
    botaoPagar: {
        marginTop: 20,
        backgroundColor: '#ED4667',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Carrinho;
