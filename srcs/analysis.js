import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import PersonalityAnalysis from './personality';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AnalysisOptions = ({ selectedOptions, setSelectedOptions, availableOptions, toCompareOptions, sortingAlphabets, filterText, setFilterText }) => {
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  // const HomeScreen = ({navigation}) => {
  //   return (
  //     <Button
  //       title="Go to Jane's profile"
  //       onPress={() =>
  //         navigation.navigate('Profile', {name: 'Jane'})
  //       }
  //     />
  //   );
  // };
  // const ProfileScreen = ({navigation, route}) => {
  //   return <Text>This is {route.params.name}'s profile</Text>;
  // };
  const filterOptionsByText = () => {
    return availableOptions.filter(option => option.toLowerCase().includes(filterText.toLowerCase()));
  };

  const resetSelectedOptions = () => {
    setSelectedOptions([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter options"
          onChangeText={text => setFilterText(text)}
          value={filterText}
        />
        <TouchableOpacity style={styles.resetButton} onPress={resetSelectedOptions}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filterOptionsByText().map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selectedOptions.includes(option) ? styles.selectedOption : null]}
              onPress={() => toggleOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Personality Analysis Result */}
      <View style={styles.resultContainer}>
        <PersonalityAnalysis selectedOptions={selectedOptions} toCompareOptions={toCompareOptions} />
      </View>
      {/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  resetButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  selectedOption: {
    backgroundColor: '#B2DFDB',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  resultContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default AnalysisOptions;
