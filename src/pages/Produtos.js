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

export default function Produto({ navigation }) {

    const isFocused = useIsFocused();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataItem, setDataItem] = useState([]);

    const param = route.params.param;
    const aux = route.params.aux;

    function navigateToVisualizar(value) {
        navigation.navigate('VisualizarProduto', { id: value, param: param });
    }

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APIProdutos.php', { param: 0, aux: aux, pesq: 0, });
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

                {dataItem != false ?
                    dataItem.map(function (item) {

                        return (

                            <View style={[styles.itens, styles.assinante]} key={item.id}>
                                <Text style={styles.tituloGrande}>{item.titulo}</Text>

                                {item.imagem != null && item.imagem != "" ?
                                    <View style={[styles.itens]}>
                                        <Image style={[styles.imagem]} source={{ uri: 'https://atinado.com.br/atinado/images/divulgacao/' + item.imagem + '.jpg' }} />
                                    </View>
                                    : null}

                                <View style={[styles.borderTop, { borderTopWidth: 0 }]}>
                                    <Text style={[styles.preco, { textAlign: 'left' }]}>{item.valor == 0 ? "Preço a consultar" : "R$" + item.valor + ",00"}</Text>
                                    {item.descricao != null && item.descricao != "" ? <Text style={styles.texto}>{item.descricao}</Text> : null}
                                </View>

                                <View style={[styles.borderTop, { borderTopWidth: 0 }]}>
                                    <Text style={styles.titulo}>Dados de contato</Text>
                                    {item.responsavel != null && item.responsavel != "" ? <Text style={styles.texto}>{item.responsavel}</Text> : null}
                                    {item.telefone != null && item.telefone != "" ? <Text style={styles.texto}>{item.telefone}</Text> : null}
                                    {item.whatsapp != null && item.whatsapp != "" ? <Text style={styles.link} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=55' + item.whatsapp)}>{item.whatsapp}</Text> : null}
                                </View>

                            </View>

                        )
                    })

                    : null}

            </View>

        </ScrollView>
    )
}
