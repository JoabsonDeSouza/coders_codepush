import React, {useEffect, useState, useCallback} from 'react';

import CodePush, {DownloadProgress} from 'react-native-code-push';
import {DeviceEventEmitter, AppState, LogBox} from 'react-native';
import UpdateModal from './UpdateModal';

export interface CPAppProps {
  isSync: boolean;
  update: boolean;
  syncStatus: string;
  isMandatory: boolean;
  next: boolean;
  updateInfo: any;
}

LogBox.ignoreLogs(['EventEmitter.removeListener']);

export const ImmediateCheckCodePush = () => {
  DeviceEventEmitter.emit('ImmediateCheckCodePush');
};

export const restartApplication = () => {
  setTimeout(async () => {
    CodePush.restartApp();
  }, 300);
};

const CodePushApp = (App: React.FC<{}>) => {
  const CodePushComponent = () => {
    const [isActiveCheck] = useState(true);

    let syncMessage = '';

    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [notHasCodepushUpdate, setNotCodepushUpdate] = useState(true);

    const [state, setState] = useState<CPAppProps>({
      isSync: false,
      update: true,
      syncStatus: '',
      isMandatory: false,
      next: true,
      updateInfo: {},
    });

    const checkForUpdate = () => {
      if (state.next) {
        CodePush.checkForUpdate()
          .then(update => {
            console.log('Tem update? ', update);
            if (update) {
              setShowModal(true);
              setTimeout(() => {
                immediateUpdate();
              }, 1000);
            } else {
              setNotCodepushUpdate(false);
            }
          })
          .catch(() => {
            setNotCodepushUpdate(false);
          });
      }
    };

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        checkForUpdate();
      }
    };

    useEffect(() => {
      let appListener: any;

      if (isActiveCheck) {
        appListener = AppState.addEventListener('change', handleAppStateChange);
      }

      handleAppStateChange('active');

      const listener = DeviceEventEmitter.addListener(
        'ImmediateCheckCodePush',
        () => {
          setState({...state, next: false});
          handleAppStateChange('active');
        },
      );

      return () => {
        if (isActiveCheck && appListener) {
          appListener.remove();
        }
        if (listener) {
          listener.remove();
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const immediateUpdate = () => {
      if (!state.isSync) {
        setState({...state, isSync: true, update: true});

        const codePushOptions = {
          installMode: CodePush.InstallMode.ON_NEXT_RESTART,
          mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        };

        CodePush.sync(
          codePushOptions,
          codePushStatusDidChange,
          codePushDownloadDidProgress,
        );
      }
    };

    const codePushStatusDidChange = async (syncStatus: any) => {
      console.log('-codePushStatusDidChange-', syncStatus);

      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          syncMessage = 'Checking for update';
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          syncMessage = 'Downloading package';
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          syncMessage = 'Awaiting user action';
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          syncMessage = 'Installing update';
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          syncMessage = 'App up to date.';
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          syncMessage = 'Update cancelled by user';
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          syncMessage = 'Update installed and will be applied on restart.';
          setTimeout(() => {
            restartApplication();
          }, 500);
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          syncMessage = 'An unknown error occurred';
          setShowModal(false);
          break;
        default:
          break;
      }
      console.log(syncMessage);
    };

    const handleProgress = useCallback((value: number) => {
      setProgress(() => value);
    }, []);

    const codePushDownloadDidProgress = (progress: DownloadProgress) => {
      const temp = Number(
        ((progress.receivedBytes * 100) / progress.totalBytes).toFixed(0),
      );

      if (state.update) {
        if (temp % 3 === 0 || temp === 100) {
          handleProgress(temp);
        }
        setState({...state, update: temp > 100});
      }
    };

    const closeModal = async (restartApp: boolean) => {
      console.log(restartApp);

      setShowModal(false);
      setNotCodepushUpdate(false);
    };

    return (
      <>
        {!notHasCodepushUpdate && <App />}
        <UpdateModal
          immediateUpdate={immediateUpdate}
          currProgress={progress}
          visible={showModal}
          closeModal={closeModal}
        />
      </>
    );
  };

  const CODE_PUSH_OPTIONS = {
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    updateDialog: null,
  };

  return CodePush(CODE_PUSH_OPTIONS)(CodePushComponent);
};

export default CodePushApp;
