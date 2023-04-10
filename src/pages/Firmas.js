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
import { render } from 'react-dom';

export default function Firmas({ navigation }) {

    const isFocused = useIsFocused();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataFirmas, setDataFirmas] = useState([]);

    var i = 0;

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APIFirmas.php', { param: 0 });
        setDataFirmas(response.data);

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
                    dataFirmas != false ?
                        dataFirmas.map(function (item) {

                            i++;

                            return(

                                <View style={[styles.borderTop, i == 1 ? { borderTopWidth: 0, } : null]} key={item.id}>
                                    <Text style={styles.titulo}>{item.titulo}</Text>
                                    {item.telefone != null && item.telefone != "" ? <Text style={styles.subtitulo}>{item.telefone}</Text> : null}
                                    {item.endereco != null && item.endereco != "" ? <Text style={styles.texto}>{item.endereco}{item.numero != null && item.numero != null != "" ? ", " + item.numero : ''}{item.bairro != null && item.bairro != null != "" ? ", " + item.bairro : ''}</Text> : null}
                                </View>
                            )
                        })
                        : <Text style={styles.textItem}>{loading ? "Nenhum registro disponível no momento" : "Carregando os registros..."}</Text>
                    }

            </View>

        </ScrollView>
    )
}
