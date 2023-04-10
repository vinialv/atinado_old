import React, { useEffect, useState } from 'react';
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

export default function Cutucadas({ navigation }) {

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataCutucadas, setDataCutucadas] = useState([]);

    var i = 0;

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APIOfertas.php', { param: 0 });
        setDataCutucadas(response.data);

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

                {   
                    dataCutucadas.length > 0 && dataCutucadas != false ?
                        dataCutucadas.map(function (item) {
                            i++;
                            return (
                                <View style={[styles.borderTop, i == 1 ? {borderTopWidth: 0,} : null]}>
                                    <Text style={styles.titulo}>{item.titulo}</Text>
                                    <Text style={styles.texto}>{item.conteudo}</Text>
                                </View>
                            )
                        })
                        : <Text style={styles.textItem}>{loading ? "Nenhum recado disponível no momento" : "Carregando os recados..."}</Text>
                }

            </View>

        </ScrollView>
    )
}
