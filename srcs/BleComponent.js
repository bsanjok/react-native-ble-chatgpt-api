import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx'; // Import BleManager

const BleScreen = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const bleManager = new BleManager(); // Initialize BleManager
    setManager(bleManager);
    
    // Clean up function
    return () => {
      bleManager.destroy();
    };
  }, []);

  const startScan = async () => {
    if (!manager) {
      console.error('BleManager is not initialized.');
      return;
    }

    try {
      setIsScanning(true);
      await manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error('Error scanning:', error);
          return;
        }
        if (!devices.find(dev => dev.id === device.id)) {
          setDevices(prevDevices => [...prevDevices, device]);
        }
      });
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  };

  const stopScan = async () => {
    if (!manager) {
      console.error('BleManager is not initialized.');
      return;
    }

    try {
      setIsScanning(false);
      await manager.stopDeviceScan();
    } catch (error) {
      console.error('Error stopping scan:', error);
    }
  };

  const connectToDevice = async device => {
    if (!manager) {
      console.error('BleManager is not initialized.');
      return;
    }

    try {
      await device.connect();
      await device.discoverAllServicesAndCharacteristics();
      // You can now proceed with sending data or any other actions
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Button title="Connect" onPress={() => connectToDevice(item)} />
    </View>
  );

  return (
    <View>
      <Button
        title={isScanning ? 'Stop Scan' : 'Start Scan'}
        onPress={isScanning ? stopScan : startScan}
        disabled={!manager}
      />
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BleScreen;
