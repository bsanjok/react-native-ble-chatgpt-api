import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './srcs/welcome';
import HomeScreenPage from './srcs/HomeScreen';

const App = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={styles.container}>
      {!showOptions ? (
        <WelcomeScreen onPress={() => setShowOptions(true)} />
        ) : (
          <HomeScreenPage />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
