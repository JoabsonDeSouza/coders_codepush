import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import CodePush, {CodePushOptions} from 'react-native-code-push';

// jeito easy
// const codePushOptions: CodePushOptions = {
//   // Define com que frequência o aplicativo deve verificar por atualizações. Pode ser definido como codePush.CheckFrequency.ON_APP_START para verificar apenas quando o aplicativo é iniciado, codePush.CheckFrequency.ON_APP_RESUME para verificar quando o aplicativo é retomado (por exemplo, após retornar do plano de fundo) ou codePush.CheckFrequency.MANUAL para verificar manualmente.
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START,

//   //Define o modo de instalação das atualizações. Pode ser codePush.InstallMode.IMMEDIATE para instalar a atualização imediatamente após o download, ou codePush.InstallMode.ON_NEXT_RESTART para instalar na próxima reinicialização do aplicativo.
//   installMode: CodePush.InstallMode.ON_NEXT_RESTART,

//   //Define a duração mínima em segundos que o aplicativo deve estar em segundo plano antes de reiniciar para concluir a instalação da atualização. Isso é útil para garantir que a atualização seja instalada completamente antes que o usuário retorne ao aplicativo.
//   // minimumBackgroundDuration: 10,

//   //Define o modo de instalação para atualizações obrigatórias. Pode ser codePush.InstallMode.IMMEDIATE para instalar a atualização imediatamente após o download, ou codePush.InstallMode.ON_NEXT_RESTART para instalar na próxima reinicialização do aplicativo.
//   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,

//   // updateDialog: Permite personalizar o diálogo de atualização exibido para o usuário. As opções incluem appendReleaseDescription, descriptionPrefix, mandatoryContinueButtonLabel, mandatoryUpdateMessage, optionalIgnoreButtonLabel, optionalInstallButtonLabel e title.

//   // deploymentKey: Chave de implantação do CodePush para o aplicativo. Essa chave é usada para identificar a implantação correta no serviço CodePush.
// };

const Dialog = ({closeDialog}: {closeDialog: (value: boolean) => void}) => {
  const onButtonPress = () => {
    closeDialog(false);
  };

  return (
    <View style={styles.containerDialog}>
      <Text>Tem um dialog aqui</Text>

      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);

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

  const onOpenDialog = () => {
    setOpen(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://go.codersclub.com.br/wp-content/uploads/2022/08/LOGO-CODERS-CLUB-06-1536x614.png',
        }}
      />
      <Text style={styles.title}>Code Push</Text>

      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Checar atualização</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenDialog} style={styles.button}>
        <Text style={styles.buttonText}>Agora tem um dialog!?</Text>
      </TouchableOpacity>

      {open && <Dialog closeDialog={setOpen} />}
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
