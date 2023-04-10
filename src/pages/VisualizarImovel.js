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
import { WebView } from 'react-native-webview';

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function VisualizarImovel({ navigation }) {

    const isFocused = useIsFocused();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [dataVisualizar, setDataVisualizar] = useState([]);
    const [dataImagem, setDataImagem] = useState([]);

    const id = route.params.id;

    /*useEffect(() => {
        loadData()
    }, [loading, isFocused]);

    function refreshLoad() {
        setRefreshing(true);
        setLoading(false);
    }*/

    /*async function loadData() {
        if (!loading) {
            const responseV = await api.post('APIVisualizarImoveis.php', { param: id });
            setDataVisualizar(responseV.data[0]);

            const responseI = await api.post('APIImagens.php', { param: id, aux: 1 });
            setDataImagem(responseI.data);

            setLoading(true);
            if (refreshing) setRefreshing(false);
        }
    }*/

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            scrollEnabled
            style={styles.scrollView}>

            <View style={[styles.header]}>
                <ImageBackground source={require('../images/header.jpg')} style={styles.background}>
                    <View style={[styles.flexHorizontal, styles.header]}>
                        <Image style={[styles.logo]} source={require('../images/logo.png')} />
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.container}>

                {/*loading ?
                    <View>
                        <Text style={styles.tituloGrande}>{dataVisualizar['titulo']}</Text>

                        {dataVisualizar['imagem'] != null && dataVisualizar['imagem'] != "" ?
                            <View style={[styles.itens]}>
                                <Image style={[styles.imagem]} source={{ uri: 'https://atinado.com.br/atinado/images/divulgacao/' + dataVisualizar['imagem'] + '.jpg' }} />
                            </View>
                            : null}

                        <View style={[styles.borderTop, { borderTopWidth: 0 }]}>
                            <Text style={[styles.preco, { textAlign: 'left' }]}>{dataVisualizar['valor'] == 0 ? "Preço a consultar" : "R$" + dataVisualizar['valor'] + ",00"}</Text>
                            {dataVisualizar['descricao'] != null && dataVisualizar['descricao'] != "" ? <Text style={styles.texto}>{dataVisualizar['descricao']}</Text> : null}
                        </View>

                        <View style={[styles.borderTop, { borderTopWidth: 0 }]}>
                            <Text style={styles.titulo}>Dados de contato</Text>
                            {dataVisualizar['responsavel'] != null && dataVisualizar['responsavel'] != "" ? <Text style={styles.texto}>{dataVisualizar['responsavel']}</Text> : null}
                            {dataVisualizar['telefone'] != null && dataVisualizar['telefone'] != "" ? <Text style={styles.texto}>{dataVisualizar['telefone']}</Text> : null}
                            {dataVisualizar['whatsapp'] != null && dataVisualizar['whatsapp'] != "" ? <Text style={styles.link} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=55' + dataVisualizar['whatsapp'])}>{dataVisualizar['whatsapp']}</Text> : null}
                        </View>

                    </View>
                : <Text style={styles.tituloGrande}>Carregando os registros...</Text>*/}

                {/*loading && dataImagem['sucesso'] != false ?
                    dataImagem.map(function (item) {

                        return (

                            <View style={[styles.itens]} key={item.imagem}>
                                <Image style={[styles.imagem, { height: 190 }]} source={{ uri: 'https://atinado.com.br/atinado/images/divulgacao/' + item.imagem + '.jpg' }} />
                            </View>

                        )
                    })

                    : null*/}

                <WebView style={[styles.webViewContainer]}
                    originWhitelist={['*']}
                    source={{
                        uri: 'https://atinado.com.br/app/WebView/APIVisualizarImovel.php?imovel=' + id
                    }} 
                />

            </View>

        </ScrollView>
    )
}
