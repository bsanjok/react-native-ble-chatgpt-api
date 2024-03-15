import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid, Platform, StyleSheet, TextInput } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

const BleScreen = () => {
  const [scanningDevices, setScanningDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [dataToSend, setDataToSend] = useState('');

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ]);
      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  };

  const startScan = async () => {
    const isPermissionGranted = await requestBluetoothPermission();
    if (!isPermissionGranted) {
      console.error('Bluetooth permission denied.');
      return;
    }

    setIsScanning(true);
    setScanningDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Error scanning:', error);
        return;
      }
      if (device.name) {
        setScanningDevices(prevDevices => {
          if (!prevDevices.find(prevDevice => prevDevice.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });
  };

  const stopScan = async () => {
    try {
      setIsScanning(false);
      await manager.stopDeviceScan();
    } catch (error) {
      console.error('Error stopping scan:', error);
    }
  };

  const connectToDevice = async device => {
    try {
      if (!device) {
        console.error('No device selected.');
        return;
      }

      await device.connect();
      await device.discoverAllServicesAndCharacteristics();
      setConnectedDevice(device);
      stopScan(); // Stop scanning after successful connection
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const disconnectDevice = async device => {
    try {
      await device.cancelConnection();
      setConnectedDevice(null);
    } catch (error) {
      console.error('Error disconnecting from device:', error);
    }
  };

  const sendDataToDevice = async () => {
    try {
      if (!connectedDevice) {
        console.error('No device connected.');
        return;
      }
  
      const serviceUUID = '180A'; // Update with your Arduino service UUID
      const characteristicUUID = '2A57'; // Update with your Arduino characteristic UUID
  
      // Convert the data to a string before sending
      const dataString = dataToSend.toString();
  
      await connectedDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        dataString
      );
  
      console.log('Data sent:', dataToSend);
    } catch (error) {
      console.error('Error sending data to device:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Button
        title={connectedDevice && connectedDevice.id === item.id ? 'Connected' : 'Connect'}
        onPress={() => connectToDevice(item)}
        disabled={connectedDevice && connectedDevice.id === item.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scanSection}>
        <Button
          title={isScanning ? 'Stop Scan' : 'Start Scan'}
          onPress={isScanning ? stopScan : startScan}
          disabled={!manager}
        />
        <FlatList
          data={scanningDevices}
          renderItem={renderItem}
          keyExtractor={item => item.id} // Ensure keys are unique
        />
      </View>
      {connectedDevice && (
        <View style={styles.connectedDeviceContainer}>
          <Text style={styles.deviceName}>{connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={() => disconnectDevice(connectedDevice)} />
          <TextInput
            style={styles.input}
            placeholder="Enter data to send"
            onChangeText={setDataToSend}
            value={dataToSend}
          />
          <Button title="Send Data" onPress={sendDataToDevice} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scanSection: {
    flex: 1,
  },
  connectedDeviceContainer: {
    marginTop: 20,
  },
  deviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default BleScreen;
