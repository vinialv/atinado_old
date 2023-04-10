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
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function Categorias({ navigation }) {

    const isFocused = useIsFocused();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataCategorias, setDataCategorias] = useState([]);

    const param = route.params.param;

    var i = 0;

    function navigateTo(value) {
        param == 1 ?
            navigation.navigate("Listagem", { id: value, aux: 1, param: param })
            :
            navigation.navigate("Produtos", { id: value, aux: value, param: param })
    }

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APICategorias.php', { param: param });
        setDataCategorias(response.data);

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

            <Text style={[styles.tituloGrande, {color:colors.amarelo}]}>{param == 1 ? "Profissionais" : "Produtos"}</Text>

                {
                    dataCategorias != false ?
                        dataCategorias.map(function (item) {

                            i++;

                            return (
                                <TouchableOpacity activeOpacity={0.8} style={[styles.borderTop, styles.paddingBottom10, i == 1 ? { borderTopWidth: 0} : null]} key={item.id_categoria} onPress={() => navigateTo(item.id_categoria)}>
                                    <Text style={styles.titulo}>{item.nome}</Text>
                                </TouchableOpacity>
                            )
                        })
                        : <Text style={styles.textItem}>{loading ? "Nenhum registro disponível no momento" : "Carregando os registros..."}</Text>
                }

            </View>

        </ScrollView>
    )
}
