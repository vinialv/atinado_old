/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function Cutucadas({navigation}) {
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
    try {
      const response = await api.post('APICutucadas.php', {param: 0});
      setDataCutucadas(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  }

  function navigateToHome() {
    navigation.navigate('Home');
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
        <TouchableOpacity
          onPress={navigateToHome}
          activeOpacity={0.8}
          style={[styles.itens, styles.bgAmarelo]}>
          <Text style={[styles.textItem, styles.corBranco]}>
            Ir para a Página Inicial
          </Text>
        </TouchableOpacity>

        {dataCutucadas !== false ? (
          dataCutucadas.map(function (item) {
            i++;
            return (
              <View
                style={[styles.borderTop, i === 1 ? {borderTopWidth: 0} : null]}
                key={i}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.texto}>{item.conteudo}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.textItem}>
            {loading
              ? 'Nenhum recado disponível no momento'
              : 'Carregando os recados...'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
