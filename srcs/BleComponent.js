import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid, Platform, StyleSheet, TextInput } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import DistanceCalculator from './DistanceCalculator'; 

const manager = new BleManager();

const BleScreen = ({ finalScore, connectedDevice, setConnectedDevice, sendStringDataToDevice, dataToSend, setDataToSend, requestBluetoothPermission }) => {
  const [scanningDevices, setScanningDevices] = useState([]);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  useEffect(() => {
    const handleDisconnect = () => {
      setConnectedDevice(null);
      setConnectedDevices(prevDevices => prevDevices.filter(d => d.id !== connectedDevice.id));
    };

    if (connectedDevice) {
      connectedDevice.onDisconnected(handleDisconnect);
    }

    return () => {
      if (connectedDevice) {
        connectedDevice.onDisconnected(handleDisconnect);
      }
    };
  }, [connectedDevice]);

  const handleSendButtonPress = () => {
    setDataToSend(inputValue);
    sendStringDataToDevice();
  };

  // const requestBluetoothPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     return true;
  //   }
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
  //     ]);
  //     return (
  //       granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
  //       granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
  //       granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
  //     );
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //     return false;
  //   }
  // };

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
      setConnectedDevices(prevDevices => [...prevDevices, device]);
      stopScan();
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const selectConnectedDevice = device => {
    if (!connectedDevice) {
      setConnectedDevice(device);
    } else {
      disconnectDevice(connectedDevice);
      setConnectedDevice(device);
      setConnectedDevices(prevDevices => prevDevices.filter(d => d.id !== device.id));
    }
  };

  const disconnectDevice = async device => {
    try {
      if (device) {
        // device.onDisconnected(null); // Clear event listener first
        await device.cancelConnection();
        setConnectedDevices(prevDevices => prevDevices.filter(d => d.id !== device.id));
      }
    } catch (error) {
      console.error('Error disconnecting from device:', error);
    } finally {
      setConnectedDevice(null);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Button
        title={connectedDevices.some(dev => dev.id === item.id) ? 'Connected' : 'Connect'}
        onPress={() => {
          if (connectedDevices.some(dev => dev.id === item.id)) {
            disconnectDevice(item);
          } else {
            connectToDevice(item);
          }
        }}
        disabled={connectedDevices.some(dev => dev.id === item.id)}
        color="teal"
      />
      {connectedDevices.some(dev => dev.id === item.id) && (
        <Button
          title="Select"
          onPress={() => selectConnectedDevice(item)}
          disabled={!!connectedDevice}
          color="#007bff" // Bootstrap primary color
        />
      )}
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
          <Button title="Disconnect" onPress={() => disconnectDevice(connectedDevice)} color="red"/>
          <TextInput
            style={styles.input}
            placeholder="Enter data to send"
            onChangeText={setInputValue} // Update inputValue when text changes
            value={inputValue}
          />
          <Button title="Send Data" onPress={handleSendButtonPress} color="teal"/>
        </View>
      )}
      {connectedDevice ? (
        <DistanceCalculator bleManager={manager} deviceIdentifier={connectedDevice.id} />
      ) : (
        <Text style={styles.noDeviceText}>No device connected.</Text>
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
    fontSize: 16
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDeviceText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default BleScreen;
