import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import CodePush from 'react-native-code-push';

const Home = () => {
  // Jeito "Medio"
  const onButtonPress = async () => {
    const update = await CodePush.checkForUpdate();

    if (update) {
      Alert.alert(
        'Nova atualização disponível',
        'Deseja instalar a nova versão?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Atualização cancelada'),
            style: 'cancel',
          },
          {
            text: 'Instalar',
            onPress: () => {
              CodePush.sync({
                updateDialog: {
                  appendReleaseDescription: true,
                  descriptionPrefix: 'Detalhes da atualização:\n\n',
                  mandatoryContinueButtonLabel: 'Instalar agora',
                  mandatoryUpdateMessage:
                    'Uma nova atualização está disponível. Instale agora para continuar usando o aplicativo.',
                  optionalIgnoreButtonLabel: 'Depois',
                  optionalInstallButtonLabel: 'Instalar',
                  optionalUpdateMessage:
                    'Uma nova atualização está disponível. Deseja instalá-la agora?',
                  title: 'Atualização disponível',
                },
                installMode: CodePush.InstallMode.IMMEDIATE,
              });
            },
          },
        ],
      );
    } else {
      Alert.alert('Nenhuma atualização disponivel no momento.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        style={styles.image}
        source={{
          uri: 'https://go.codersclub.com.br/wp-content/uploads/2022/08/LOGO-CODERS-CLUB-06-1536x614.png',
        }}
      /> */}
      <Text style={styles.title}>Code Push - Jeito medium</Text>

      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>Temos um novo botao</Text>
      </TouchableOpacity>
      {/* <Image style={styles.image} source={imagem} /> */}
    </SafeAreaView>
  );
};

const App = () => {
  return <Home />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  button: {
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  containerDialog: {
    position: 'absolute',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 500,
    borderRadius: 9,
  },
  image: {
    width: 170,
    height: 70,
  },
});

export default CodePush(App);
