import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DistanceCalculator = ({ bleManager, deviceIdentifier }) => {
  const [distance, setDistance] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(timerId); // Cleanup timer on unmount
    };
  }, []);

  const startCalculatingDistance = () => {
    setIsCalculating(true);
    const id = setInterval(calculateDistance, 1000); // Update distance every second
    setTimerId(id);
  };

  const stopCalculatingDistance = () => {
    setIsCalculating(false);
    clearInterval(timerId);
  };

  const calculateDistance = async () => {
    try {
      const device = await bleManager.readRSSIForDevice(deviceIdentifier);
      const rssi = device.rssi;
  
      // Parameters for the Log-Distance Path Loss Model
      const txPower = -59; // RSSI at 1 meter from the beacon
      const n = 2; // Path loss exponent, typically ranges from 2 to 4
  
      // Calculate distance using the Log-Distance Path Loss Model
      const distance = Math.pow(10, ((txPower - rssi) / (10 * n)));
  
      // Update the distance state
      setDistance(distance.toFixed(2)); // Round distance to 2 decimal places
    } catch (error) {
      console.error('Error reading RSSI:', error);
      setDistance(null); // Reset distance if there's an error
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.distanceText}>Distance: {distance !== null ? `${distance} meters` : 'N/A'}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Calculate Distance"
          onPress={startCalculatingDistance}
          disabled={isCalculating}
          color="teal"
        />
        <Button
          title="Stop"
          onPress={stopCalculatingDistance}
          disabled={!isCalculating}
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  distanceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DistanceCalculator;
