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

export default function CadastrarCurriculo({ navigation }) {

    const [fieldNome, setFieldNome] = useState('');
    const [fieldEndereco, setFieldEndereco] = useState('');
    const [fieldTelefone, setFieldTelefone] = useState('');
    const [fieldData, setFieldData] = useState('');
    const [fieldFormacao, setFieldFormacao] = useState('');
    const [fieldCurso, setFieldCurso] = useState('');
    const [fieldInformatica, setFieldInformatica] = useState('');
    const [fieldArea, setFieldArea] = useState('');
    const [fieldExperiencia, setFieldExperiencia] = useState('');
    const [fieldLocais, setFieldLocais] = useState('');

    async function enviar() {
        if (fieldNome.length > 0 && fieldTelefone.length > 0 && fieldEndereco.length > 0 && fieldData.length > 0 && fieldArea.length > 0 && fieldExperiencia.length > 0) {

            const response = await api.post('APIEnviarCurriculo.php',
                {
                    nome: fieldNome,
                    telefone: fieldTelefone,
                    endereco: fieldEndereco,
                    data: fieldData,
                    formacao: fieldFormacao,
                    curso: fieldCurso,
                    informatica: fieldInformatica,
                    area: fieldArea,
                    experiencia: fieldExperiencia,
                    locais: fieldLocais
                });

            if (response.data['sucesso'] == true) {

                setFieldNome('');
                setFieldTelefone('');
                setFieldEndereco('');
                setFieldData('');
                setFieldFormacao('');
                setFieldCurso('');
                setFieldInformatica('');
                setFieldArea('');
                setFieldExperiencia('');
                setFieldLocais('');

                Alert.alert('Sucesso', 'Seu cadastro foi realizado!')

            } else {
                Alert.alert('Erro', 'Não foi possível realizar o cadastro!');
            }


        } else {
            Alert.alert('Atenção', 'Os campos sinalizados (*) são obrigatórios!');
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

                <Text style={styles.tituloGrande}>CADASTRE SEU CURRÍCULO</Text>

                <TextInput placeholder='Digite seu nome*' style={[styles.input]}
                    value={fieldNome}
                    onChangeText={setFieldNome} />

                <TextInput placeholder='Digite seu endereço*' style={[styles.input]}
                    value={fieldEndereco}
                    onChangeText={setFieldEndereco} />

                <TextInput placeholder='Digite seu telefone*' style={[styles.input]}
                    value={fieldTelefone}
                    onChangeText={setFieldTelefone} />

                <TextInput placeholder='Data Nas*: (dd/mm/aaaa)' style={[styles.input]}
                    value={fieldData}
                    onChangeText={setFieldData} />

                <TextInput placeholder='Digite sua formação*' style={[styles.input, { textAlignVertical: 'top' }]}
                    value={fieldFormacao}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setFieldFormacao} />

                <TextInput placeholder='Fez algum curso técnico? Qual?' style={[styles.input, { textAlignVertical: 'top' }]}
                    value={fieldCurso}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setFieldCurso} />

                <TextInput placeholder='Possui conhecimento em informática?' style={[styles.input, { textAlignVertical: 'top' }]}
                    value={fieldInformatica}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setFieldInformatica} />

                <TextInput placeholder='Qual área deseja trabalhar?*' style={[styles.input]}
                    value={fieldArea}
                    onChangeText={setFieldArea} />

                <TextInput placeholder='Fale sobre sua experiência profissional*' style={[styles.input, { textAlignVertical: 'top' }]}
                    value={fieldExperiencia}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setFieldExperiencia} />

                <TextInput placeholder='Locais onde trabalhou' style={[styles.input, { textAlignVertical: 'top' }]}
                    value={fieldLocais}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setFieldLocais} />

                <TouchableOpacity onPress={enviar} activeOpacity={0.8} style={[styles.itens, styles.buttonStyle]}>
                    <Text style={[styles.textItem, styles.corBranco, styles.negrito]}>ENVIAR</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}