import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './srcs/Welcome';
import HomeScreenPage from './srcs/HomeScreen';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const App = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [finalScore, setFinalScore] = useState('');
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [dataToSend, setDataToSend] = useState('wrong');

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

  console.log(finalScore);
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
