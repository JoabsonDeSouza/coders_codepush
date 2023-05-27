import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Code Push</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;
