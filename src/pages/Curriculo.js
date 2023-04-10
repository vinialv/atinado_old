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

export default function Curriculo({ navigation }) {

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataCurriculos, setDataCurriculos] = useState([]);

    var i = 0;

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APICurriculos.php', { param: 0 });
        setDataCurriculos(response.data);

        setLoading(true);
        if (refreshing) setRefreshing(false);
    }

    /**Curriculos*/
    function navigateToCadastrarCurriculo() {
        navigation.navigate('CadastrarCurriculo');
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

                <TouchableOpacity onPress={navigateToCadastrarCurriculo} activeOpacity={0.8} style={[styles.itens, styles.bgAmarelo, {marginVertical:20}]}>
                    <Text style={[styles.textItem, styles.corBranco]}>Deixe aqui seu currículo</Text>
                </TouchableOpacity>

                {
                    dataCurriculos != false ?
                        dataCurriculos.map(function (item) {

                            i++;

                            return (
                                <View style={[styles.borderTop, i == 1 ? { borderTopWidth: 0, } : null]} key={item.id}>
                                    <Text style={styles.titulo}>{item.nome}</Text>
                                    <Text style={styles.subtitulo}>Área de interesse: {item.area}</Text>
                                    <Text style={styles.texto}>Data de Nascimento: {item.data}</Text>
                                    <Text style={styles.texto}>Telefone: {item.telefone}</Text>
                                    <Text style={styles.texto}>Endereço: {item.endereco}</Text>
                                    <Text style={styles.texto}>Formação: {item.formacao}</Text>
                                    {item.curso != null && item.curso != null != "" ? <Text style={styles.texto}>Curso Técnico: {item.curso}</Text> : null}
                                    {item.informatica != null && item.informatica != null != "" ? <Text style={styles.texto}>Conhecimento em Informática: {item.informatica}</Text> : null}
                                    <Text style={styles.texto}>Experiência: {item.experiencia}</Text>
                                    {item.locais != null && item.locais != null != "" ? <Text style={styles.texto}>Locais onde trabalhou: {item.locais}</Text> : null}
                                </View>
                            )
                        })
                        : <Text style={styles.textItem}>{loading ? "Nenhum registro disponível no momento" : "Carregando os registros..."}</Text>
                }

            </View>

        </ScrollView>
    )
}
