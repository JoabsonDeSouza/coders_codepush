import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  // TouchableOpacity,
  // Image,
} from 'react-native';
import CodePushApp from './Codepush';
// import imagem from './imagem.jpeg';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Code Push - Jeito hard</Text>
      {/* <Image
        style={styles.image}
        source={{
          uri: 'https://go.codersclub.com.br/wp-content/uploads/2022/08/LOGO-CODERS-CLUB-06-1536x614.png',
        }}
      /> */}
      {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Temos um novo botao</Text>
      </TouchableOpacity>

      <Image style={styles.image} source={imagem} /> */}
    </SafeAreaView>
  );
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

export default CodePushApp(App);
