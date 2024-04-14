import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import chroma from 'chroma-js';

const GenderBox = ({selectedOptions, setSelectedOptions}) => {

  const renderBox = (option, icon, colors) => {
    const isSelected = selectedOptions.includes(option);
    const darkerColor = chroma(colors[0]).darken(0.3).hex();

    return (
      <TouchableOpacity
        key={option}
        style={[styles.box, isSelected && styles.selectedBox]}
        onPress={() => toggleOption(option)}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}>
          <FontAwesome name={icon} size={40} color="white" />
          {isSelected && (
            <FontAwesome name="check" size={20} color="white" style={styles.selectedIcon} />
          )}
        </LinearGradient>
        {isSelected && (
          <View style={[styles.overlay, { backgroundColor: darkerColor }]} />
        )}
      </TouchableOpacity>
    );
  };

  const toggleOption = (option) => {
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter(selectedOption => selectedOption !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    const combinedSelection = updatedOptions.length > 0 ? `Interested in: ${updatedOptions.join(', ')}` : '';
    setSelectedOptions(updatedOptions, combinedSelection);
  };

  return (
    <View style={styles.container}>
      {renderBox('Male', 'male', ['#5DADE2', '#2E86C1'])}
      {renderBox('Female', 'female', ['#F1948A', '#E74C3C'])}
      {renderBox('LGBTQ+', 'transgender', ['#A9DFBF', '#27AE60'])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
  box: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    aspectRatio: 1,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    opacity: 0.5,
  },
  selectedIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default GenderBox;
