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

export default function Cutucadas({ navigation }) {

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

                <Text style={styles.tituloGrande}>CONHEÇA O ATINADO</Text>

                <Text style={[styles.texto, {textAlign:"justify"}]}>
                    Atinado é um APP/SITE  desenvolvido pela empresa AGIX, sob responsabilidade de Reginaldo Capitelli e Diego Constante Capitelli que oferece informações comerciais e sociais da cidade de São José do Rio Pardo SP. Nele encontramos as firmas comerciais do município, relação de profissionais autônomos e prestadores de serviços.
                    {'\n\n'}Além disso a oportunidade de divulgação gratuita de produtos usados, imóveis, automóveis sem custo nenhum.
                    {'\n\n'}Fazendo o cadastro nesse APP a pessoa concorre à prêmios sorteados na Radio Difusora FM, dentro do Programa Ligou é Sucesso com Reginaldo Capitelli (entre 11:00 e 12:00hs) de segunda à sábado.
                    {'\n\n'}O APP ainda oferece dicas de comidas, informações sobre emprego, contatos de artistas da região para shows, chácaras e apartamentos para locação, horários de ônibus, horários de missas, professores particulares de vários segmentos
                    {'\n\n'}E ainda pode deixar um currículo gratuitamente.
                    {'\n\n'}E além de tudo isso o APP informa o usuário sobre dicas, ofertas, promoções, eventos, entre outras coisas através de mensagens.
                    {'\n\n'}Ou seja, você tem tudo o que precisa nas suas mãos e ainda pode ganhar prêmios.
                    {'\n\n'}Para maiores informações entre em contato conosco no fone: 99262-2687 ou pelo Whatsapp 3681-4247.
                </Text>

            </View>

        </ScrollView>
    )
}
