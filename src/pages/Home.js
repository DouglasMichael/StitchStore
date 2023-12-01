import { View, Image, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
    const navigation = useNavigation();

    const handleNavigateToNotificacao = () => {
        navigation.navigate('Notificacao');
    };

    const handleNavigateToFrete = (valorDoPedido) => {
        navigation.navigate('Frete', {valorDoPedido}); 
      };

    return(
        <ScrollView style={{backgroundColor: "#F3D9F2", width: "100%", height: "100%",}}>

            <View style={{width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center', paddingTop: 50}}>
                <TouchableOpacity>
                    <Image source={require("../../assets/icons/menu.png")} style={{width: 44, height: 44,}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{ width: 40, height: 40, }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notificacao')}>
                    <Image source={require('../../assets/icons/notificacao.png')} style={{ width: 40, height: 40, }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                    <Image source={require('../../assets/icons/carrinho.png')} style={{ width: 40, height: 40, }} />
                </TouchableOpacity>
            </View>

            <View style={{backgroundColor: "#adaef1", width: "100%", height: 158, marginTop: 9, justifyContent: 'flex-end', alignItems: "center",}}>
                <Image source={require('../../assets/stitch1.png')} style={{width: 154, height: 119}}/>
            </View>

            <View style={{width: "100%", height: 161, marginTop: 41, alignItems: "center"}}>

                <View style={{backgroundColor: "#FED2D3", width: "86.5%", height: "100%"}}>

                    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingVertical: 9, paddingHorizontal: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 700}} >Todas as Categorias</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
                            <Image source={require('../../assets/icons/ir.png')} style={{width: 29, height: 29,}} />
                        </TouchableOpacity>
                    </View>

                    <View style={{width: "100%", height: 1, backgroundColor: "#fff"}}/>

                    <View style={{width: "100%", height: "69.9%", flexDirection: "row", justifyContent: 'space-around', alignItems: 'center',}}>
                        <TouchableOpacity style={{alignItems: 'center',}}>
                            <Image source={require("../../assets/icons/saia.png")} style={{width: 49, height: 49,}}/>
                            <Text>Roupas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center',}}>
                            <Image source={require("../../assets/icons/bijuteria.png")} style={{width: 49, height: 49,}}/>
                            <Text>Bijuterias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center',}}>
                            <Image source={require("../../assets/icons/acessorio.png")} style={{width: 49, height: 49,}}/>
                            <Text>Acessorios</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={{width: "100%", height: 320, marginTop: 22, alignItems: "center"}}>

                <View style={{backgroundColor: "#FED2D3", width: "86.5%", height: "100%"}}>

                    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingVertical: 9, paddingHorizontal: 5}}>
                        <Text style={{fontSize: 25, fontWeight: 700, color: "#ED4667"}} >Super Ofertas!!</Text>
                        <TouchableOpacity>
                            <Image source={require('../../assets/icons/ir.png')} style={{width: 29, height: 29,}} />
                        </TouchableOpacity>
                    </View>

                    <View style={{width: "100%", height: 1, backgroundColor: "#fff"}}/>

                    <View style={{width: "100%", height: "85.5%", flexDirection: "row", justifyContent: 'space-around', alignItems: 'center',}}>
                       
                        <View>
                        <TouchableOpacity>
                                <Image source={require("../../assets/produto1.png")} style={{width: 105, height: 167}}/>
                            </TouchableOpacity>
                            <Text style={{padding: 3, color: "#ED4667", textAlign: "center", fontWeight: 700 }}>R$200,00</Text>
                        </View>

                        <View >
                            <TouchableOpacity>
                                <Image source={require("../../assets/produto2.png")} style={{width: 137, height: 167,}}/>
                            </TouchableOpacity>
                            <Text style={{padding: 3, color: "#ED4667", textAlign: "center", fontWeight: 700 }}>R$320,00</Text>
                        </View>
                
                    </View>

                </View>

            </View>
            
        </ScrollView>
    )
    
};

export default Home
