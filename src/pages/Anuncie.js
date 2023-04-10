/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import api from '../services/api';

import styles from '../styles/styles';

export default function Anuncie({navigation}) {
  const [fieldNome, setFieldNome] = useState('');
  const [fieldTelefone, setFieldTelefone] = useState('');
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldMensagem, setFieldMensagem] = useState('');

  async function enviar() {
    if (
      fieldNome.length > 0 &&
      fieldTelefone.length > 0 &&
      fieldEmail.length > 0 &&
      fieldMensagem.length > 0
    ) {
      const response = await api.post('APIContato.php', {
        nome: fieldNome,
        telefone: fieldTelefone,
        email: fieldEmail,
        mensagem: fieldMensagem,
      });

      if (response.data.sucesso === true) {
        setFieldNome('');
        setFieldTelefone('');
        setFieldEmail('');
        setFieldMensagem('');

        Alert.alert('Sucesso', 'Seu cadastro foi realizado!');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro!');
      }
    } else {
      Alert.alert('Atenção', 'Os campos nome e telefone são obrigatórios!');
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}>
      <View style={[styles.header]}>
        <ImageBackground
          source={require('../images/header.jpg')}
          style={styles.background}>
          <View style={[styles.flexHorizontal, styles.header]}>
            <Image
              style={[styles.logo]}
              source={require('../images/logo.png')}
            />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <Text style={styles.tituloGrande}>FALE CONOSCO</Text>

        <TextInput
          placeholder="Digite seu nome"
          style={[styles.input]}
          value={fieldNome}
          onChangeText={setFieldNome}
        />

        <TextInput
          placeholder="Digite seu telefone"
          style={[styles.input]}
          value={fieldTelefone}
          onChangeText={setFieldTelefone}
        />

        <TextInput
          placeholder="Digite seu e-mail"
          style={[styles.input]}
          value={fieldEmail}
          onChangeText={setFieldEmail}
        />

        <TextInput
          placeholder="Digite sua mensagem"
          style={[styles.input, {textAlignVertical: 'top'}]}
          value={fieldMensagem}
          multiline={true}
          numberOfLines={4}
          onChangeText={setFieldMensagem}
        />

        <TouchableOpacity
          onPress={enviar}
          activeOpacity={0.8}
          style={[styles.itens, styles.buttonStyle]}>
          <Text style={[styles.textItem, styles.corBranco, styles.negrito]}>
            ENVIAR
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
