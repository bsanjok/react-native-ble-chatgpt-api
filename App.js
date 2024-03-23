import React, { useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import WelcomeScreen from './srcs/Welcome';
import HomeScreenPage from './srcs/HomeScreen';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const App = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [finalScore, setFinalScore] = useState('');
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [dataToSend, setDataToSend] = useState('wrong');

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
      ]);
      return (
        // granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
        // granted['android.permission.BLUETOOTH_ADVERTISE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  };

  const sendStringDataToDevice = async () => {
    try {
      if (!connectedDevice) {
        console.error('No device connected.');
        return;
      }
  
      const serviceUUID = '180A'; 
      const characteristicUUID = '2A57'; 
  
      const dataString = Buffer.from(dataToSend, 'utf-8');
      console.log('Data to send:', dataString);
  
  
      await connectedDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        dataString.toString('base64')
      );
  
      console.log('String data sent:', dataString);
    } catch (error) {
      console.error('Error sending string data to device:', error);
    }
  };

  console.log(`Data to send: ${dataToSend}`);
  return (
    <View style={styles.container}>
      {!showOptions ? (
        <WelcomeScreen onPress={() => setShowOptions(true)} />
        ) : (
          <HomeScreenPage 
          setFinalScore={setFinalScore} 
          finalScore={finalScore}
          connectedDevice={connectedDevice}
          setConnectedDevice={setConnectedDevice}
          sendStringDataToDevice={sendStringDataToDevice}
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
          requestBluetoothPermission={requestBluetoothPermission}

          />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
