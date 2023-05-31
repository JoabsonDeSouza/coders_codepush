import React, {useEffect} from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';

interface UpdateModalProps {
  currProgress: number;
  immediateUpdate: () => void;
  visible: boolean;
  closeModal: (restart: boolean) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  currProgress,
  immediateUpdate,
  visible,
}) => {
  useEffect(() => {
    if (visible) {
      immediateUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={() => {}}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {'Instalando algumas atualizações...\n Favor aguarde só um instante'}
        </Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.downloadPercentageTextContainer}>
            <Text>{currProgress}%</Text>
          </View>
          <View style={styles.downloadBar}>
            <View style={[styles.progress, {width: `${currProgress}%`}]} />
          </View>
        </View>
      </View>
    </Modal>
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
  progressBarContainer: {
    marginTop: 40,
    width: '100%',
  },
  downloadPercentageTextContainer: {
    alignItems: 'flex-end',
    marginTop: '4%',
    marginBottom: 10,
    marginRight: '5%',
  },
  downloadBar: {
    alignSelf: 'center',
    width: '90%',
    height: 5,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
  progress: {
    width: 0,
    height: 5,
    backgroundColor: 'green',
  },
});

export default UpdateModal;
