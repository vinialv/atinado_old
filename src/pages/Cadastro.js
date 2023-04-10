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

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function Cadastro({ navigation }) {

    const [fieldNome, setFieldNome] = useState('');
    const [fieldTelefone, setFieldTelefone] = useState('');
    const [fieldEmail, setFieldEmail] = useState('');

    async function enviar() {
        if(fieldNome.length > 0 && fieldTelefone.length > 0){

            const response = await api.post('APICadastro.php',
                {
                    nome: fieldNome, telefone: fieldTelefone, email: fieldEmail
                });

            if (response.data['sucesso'] == true) {

                setFieldNome('');
                setFieldTelefone('');
                setFieldEmail('');

                Alert.alert('Sucesso', 'Seu cadastro foi realizado!')

            } else {
                Alert.alert('Erro', 'Não foi possível realizar o cadastro!');
            }


        }else{
            Alert.alert('Atenção', 'Os campos nome e telefone são obrigatórios!');
        }
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>

            <View style={[styles.header]}>
                <ImageBackground source={require('../images/header.jpg')} style={styles.background}>
                    <View style={[styles.flexHorizontal, styles.header]}>
                        <Image style={[styles.logo]} source={require('../images/logo.png')} />
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.container}>

                <Text style={styles.tituloGrande}>CONCORRA A PRÊMIOS</Text>

                <TextInput placeholder='Digite seu nome' style={[styles.input]}
                    value={fieldNome}
                    onChangeText={setFieldNome}/>

                <TextInput placeholder='Digite seu telefone' style={[styles.input]}
                    value={fieldTelefone}
                    onChangeText={setFieldTelefone}/>

                <TextInput placeholder='Digite seu e-mail' style={[styles.input]}
                    value={fieldEmail}
                    onChangeText={setFieldEmail}/>

                <TouchableOpacity onPress={enviar} activeOpacity={0.8} style={[styles.itens, styles.buttonStyle]}>
                    <Text style={[styles.textItem, styles.corBranco, styles.negrito]}>ENVIAR</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}