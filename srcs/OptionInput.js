import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Platform } from 'react-native';
import PersonalityAnalysis from './GptCalculation';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { setStatusBar } from './StatusBar';

const AnalysisOptions = ({ availableOptions, toCompareOptions, setAvailableOptions, setFinalScore }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showAddOption, setShowAddOption] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [newOptionInput, setNewOptionInput] = useState('');

  // Retrieve selected options from AsyncStorage on component mount
  useEffect(() => {
    setStatusBar();
    retrieveSelectedOptions();
  }, []);
  // Save selected options to AsyncStorage whenever it changes
  useEffect(() => {
    saveSelectedOptions();
  }, [selectedOptions]);

  // Function to save selected options to AsyncStorage
  const saveSelectedOptions = async () => {
    try {
      await AsyncStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    } catch (error) {
      console.error('Error saving selected options:', error);
    }
  };

  // Function to retrieve selected options from AsyncStorage
  const retrieveSelectedOptions = async () => {
    try {
      const storedOptions = await AsyncStorage.getItem('selectedOptions');
      if (storedOptions !== null) {
        setSelectedOptions(JSON.parse(storedOptions));
      }
    } catch (error) {
      console.error('Error retrieving selected options:', error);
    }
  };

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filterOptionsByText = () => {
    return availableOptions.filter(option => option.toLowerCase().includes(filterText.toLowerCase()));
  };

  const resetSelectedOptions = () => {
    setSelectedOptions([]);
  };

  const addNewOption = () => {
    const newOption = filterText.trim();
  
    if (newOption === '') {
      Alert.alert('Option cannot be empty.');
      return; // Exit the function early if the input is empty
    }
  
    if (!availableOptions.includes(newOption)) {
      setAvailableOptions([...availableOptions, newOption]);
      setFilterText('');
      setSelectedOptions([...selectedOptions, newOption]); // Automatically select the newly added option
      setNewOptionInput(''); // Clear the input field after adding the new option
    } else {
      Alert.alert('Option already exists.');
    }
  };
  
  // Determine whether to show the "Add Option" button
  useEffect(() => {
    const shouldShow = filterText.trim() !== '' && !availableOptions.includes(filterText);
    setShowAddOption(shouldShow);
  }, [filterText, availableOptions]);

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
          {showAddOption && (
            <View style={styles.addOptionContainer}>
              <TextInput
                style={styles.addOptionInput}
                placeholder="Enter new option"
                onChangeText={text => setNewOptionInput(text)}
                value={newOptionInput}
              />
              <TouchableOpacity
                style={[styles.option, styles.addOptionButton]}
                onPress={addNewOption}
              >
                <Text style={styles.optionText}>Add Option</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.resultContainer}>
        <PersonalityAnalysis selectedOptions={selectedOptions} toCompareOptions={toCompareOptions} setFinalScore={setFinalScore}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: Platform.OS === 'ios' ? 0 : 0, // Add platform-specific padding for iOS
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 0, // Add platform-specific padding for iOS
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
  addOption: {
    backgroundColor: '#FFC107',
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Light gray background color
    padding: 16, // Padding for the result box
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
  },
});

export default AnalysisOptions;
