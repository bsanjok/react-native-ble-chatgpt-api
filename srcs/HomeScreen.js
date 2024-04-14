import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo, if not, use appropriate icon library
import AnalysisOptions from './OptionInput';
import BleComponent from './BleComponent';
import BLEAdvertiserComponent from './BleBroadcaster';

function HomeScreen({ navigation,  setFinalScore, dataToSend, setDataToSend, sendStringDataToDevice, connectedDevice}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [availableOptions, setAvailableOptions] = useState(["Anime", "Football", "Video Games", "Startup", "Beer", "Travel", "Hiking", "Project Management", "Food", "Making Friends", "Cycling"]);
    const [toCompareOptions, setToCompareOptions] = useState(["Startup", "Beer", "Travel", "Hiking"])
    const [sortingAlphabets, setSortingAlphabets] = useState([]);
    const [filterText, setFilterText] = useState('');
  return (
        <AnalysisOptions
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        toCompareOptions={toCompareOptions}
        availableOptions={availableOptions}
        sortingAlphabets={sortingAlphabets}
        filterText={filterText}
        setFilterText={setFilterText}
        setAvailableOptions={setAvailableOptions}
        setFinalScore={setFinalScore}
        dataToSend={dataToSend}
        setDataToSend={setDataToSend}
        sendStringDataToDevice={sendStringDataToDevice}
        connectedDevice={connectedDevice}
      />
  );
}

function DevicesScreen({ navigation, finalScore, setConnectedDevice, connectedDevice, sendStringDataToDevice, setDataToSend, dataToSend, requestBluetoothPermission}) {
  return (
    <BleComponent 
    finalScore={finalScore} 
    setConnectedDevice={setConnectedDevice} 
    connectedDevice={connectedDevice}
    sendStringDataToDevice={sendStringDataToDevice}
    setDataToSend={setDataToSend} 
    dataToSend={dataToSend}
    requestBluetoothPermission={requestBluetoothPermission}
    />
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button title="Go to Notifications" onPress={() => navigation.navigate('Notifications')} />
    // </View>
  );
}

function NotificationsScreen({ navigation, dataToSend, requestBluetoothPermission }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <BLEAdvertiserComponent requestBluetoothPermission={requestBluetoothPermission}/> */}
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreenPage( {setFinalScore, finalScore, setConnectedDevice, connectedDevice, sendStringDataToDevice, setDataToSend, dataToSend , requestBluetoothPermission} ) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
        
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Devices') {
              iconName = focused ? 'bluetooth' : 'bluetooth-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
        
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red', // Set active tab color to red
          tabBarInactiveTintColor: 'gray', // Set inactive tab color to gray
          tabBarStyle: [
            {
              display: 'flex', // Ensure the tab bar is displayed as a flex container
            },
            null,
          ],
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} setFinalScore={setFinalScore} setDataToSend={setDataToSend} dataToSend={dataToSend} sendStringDataToDevice={sendStringDataToDevice} connectedDevice={connectedDevice}/>}
        </Tab.Screen>
        <Tab.Screen name="Devices">
          {(props) => <DevicesScreen {...props} finalScore={finalScore} setConnectedDevice={setConnectedDevice} connectedDevice={connectedDevice} sendStringDataToDevice={sendStringDataToDevice} setDataToSend={setDataToSend} dataToSend={dataToSend} requestBluetoothPermission={requestBluetoothPermission}/>}
        </Tab.Screen>
        <Tab.Screen name="Notifications">
        {(props) => <NotificationsScreen {...props} dataToSend={dataToSend} requestBluetoothPermission={requestBluetoothPermission}/>}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
