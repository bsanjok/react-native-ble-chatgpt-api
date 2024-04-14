import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PersonalityAnalysis from './GptCalculation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBar } from './StatusBar';
import GenderBox from './GenderForm';
import AboutMeComponent from './AboutMe';
import AgeRangeSelector from './AgeRange';

const AnalysisOptions = ({ availableOptions, toCompareOptions, setAvailableOptions, setFinalScore, setDataToSend, dataToSend, sendStringDataToDevice, connectedDevice, selectedOptions, setSelectedOptions }) => {
  const [showAddOption, setShowAddOption] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [newOptionInput, setNewOptionInput] = useState('');
  const [ageInterest, setAgeInterest] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  

  useEffect(() => {
    setStatusBar();
    retrieveSelectedOptions();
  }, []);

  const handleFilterTextChange = (text) => {
    setFilterText(text);
    setIsTyping(text.trim().length > 0); // Update state based on whether filter text is not empty
  };
  // useEffect(() => {
  //   if (ageInterest) {
  //     setAvailableOptions(prevOptions => {
  //       if (!prevOptions.includes(ageInterest)) {
  //         return [...prevOptions, ageInterest];
  //       }
  //       return prevOptions;
  //     });
  //   }
  // }, [ageInterest]);

  // useEffect(() => {
  //   if (ageInterest) {
  //     setAvailableOptions(prevOptions => {
  //       if (!prevOptions.includes(ageInterest)) {
  //         return [...prevOptions, ageInterest];
  //       }
  //       return prevOptions;
  //     });
  //   }
  // }, [ageInterest]);

  useEffect(() => {
    saveSelectedOptions();
  }, [selectedOptions]);

  const handleAgeInterestChange = (minAge, maxAge) => {
    const ageInterestString = `Interested Age: ${minAge} to ${maxAge}`;
    setAgeInterest(ageInterestString);
  };

  const saveSelectedOptions = async () => {
    try {
      await AsyncStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    } catch (error) {
      console.error('Error saving selected options:', error);
    }
  };

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
      return;
    }
  
    if (!availableOptions.includes(newOption)) {
      setAvailableOptions([...availableOptions, newOption]);
      setFilterText('');
      setSelectedOptions([...selectedOptions, newOption]);
      setNewOptionInput('');
      setIsTyping(false);
    } else {
      Alert.alert('Option already exists.');
    }
  };
  
  useEffect(() => {
    const shouldShow = filterText.trim() !== '' && !availableOptions.includes(filterText);
    setShowAddOption(shouldShow);
  }, [filterText, availableOptions]);

  const removeOption = (option) => {
    setAvailableOptions(availableOptions.filter(availableOption => availableOption !== option));
    setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption !== option));
  };

  return (
    <View style={styles.container}>
      {!isTyping && (
        <>
          <View style={styles.filterContainer}>
            <GenderBox setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions}/>
          </View>
          {/* <View style={styles.filterContainer}><AgeRangeSelector onAgeInterestChange={handleAgeInterestChange} />
          </View> */}
          <View style={styles.filterContainerA}>
            <AboutMeComponent selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} availableOptions={availableOptions} setAvailableOptions={setAvailableOptions}/>
          </View>
 
        </>
      )}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter Interests"
          onChangeText={handleFilterTextChange}
          value={filterText}
        />
        <TouchableOpacity style={styles.resetButton} onPress={resetSelectedOptions}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.optionsContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filterOptionsByText().map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <TouchableOpacity
                  style={[styles.option, selectedOptions.includes(option) ? styles.selectedOption : null]}
                  onPress={() => toggleOption(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeOption(option)}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            {showAddOption && (
              <View style={styles.addOptionContainer}>
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
      {!isTyping && (<View style={styles.resultContainer}>
      <PersonalityAnalysis
        selectedOptions={selectedOptions}
        toCompareOptions={toCompareOptions}
        setFinalScore={setFinalScore}
        dataToSend={dataToSend}
        setDataToSend={setDataToSend}
        sendStringDataToDevice={sendStringDataToDevice}
        connectedDevice={connectedDevice}
        ageInterest={ageInterest}
      />
    </View>)}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainerA: {
    paddingHorizontal: 16,
    paddingTop: 70,
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#B2DFDB',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  addOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addOptionInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  addOptionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFC107',
    marginHorizontal: 8,
  },
  resultContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default AnalysisOptions;
