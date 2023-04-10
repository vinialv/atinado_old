/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  RefreshControl,
  BackHandler,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

import api from '../services/api';

import styles from '../styles/styles';
import colors from '../styles/colors';

export default function Home({navigation}) {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [cutucada, setCutucada] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [dataAssinante, setDataAssinante] = useState('');

  useEffect(() => {
    OneSignal.init('fd8869d8-34c0-49ac-a05c-090f0f270030'); //App ID OneSignal
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    loadData();
  }, [loading, isFocused]);

  function onReceived(notification) {}

  function onOpened(openResult) {
    AsyncStorage.setItem('cliqueCutucada', JSON.stringify('1'));
  }

  function onIds(device) {}

  function removeNotification() {
    OneSignal.removeEventListener('received', onReceived);
    OneSignal.removeEventListener('opened', onOpened);
    OneSignal.removeEventListener('ids', onIds);
  }

  function refreshLoad() {
    setRefreshing(true);
    setLoading(false);
  }

  async function loadData() {
    const response = await api.post('APIHome.php', {param: 0});
    setDataAssinante(response.data);

    setLoading(true);
    if (refreshing) {
      setRefreshing(false);
    }

    removeNotification();

    await AsyncStorage.getItem('cliqueCutucada').then((value) =>
      setCutucada(value),
    );

    if (cutucada === '1') {
      AsyncStorage.removeItem('cliqueCutucada');
      navigateToCutucadas();
    }
  }

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonHandler,
    );
    return () => backHandler.remove();
  });

  const backButtonHandler = () => {
    Alert.alert('Atenção', 'Tem certeza que deseja fechar o aplicativo?', [
      {text: 'Cancelar', onPress: () => null, style: 'cancel'},
      {text: 'Sim', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  /**Ofertas do dia */
  function navigateToOfertas() {
    navigation.navigate('Ofertas');
  }

  /**Assinante */
  function navigateToAssinante(value) {
    value === 0 ? '' : navigation.navigate('Assinante', {id_ass: value});
  }

  /**Recados da semana */
  function navigateToCutucadas() {
    navigation.navigate('Cutucadas');
  }

  /**Cadastre-se e concorra a premios*/
  function navigateToCadastro() {
    navigation.navigate('Cadastro');
  }

  /**Venda e Aluguel de Imoveis e Carros*/
  function navigateToImoveis(value) {
    navigation.navigate('Imoveis', {param: value});
  }

  /**Listagem dos empresa*/
  function navigateToListagem(value) {
    navigation.navigate('Listagem', {id: value});
  }

  /**Listagem dos profissionais*/
  function navigateToListagemP(value) {
    navigation.navigate('Listagem', {id: value, aux: '1'});
  }

  /**Firmas*/
  function navigateToFirmas() {
    navigation.navigate('Firmas');
  }

  /**Precisa*/
  function navigateToPrecisa() {
    navigation.navigate('Precisa');
  }

  /**Categorias das de profissionais/empresas ou Usados*/
  function navigateToCategorias(value) {
    navigation.navigate('Categorias', {param: value});
  }

  /**Horários*/
  function navigateToHorarios(value) {
    navigation.navigate('Horarios', {param: value});
  }

  /**Curriculos*/
  function navigateToCurriculo() {
    navigation.navigate('Curriculo');
  }

  /**Ofertas de Trabalho*/
  function navigateToTrabalho() {
    navigation.navigate('Trabalho');
  }

  /**Eventos*/
  function navigateToEventos() {
    navigation.navigate('Eventos');
  }

  /**Sobre*/
  function navigateToSobre() {
    navigation.navigate('Sobre');
  }

  /**Anuncie*/
  function navigateToAnuncie() {
    navigation.navigate('Anuncie');
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

      <View
        style={[styles.container, styles.marginTop10, {alignItems: 'center'}]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}>
          {dataAssinante.length > 0 ? (
            dataAssinante.map(function (item) {
              return item.imagem !== '' ? (
                <TouchableOpacity
                  onPress={() => navigateToAssinante(item.id_assinante)}
                  activeOpacity={0.9}
                  style={[styles.itens]}
                  key={item.key}>
                  <Image
                    style={[styles.banner]}
                    source={{
                      uri:
                        'https://atinado.com.br/atinado/images/divulgacao/' +
                        item.imagem +
                        '.jpg',
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.itens]}
                  key={item.key}>
                  <WebView
                    style={[styles.banner, {width: 300}]}
                    originWhitelist={['*']}
                    source={{
                      html: item.video,
                    }}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.textItem}>{loading ? '' : ''}</Text>
          )}
        </ScrollView>

        {/*<TouchableOpacity onPress={() => navigateToAssinante(dataAssinante)} activeOpacity={0.8} style={[styles.itens]}>
                    <Image style={[styles.banner]} source={{ uri: 'http://atinado.com.br/atinado/images/divulgacao/' + dataImagem + '.jpg' }} />
                </TouchableOpacity>*/}
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={navigateToAnuncie}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Anuncie aqui seu negócio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToCadastro}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>
            Faça seu cadastro e concorra a prêmios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToOfertas}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Ofertas da semana</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToPrecisa}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Do que você precisa?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToCutucadas}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>As últimas cutucadas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToCategorias(0)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Usados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToImoveis(2)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Imóveis para alugar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToImoveis(3)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Imóveis à venda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToImoveis(4)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Chácaras para alugar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToImoveis(5)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Veículos à venda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToCategorias(1)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Profissionais autônomos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToListagem(12)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Onde consertar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToListagem(4)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Contato para shows</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToListagem(21)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Professores particulares</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToListagem(3)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Fretes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToListagem(17)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Taxistas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToHorarios(1)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Horários de Ônibus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToHorarios(0)}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Horários de Missas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToCurriculo}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Currículos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToFirmas}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Telefones comerciais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToSobre}
          activeOpacity={0.8}
          style={[styles.itens]}>
          <Text style={[styles.textItem]}>Conheça o Atinado</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
