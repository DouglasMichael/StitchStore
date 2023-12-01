import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref } from 'firebase/storage';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { storage } from '../firebase.config';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

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
    const navigation = useNavigation();
    const [ImageUrls, setImageUrls] = useState([])
    const [produtos, setProdutos] = useState("")
    const [PrecoTotal, setPrecoTotal] = useState(0)

    useEffect(() =>{
        pegarProdutos()
        precoCarrinho()
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

    async function atualizarQuantidade(productId,quantidadeInt) {
        const carrinho = JSON.parse(await AsyncStorage.getItem('carrinho'))
        if (carrinho) {
            const atualizadoCartItems = carrinho.map((item, index) => {
                if (index === productId) {
                    if (item.quantidade >=1) {
                        if (quantidadeInt <0 && item.quantidade ==1 ) {
                            return { ...item, quantidade: 1 };    
                        }
                        return { ...item, quantidade: item.quantidade + quantidadeInt };
                    }
                }
    
                return item;
            });
            await AsyncStorage.setItem('carrinho', JSON.stringify(atualizadoCartItems))
            pegarProdutos()
            precoCarrinho()
        }
    }
    const precoCarrinho = async() => {
        const carrinho = JSON.parse(await AsyncStorage.getItem('carrinho'))
            var total = 0
            carrinho.map((item) => {
                total = total + (parseFloat(item.precoProduto) * parseFloat(item.quantidade))
            })
            setPrecoTotal(total)
    }

    const apagarCarrinho = async() =>{
        if (await AsyncStorage.getItem('carrinho')) {   
            await AsyncStorage.removeItem('carrinho')
            alert("Carrinho apagado!")
            navigation.navigate("Produtos")
        }
        else{
    
            alert("Você não possui um carrinho ainda!")
        }
    }

    const fazerPedido = async() => {
        const token = JSON.parse(await AsyncStorage.getItem('token')).accessToken
        const carrinho = JSON.parse(await AsyncStorage.getItem('carrinho'))
        try {
            const pedido = await axios.post('http://10.109.83.7:3000/api/v1/pedidos/',{total: PrecoTotal}, {headers: {Authorization: `JWT ${token}`}})
            carrinho.forEach(async(element) => {
                const itens = await axios.post('http://10.109.83.7:3000/api/v1/itens/',{
                    CodigoProduto: element.CodigoProduto,
                    CodigoPedido: pedido.data,
                    TotalXQuantidade: parseFloat(element.precoProduto) * element.quantidade,
                    Quantidade: element.quantidade
                })
            });
            alert("Pedido feito com sucesso!")
            await AsyncStorage.removeItem('carrinho')
            setImageUrls([])
            setPrecoTotal(0)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
               <TouchableOpacity  onPress={() => navigation.navigate("Home")}>
                    <Image source={require("../../assets/icons/menu.png")} style={{width: 44, height: 44,}}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Todos os produtos</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notificacao')}>
                    <Image source={require('../../assets/icons/notificacao.png')} style={{ width: 40, height: 40, }} />
                </TouchableOpacity>
            </View>
            <View>
                  {ImageUrls.length >0 ?
                    produtos.map((item, index) => {
                    return(
                        <>
                        <View key={index} style={{width: 100, height: 70, flexDirection:'row'}}>
                            <Image source={{uri: ImageUrls[index]}} style={{width: '100%', height: '100%'}}/>
                            <View style={{marginLeft: 20}}>
                                <Text style={{fontSize: 20, fontWeight:500}}>{item.nomeProduto}</Text>
                                <Text style={{fontSize: 15, fontWeight:700, color:'#ED4667'}}>R$ {item.precoProduto}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', width: 128}}>
                                    <TouchableOpacity onPress={() => atualizarQuantidade(index,-1)} style={{backgroundColor: '#ED4667', paddingHorizontal: 5, borderRadius: 8,}}><Text> - </Text></TouchableOpacity>
                                    <Text style={{fontSize: 14}}>{item.quantidade}</Text>
                                    <TouchableOpacity onPress={() => atualizarQuantidade(index,1)} style={{backgroundColor: '#ED4667', paddingHorizontal: 5, borderRadius: 8,}}><Text> + </Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: '#9d9d9d', marginVertical: 10,}} />
                        </>
                    )
                }): null}
            </View>
            <View style={styles.totalContainer}>
                <View style={styles.line} />
                <Text style={styles.total}>Total a Pagar: R$ {PrecoTotal.toFixed(2)}</Text>
                <View style={{flexDirection: 'row', width: 200, justifyContent: 'space-between',}}>
                    <TouchableOpacity style={styles.botaoPagar} onPress={() => fazerPedido()}>
                        <Text style={styles.textoBotao}>Pagar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoPagar} onPress={() => apagarCarrinho()}>
                        <Text style={styles.textoBotao}>limpar</Text>
                    </TouchableOpacity>
                </View>
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
