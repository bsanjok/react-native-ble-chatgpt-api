import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo, if not, use appropriate icon library
import AnalysisOptions from './OptionInput';
import BleComponent from './BleComponent';

function HomeScreen({ navigation }) {
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
      />
  );
}

function ProfileScreen({ navigation }) {
  return (
    <BleComponent />
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button title="Go to Notifications" onPress={() => navigation.navigate('Notifications')} />
    // </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
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

export default function HomeScreenPage() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
