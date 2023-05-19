import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';

const Stack = createStackNavigator();

import Home from './pages/Home';
import Assinante from './pages/Assinante';
import Cadastro from './pages/Cadastro';
import Categorias from './pages/Categorias';
import Curriculo from './pages/Curriculo';
import CadastrarCurriculo from './pages/CadastrarCurriculo';
import Cutucadas from './pages/Cutucadas';
import Eventos from './pages/Eventos';
import Firmas from './pages/Firmas';
import Horarios from './pages/Horarios';
import Imoveis from './pages/Imoveis';
import VisualizarImovel from './pages/VisualizarImovel';
import Listagem from './pages/Listagem';
import ListagemImobConc from './pages/ListagemImobConc';
import Ofertas from './pages/Ofertas';
import Precisa from './pages/Precisa';
import Produtos from './pages/Produtos';
import VisualizarProduto from './pages/VisualizarProduto';
import Sobre from './pages/Sobre';
import Anuncie from './pages/Anuncie';
import Trabalho from './pages/Trabalho';

export default function Routes () {
  return (
    <Stack.Navigator
      initialRouteName="Cutucadas"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Assinante" component={Assinante} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="Curriculo" component={Curriculo} />
      <Stack.Screen name="CadastrarCurriculo" component={CadastrarCurriculo} />
      <Stack.Screen name="Cutucadas" component={Cutucadas} />
      <Stack.Screen name="Eventos" component={Eventos} />
      <Stack.Screen name="Firmas" component={Firmas} />
      <Stack.Screen name="Horarios" component={Horarios} />
      <Stack.Screen name="Imoveis" component={Imoveis} />
      <Stack.Screen name="VisualizarImovel" component={VisualizarImovel} />
      <Stack.Screen name="VisualizarProduto" component={VisualizarProduto} />
      <Stack.Screen name="Listagem" component={Listagem} />
      <Stack.Screen name="ListagemImobConc" component={ListagemImobConc} />
      <Stack.Screen name="Precisa" component={Precisa} />
      <Stack.Screen name="Ofertas" component={Ofertas} />
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="Sobre" component={Sobre} />
      <Stack.Screen name="Anuncie" component={Anuncie} />
      <Stack.Screen name="Trabalho" component={Trabalho} />
    </Stack.Navigator>
  );
}
