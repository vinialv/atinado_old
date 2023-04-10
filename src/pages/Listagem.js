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

export default function Listagem({ navigation }) {

    const isFocused = useIsFocused();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataListagem, setDataListagem] = useState([]);

    const aux = route.params.aux;
    const id = route.params.id;

    var i = 0;

    useEffect(() => {
        loadData();
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }

    async function loadData() {
        const response = await api.post('APIListagem.php', { param: id, aux: aux });
        setDataListagem(response.data);

        setLoading(true);
        if (refreshing) setRefreshing(false);
    }

    function navigateToAssinante(id_ass){
        navigation.navigate('Assinante', { id_ass: id_ass });
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
                    dataListagem != false ?
                        dataListagem.map(function (item) {
                            
                            i++;

                            item.assinante == 1 ? i = 0 : null;

                            return (
                                id == 4 && aux != 1?

                                    <View style={[styles.itens, styles.assinante]} key={item.id}>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigateToAssinante(item.id)}>
                                            <Text style={styles.titulo}>{item.titulo}</Text>
                                            <Image source={{ uri: 'https://atinado.com.br/atinado/images/divulgacao/' + item.imagem + '.jpg' }} style={[styles.banner, {marginVertical:10}]}/>
                                            <Text style={styles.link}>Clique para saber mais</Text>
                                        </TouchableOpacity>
                                    </View>

                            :

                                    <View style={[styles.borderTop, i == 1 ? {borderTopWidth: 0,} : null]} key={item.id}>
                                        <Text style={styles.titulo}>{item.titulo}</Text>
                                        {item.descricao != null && item.descricao != "" ? <Text style={styles.texto}>{item.descricao}</Text> : null}
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
