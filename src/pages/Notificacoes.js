import { View, Image, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notificacao = () => {
    const navigation = useNavigation();

    const handleNavigateToFavoritos = () => {
        navigation.navigate('Favoritos'); 
    };
    const handleNavigateToHome = () => {
        navigation.navigate('Home'); 
    };
    return (
        <View style={{backgroundColor: "#F3D9F2", width: "100%", height: "100%",}}>

            <View style={{width: "100%", height: 81, flexDirection: "row", justifyContent: "space-around", alignItems: 'center', paddingTop: 50}}>
                <TouchableOpacity  onPress={handleNavigateToHome}>
                    <Image source={require("../../assets/icons/menu.png")} style={{width: 44, height: 44,}}/>
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 700}}>Notificações</Text>
                <TouchableOpacity onPress={handleNavigateToFavoritos}>
                    <Image source={require('../../assets/icons/coracao.png')} style={{ width: 40, height: 40, }} />
                </TouchableOpacity>
            </View>

            <View style={{width: "100%", height: 200, marginTop: 9, justifyContent: 'flex-end', alignItems: "center",}}>
                <Image source={require('../../assets/Stitch2.png')} style={{width: 151, height: 200}}/>
            </View>

            <View style={{width: "100%", marginTop: 38, justifyContent: 'space-between', height: 121,}}>
                <TouchableOpacity style={{paddingLeft: 28, flexDirection: "row"}}>
                    <Image source={require("../../assets/icons/etiqueta.png")} style={{width: 41, height: 41}}/>
                    <View style={{paddingLeft: 17}}>
                        <Text style={{fontSize: 16, fontWeight: 700, }}>Promoções</Text>
                        <Text style={{fontSize: 16, fontWeight: 400}}>Confira essa e outras ofertas...</Text>
                    </View>
                </TouchableOpacity>

                <View style={{backgroundColor: "#fff", height: 1}}/>

                <TouchableOpacity style={{paddingLeft: 28, flexDirection: "row"}}>
                    <Image source={require("../../assets/icons/atualizacao.png")} style={{width: 48, height: 48}}/>
                    <View style={{paddingLeft: 17}}>
                        <Text style={{fontSize: 16, fontWeight: 700, }}>Atualizações Stitch Store</Text>
                        <Text style={{fontSize: 16, fontWeight: 400}}>Venha ver nossos lançamentos!!</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{width: "100%", backgroundColor: "#CCC", marginTop: 10, height: 28, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16}}>
                <Text style={{fontWeight: 700}}>Atualizações de pedidos</Text>
                <TouchableOpacity><Text style={{fontWeight: 700}}>Ler Tudo</Text></TouchableOpacity>
            </View>

            <TouchableOpacity style={{paddingLeft: 16, flexDirection: "row", marginTop: 20}}>
                    <Image source={require("../../assets/produto3.png")} style={{width: 60, height: 87}}/>
                    <View style={{paddingLeft: 16, width: "80%", justifyContent: 'space-around',}}>
                        <Text style={{fontSize: 12, fontWeight: 700, }}>Enviado</Text>
                        <Text style={{fontSize: 12, fontWeight: 400}}>Um pacote do pedido 230804Q8RUHSXP foi enviado por Sandi | iPhone Case & Airpods Case através do Expresso padrão. A ID de rastramento do pacote é NB559597750BR.             </Text>
                    </View>
                </TouchableOpacity>

            

        </View>
    )
  
};

export default Notificacao
