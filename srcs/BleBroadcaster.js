import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { v4 as uuidv4 } from 'uuid';

const BleAutoDataExchange = ({ dataToSend, moduleName }) => {
  const [isSending, setIsSending] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [manager] = useState(new BleManager({ restoreStateIdentifier: moduleName }));
  const [device, setDevice] = useState(null);

  dataToSend = "haha";
  useEffect(() => {
    startSendingAndReceiving();
    return () => {
      stopSendingAndReceiving();
    };
  }, []);

  const startSendingAndReceiving = async () => {
    try {
      manager.onStateChange(state => {
        if (state === 'PoweredOn') {
          startScanning();
        }
      }, true);
    } catch (error) {
      console.error('Error setting up BLE:', error);
    }
  };

  const stopSendingAndReceiving = async () => {
    try {
      await manager.stopDeviceScan();
      if (device) {
        await device.cancelConnection();
      }
      manager.destroy();
    } catch (error) {
      console.error('Error stopping BLE:', error);
    }
  };

  const startScanning = async () => {
    try {
      await manager.startDeviceScan(null, null, async (error, scannedDevice) => {
        if (error) {
          console.error('Error scanning:', error);
          return;
        }
        if (scannedDevice.name && scannedDevice.name.includes('YourDeviceName')) { // Adjust 'YourDeviceName' to match your device's name
          await connectAndExchangeData(scannedDevice);
        }
      });
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  };

  const connectAndExchangeData = async scannedDevice => {
    try {
      await manager.stopDeviceScan();
      setDevice(scannedDevice);
      await scannedDevice.connect();
      await scannedDevice.discoverAllServicesAndCharacteristics();
      const services = await scannedDevice.services();
      const characteristics = await Promise.all(services.map(service => service.characteristics()));
      const dataCharacteristic = characteristics.flat().find(characteristic => characteristic.isWritableWithoutResponse);
      const dataToSend = uuidv4();
      await dataCharacteristic.writeWithoutResponse(Buffer.from(dataToSend)); // Send data
      setIsSending(false);
      setIsReceiving(true);
      const receiveCharacteristic = characteristics.flat().find(characteristic => characteristic.isReadable);
      await receiveCharacteristic.monitor((error, characteristic) => {
        if (error) {
          console.error('Error monitoring characteristic:', error);
          return;
        }
        const receivedData = Buffer.from(characteristic.value, 'base64').toString(); // Decode received data
        console.log('Received data:', receivedData);
        // Process received data here
      });
    } catch (error) {
      console.error('Error connecting and exchanging data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isSending ? 'Sending...' : 'Waiting for data to send...'}</Text>
      <Text>{isReceiving ? 'Receiving...' : 'Waiting for data to receive...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BleAutoDataExchange;
