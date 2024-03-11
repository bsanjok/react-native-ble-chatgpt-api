import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './srcs/welcome';
import AnalysisOptions from './srcs/analysis';

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(["Anime", "Football", "Video Games", "Startup", "Beer", "Travel", "Hiking", "Project Management", "Food", "Making Friends", "Cycling"]);
  const [toCompareOptions, setToCompareOptions] = useState(["Startup", "Beer", "Travel", "Hiking"])
  const [sortingAlphabets, setSortingAlphabets] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    populateSortingAlphabets();
  }, []);

  useEffect(() => {
    populateSortingAlphabets();
  }, [availableOptions]);

  const populateSortingAlphabets = () => {
    const alphabets = availableOptions.map(option => option.charAt(0).toUpperCase());
    const uniqueAlphabets = [...new Set(alphabets)].sort();
    setSortingAlphabets(uniqueAlphabets);
  };

  return (
    <View style={styles.container}>
      {!showOptions ? (
        <WelcomeScreen onPress={() => setShowOptions(true)} />
      ) : (
        <AnalysisOptions
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          toCompareOptions={toCompareOptions}
          availableOptions={availableOptions}
          sortingAlphabets={sortingAlphabets}
          filterText={filterText}
          setFilterText={setFilterText}
        />
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
