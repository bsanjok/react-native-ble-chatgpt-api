// import React from 'react';
// import { View, Button, PermissionsAndroid } from 'react-native';
// import BleAdvertise from 'react-native-ble-advertise';

// const generateUUID = () => {
//   // Generate a random UUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16 | 0,
//       v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// };

// const requestBluetoothPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//       {
//         title: 'Bluetooth Advertise Permission',
//         message: 'App needs access to advertise using Bluetooth.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Bluetooth Advertise permission granted');
//       startAdvertising();
//     } else {
//       console.log('Bluetooth Advertise permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// const startAdvertising = () => {
//   const uuid = generateUUID(); // Generate random UUID for service
//   const major = parseInt('CD00', 16); // Convert major string to a number
//   const minor = parseInt('0003', 16); // Convert minor string to a number

//   BleAdvertise.setCompanyId(0x00E0); // Set company ID

//   BleAdvertise.broadcast(uuid, major, minor)
//     .then(() => {
//       console.log('Broadcast started');
//     })
//     .catch(error => {
//       console.log('Broadcast failed with error:', error);
//     });
// };

// const BLEAdvertiserComponent = () => {
//   const handleButtonPress = () => {
//     requestBluetoothPermission();
//   };

//   return (
//     <View>
//       <Button title="Start Advertising" onPress={handleButtonPress} />
//     </View>
//   );
// };

// export default BLEAdvertiserComponent;
