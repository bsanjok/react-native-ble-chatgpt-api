// OptionsManagementPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OptionsManagementPage = ({ availableOptions, setAvailableOptions, navigation }) => {
  const [newOption, setNewOption] = useState('');

  const addOption = () => {
    if (newOption.trim() !== '') {
      setAvailableOptions([...availableOptions, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (optionToRemove) => {
    const updatedOptions = availableOptions.filter(option => option !== optionToRemove);
    setAvailableOptions(updatedOptions);
  };

  return (
    <View style={styles.container}>
      <Text>Add or Remove Options</Text>
      <TextInput
        style={styles.input}
        value={newOption}
        onChangeText={text => setNewOption(text)}
        placeholder="Enter new option"
      />
      <Button title="Add" onPress={addOption} />
      <View style={styles.optionsList}>
        {availableOptions.map(option => (
          <View key={option} style={styles.optionItem}>
            <Text>{option}</Text>
            <Button title="Remove" onPress={() => removeOption(option)} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  optionsList: {
    width: '80%',
    marginTop: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default OptionsManagementPage;
