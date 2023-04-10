import {StyleSheet, Dimensions} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: colors.cinza,
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  background: {
    resizeMode: 'contain',
    flex: 1,
  },
  itens: {
    backgroundColor: colors.branco,
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  bgAmarelo: {
    backgroundColor: colors.amarelo,
  },
  bgAzul: {
    backgroundColor: colors.azul,
  },
  textItem: {
    color: colors.azul,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 3,
  },
  corBranco: {
    color: colors.branco,
  },
  logo: {
    resizeMode: 'contain',
    width: '80%',
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azul,
  },
  subtitulo: {
    fontSize: 18,
    color: colors.amarelo,
  },
  texto: {
    fontSize: 16,
    color: colors.cinzaEscuro,
  },
  tituloGrande: {
    fontSize: 24,
    padding: 15,
    color: colors.azul,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: colors.branco,
    fontSize: 16,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: colors.amarelo,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  negrito: {
    fontWeight: 'bold',
  },
  marginTop10: {
    marginTop: 10,
  },
  banner: {
    resizeMode: 'contain',
    width: 300,
    height: 150,
  },
  borderTop: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: colors.cinzaMedio,
    padding: 10,
    paddingBottom: 20,
  },
  assinante: {
    marginBottom: 15,
  },
  link: {
    color: colors.link,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  imagem: {
    resizeMode: 'contain',
    flex: 1,
    height: 320,
    padding: 10,
  },
  preco: {
    color: colors.vermelho,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingBottom: 10,
  },
  webViewContainer: {
    width: '100%',
    height: Dimensions.get('window').height - 200,
  },
});
