import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo, otherwise import icons from appropriate library

const PersonalityAnalysis = ({ selectedOptions, toCompareOptions }) => {
  const [analysisResult, setAnalysisResult] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false); // State to track if button is pressed

  console.log(selectedOptions);
  console.log(toCompareOptions);
  const formattedSelectedoptions = selectedOptions.join(", ");
  const formattedCompareOptions = toCompareOptions.join(", ");
  const sendToChatGPT = async () => {
    try {
      setLoading(true);

      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are provided with two user with set of keywords of interests separated by comma. Two users are separated by |. With content you are provided, compute a Cosine Similarity score out of 100 based on their interests. Show only score and summary of comparision with short insight. Add a suggestion for bonding at end."
          },
          {
            role: "user",
            content: `First user: ${formattedSelectedoptions} | Second user: ${formattedCompareOptions}`
          }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      };

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // Replace YOUR_API_KEY with your actual API key
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setAnalysisResult(data.choices[0].message.content);
      setMinimized(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleButtonPress = () => {
    setButtonPressed(true);
    if (selectedOptions.length === 0) {
      setAnalysisResult("No option selected. Please select one or more for better analysis.");
    } else {
      sendToChatGPT();
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="teal" />
      ) : (
        <>
          {analysisResult && (
            <View style={styles.resultContainer}>
              <TouchableOpacity onPress={toggleMinimize}>
                {minimized ? (
                  <FontAwesome name="angle-double-up" size={24} color="gray" />
                ) : (
                  <FontAwesome name="angle-double-down" size={24} color="gray" />
                )}
              </TouchableOpacity>
              {!minimized && (
                <View>
                  <Text style={styles.resultText}>Personality Analysis Result:</Text>
                  <Text style={styles.resultContent}>{analysisResult}</Text>
                </View>
              )}
            </View>
          )}
          {!analysisResult && buttonPressed && selectedOptions.length === 0 && (
            <Text style={styles.staticMessage}>No option selected. Please select one or more for better analysis.</Text>
          )}
          <TouchableOpacity style={styles.analyzeButton} onPress={handleButtonPress}>
            <Text style={styles.analyzeButtonText}>Analyze Personality</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  analyzeButton: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  resultContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  resultContent: {
    textAlign: 'center',
  },
  staticMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default PersonalityAnalysis;
