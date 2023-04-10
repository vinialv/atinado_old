/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function Assinante({navigation}) {
  const isFocused = useIsFocused();
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataAssinante, setDataAssinante] = useState([]);
  const [dataImagem, setDataImagem] = useState([]);

  const id_ass = route.params.id_ass;

  useEffect(() => {
    loadData();
  }, [loading, isFocused]);

  function refreshLoad() {
    setRefreshing(true);
    setLoading(false);
  }

  async function loadData() {
    if (!loading) {
      const responseA = await api.post('APIAssinante.php', {param: id_ass});
      setDataAssinante(responseA.data[0]);

      const responseI = await api.post('APIImagens.php', {
        param: id_ass,
        aux: 0,
      });
      setDataImagem(responseI.data);

      setLoading(true);
      if (refreshing) {
        setRefreshing(false);
      }
    }
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
        {loading ? (
          <View>
            <Text style={styles.tituloGrande}>{dataAssinante.titulo}</Text>

            <View style={[styles.itens]}>
              <Image
                style={[styles.imagem]}
                source={{
                  uri:
                    'https://atinado.com.br/atinado/images/divulgacao/' +
                    dataAssinante.oferta +
                    '.jpg',
                }}
              />
            </View>

            <View style={[styles.borderTop, {borderTopWidth: 0}]}>
              <Text style={styles.titulo}>
                Categoria: {dataAssinante.categoria}
              </Text>
              {dataAssinante.descricao !== null &&
              dataAssinante.descricao !== '' ? (
                <Text style={styles.texto}>{dataAssinante.descricao}</Text>
              ) : null}
            </View>

            <View style={[styles.borderTop, {borderTopWidth: 0}]}>
              <Text style={styles.titulo}>Dados de contato</Text>
              <Text style={styles.texto}>{dataAssinante.telefone}</Text>
              {dataAssinante.telefone2 !== null &&
              dataAssinante.telefone2 !== '' ? (
                <Text style={styles.texto}>{dataAssinante.telefone2}</Text>
              ) : null}
              <Text style={styles.texto}>
                {dataAssinante.endereco}
                {dataAssinante.numero !== null && dataAssinante.numero !== ''
                  ? ', ' + dataAssinante.numero
                  : ''}
                {dataAssinante.bairro !== null && dataAssinante.bairro !== ''
                  ? ', ' + dataAssinante.bairro
                  : ''}
              </Text>
              {dataAssinante.whatsapp !== null &&
              dataAssinante.whatsapp !== '' ? (
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      'https://api.whatsapp.com/send?phone=55' +
                        dataAssinante.whatsapp,
                    )
                  }>
                  {dataAssinante.whatsapp}
                </Text>
              ) : null}
              {dataAssinante.site !== null && dataAssinante.site !== '' ? (
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(dataAssinante.site)}>
                  {dataAssinante.site}
                </Text>
              ) : null}
              {dataAssinante.facebook !== null &&
              dataAssinante.facebook !== '' ? (
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(dataAssinante.facebook)}>
                  {dataAssinante.facebook}
                </Text>
              ) : null}
            </View>

            {dataAssinante.video ? (
              <View style={[styles.borderTop, {borderTopWidth: 0}]}>
                <WebView
                  style={[styles.imagem]}
                  originWhitelist={['*']}
                  source={{
                    html: dataAssinante.video,
                  }}
                />
              </View>
            ) : null}

            {dataAssinante.mapa ? (
              <View style={[styles.borderTop, {borderTopWidth: 0}]}>
                <WebView
                  style={[styles.imagem]}
                  originWhitelist={['*']}
                  source={{
                    html: dataAssinante.mapa,
                  }}
                />
              </View>
            ) : null}
          </View>
        ) : (
          <Text style={styles.tituloGrande}>Carregando os registros...</Text>
        )}

        {dataImagem !== false
          ? dataImagem.map(function (item) {
              return (
                <View style={[styles.itens]} key={item.id}>
                  <Image
                    style={[styles.imagem, {height: 190}]}
                    source={{
                      uri:
                        'https://atinado.com.br/atinado/images/divulgacao/' +
                        item.imagem +
                        '.jpg',
                    }}
                  />
                </View>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
}
