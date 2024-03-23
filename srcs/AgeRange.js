import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const AgeRangeSelector = ({ onAgeInterestChange }) => {
  const [minAge, setMinAge] = useState(18); // Initial minimum age
  const [maxAge, setMaxAge] = useState(65); // Initial maximum age

  const handleMinAgeChange = (value) => {
    setMinAge(value);
    onAgeInterestChange(minAge, maxAge); // Call the callback function with updated values
  };

  const handleMaxAgeChange = (value) => {
    setMaxAge(value);
    onAgeInterestChange(minAge, maxAge); // Call the callback function with updated values
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Preferred Age Range: {minAge} - {maxAge}</Text>
      <View style={{ width: '80%', marginTop: 20 }}>
        <Text>Min Age: {minAge}</Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={18}
          maximumValue={100}
          step={1}
          value={minAge}
          onValueChange={handleMinAgeChange}
        />
        <Text>Max Age: {maxAge}</Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={18}
          maximumValue={100}
          step={1}
          value={maxAge}
          onValueChange={handleMaxAgeChange}
        />
      </View>
    </View>
  );
};

export default AgeRangeSelector;
