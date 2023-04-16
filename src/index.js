import {View, StyleSheet, StatusBar, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppNavigation from './navigation';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import RNExitApp from 'react-native-kill-app';
import Splash from './screens/Splash';

const Index = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: false,
  });

  const exitApp = () => {
    RNExitApp.exitApp();
  };

  const runBiometricScan = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Input the Passcode'})
      .then(resultObject => {
        const {success} = resultObject;
        if (success) {
          setAuthorized(true);
          console.log('successful biometrics provided');
        } else {
          exitApp();
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
        runBiometricScan();
      } else if (available && biometryType === BiometryTypes.FaceID) {
        runBiometricScan();

        console.log('FaceID is supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        runBiometricScan();
        console.log('Biometrics is supported');
      } else {
        Alert.alert(
          'No Biometric Found',
          'Please make sure you have setup biometrics into the device',
          [
            {
              text: 'Cancel',
              onPress: () => exitApp(),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => exitApp()},
          ],
        );

        console.log('Biometrics not supported');
      }
    });
  }, []);

  return (
    <View style={styles.mainComponent}>
      <StatusBar animated={true} showHideTransition={'slide'} />
      {isAuthorized ? <AppNavigation /> : <Splash />}
    </View>
  );
};
//
const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
  },
});

export default Index;
