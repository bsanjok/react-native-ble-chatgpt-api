import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ onPress }) => {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <LinearGradient colors={['transparent', 'black']} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to Personai</Text>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
