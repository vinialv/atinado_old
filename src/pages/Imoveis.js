import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    ScrollView,
    RefreshControl,
    BackHandler,
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    ActivityIndicator,
    Linking
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function Imoveis({ navigation }) {

    const isFocused = useIsFocused();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataItem, setDataItem] = useState([]);

    const param = route.params.param;

    function navigateToListagem() {
        navigation.navigate('ListagemImobConc', { param: param });
    }

    function navigateToVisualizar(value) {
        navigation.navigate('VisualizarImovel', { id: value, param: param });
    }

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APIImoveis.php', { param: param });
        setDataItem(response.data);

        setLoading(true);
        if (refreshing) setRefreshing(false);
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshLoad}
                    colors={[colors.azulEscuro, colors.azul, colors.branco]}
                />
            }>

            <View style={[styles.header]}>
                <ImageBackground source={require('../images/header.jpg')} style={styles.background}>
                    <View style={[styles.flexHorizontal, styles.header]}>
                        <Image style={[styles.logo]} source={require('../images/logo.png')} />
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.container}>

                {loading ? null : <Text style={styles.tituloGrande}>Carregando os registros...</Text>}

                {
                    param == 2 || param == 3 ?
                        <TouchableOpacity onPress={navigateToListagem} activeOpacity={0.8} style={[styles.itens, styles.bgAmarelo, { marginVertical: 20 }]}>
                            <Text style={[styles.textItem, styles.corBranco]}>Confira as imobiliárias</Text>
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    param == 5 ?
                        <TouchableOpacity onPress={navigateToListagem} activeOpacity={0.8} style={[styles.itens, styles.bgAmarelo, { marginVertical: 20 }]}>
                            <Text style={[styles.textItem, styles.corBranco]}>Confira os estacionamentos</Text>
                        </TouchableOpacity>
                        :
                        null
                }

                {param == 4
                    ? dataItem != false ?
                        dataItem.map(function (item) {

                            return (

                                <TouchableOpacity style={[styles.itens]} onPress={() => navigateToVisualizar(item.id)} activeOpacity={0.8} key={item.id}>
                                    {item.imagem != null && item.imagem != "" ? <Image style={[styles.imagem]} source={{ uri: 'https://atinado.com.br/atinado/images/divulgacao/' + item.imagem + '.jpg' }} /> : null}
                                    <Text style={[styles.titulo]}>{item.titulo}</Text>
                                    <Text style={[styles.preco]}>{item.valor == 0 ? "Preço a consultar" : "R$" + item.valor + ",00"}</Text>
                                </TouchableOpacity >

                            )
                        })

                        : null
                    : dataItem != false ?
                        dataItem.map(function (item) {

                            return (

                                <TouchableOpacity style={[styles.itens]} key={item.id} activeOpacity={0.8}>
                                    <Text style={[styles.titulo]}>{item.titulo}</Text>
                                    <Text style={[styles.preco, { textAlign: 'left' }]}>{item.valor == 0 ? "Preço a consultar" : "R$" + item.valor + ",00"}</Text>
                                    {item.imagem != null && item.imagem != "" ? <Image style={[styles.imagem]} source={{ uri: 'https://atinado.com.br/atinado/images/divulgacao/' + item.imagem + '.jpg' }} /> : null}
                                    {item.descricao != null && item.descricao != "" ? <Text style={styles.texto}>{item.descricao}</Text> : null}
                                    {item.responsavel != null && item.responsavel != "" ? <Text style={styles.texto}>{item.responsavel}</Text> : null}
                                    {item.telefone != null && item.telefone != "" ? <Text style={styles.texto}>{item.telefone}</Text> : null}
                                    {item.whatsapp != null && item.whatsapp != "" ? <Text style={styles.link} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=55' + item.whatsapp)}>{item.whatsapp}</Text> : null}
                                </TouchableOpacity >

                            )
                        }) : null}

            </View>

        </ScrollView>
    )
}
