import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddOptionScreen = ({ onAddOption, onRemoveOption, availableOptions }) => {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() !== '') { // Check if option is not empty
      onAddOption(newOption.trim()); // Add trimmed option
      setNewOption(''); // Reset input field
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add or Remove Options</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a new option"
          value={newOption}
          onChangeText={setNewOption}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {availableOptions.length > 0 && (
        <View style={styles.optionsList}>
          <Text style={styles.optionsTitle}>Available Options:</Text>
          {availableOptions.map((option, index) => (
            <View key={index} style={styles.optionItem}>
              <Text style={styles.optionText}>{option}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveOption(index)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  optionsList: {
    marginTop: 20,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
  },
  removeButton: {
    paddingHorizontal: 10,
  },
  removeButtonText: {
    color: 'red',
    fontSize: 14,
  },
});

export default AddOptionScreen;
