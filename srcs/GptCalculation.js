import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PersonalityAnalysis = ({ selectedOptions, toCompareOptions, setFinalScore, dataToSend, setDataToSend, sendStringDataToDevice, connectedDevice}) => {
  const [analysisResult, setAnalysisResult] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false); // State to track if button is pressed
  const [resultingScore, setResultingScore] = useState('');

  console.log(`First user: ${selectedOptions}`);
  console.log(`Second User: ${toCompareOptions}`);
  const formattedSelectedoptions = selectedOptions.join(", ");
  const formattedCompareOptions = toCompareOptions.join(", ");

  useEffect(() => {
    console.log(dataToSend);
    if (dataToSend !== 'wrong') {
      sendStringDataToDevice();
      setDataToSend('wrong'); // Reset dataToSend after sending
    }
  }, [dataToSend, sendStringDataToDevice]);
  

  useEffect(() => {
    if (resultingScore !== null) {
      if (resultingScore < 30) {
        setDataToSend("red");
      } else if (resultingScore >= 30 && resultingScore < 80) {
        setDataToSend("blue");
      } else if (resultingScore >= 80){
        setDataToSend("green");
      }
      else {
        setDataToSend("wrong");
      }
    }
  }, [resultingScore, setDataToSend]);
  

  const extractResultingScore = (result) => {
    // Implement the logic to extract the score from the result
    // For example, if the result is a string containing the score at the end:
    const scoreIndex = result.lastIndexOf('Score:');
    const scoreString = result.substring(scoreIndex + 7); // Assuming 'Score:' is followed by the score
    const score = parseFloat(scoreString);

    return score;
  };


  const sendToChatGPT = async () => {
    try {
      setLoading(true);

      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are provided with two user with set of keywords of interests separated by comma. Two users are separated by |. With content you are provided, compute similarity score based on Cosine Similarity algorithm. Show score as out of 100 based on their interests. Show only score and summary of comparision with short insight. Add a suggestion for bonding at end."
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
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setAnalysisResult(data.choices[0].message.content);
      
      const result = data.choices[0].message.content;
      // Extract score from the result

      setResultingScore(extractResultingScore(result))
      console.log(`the score is: ${resultingScore}`);
      setFinalScore(resultingScore);
      // if(resultingScore < 30)
      // {
      //   setDataToSend("red");
      //   sendStringDataToDevice();
      // }
      // else if (resultingScore > 30 && resultingScore < 80)
      // {
      //   setDataToSend("blue");
      //   sendStringDataToDevice();
      // }
      // else if (resultingScore > 80)
      // {
      //   setDataToSend("green");
      //   sendStringDataToDevice();
      // }
      // Pass resulting score to parent component

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
    } 
    else if (!connectedDevice){
      setAnalysisResult("No devices connected. Pleae connect a device to proceed.");
    }
     else {
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
                  <View style={styles.resultContainer}>
                    <Text color="gray">Press to expand</Text>
                    <FontAwesome name="angle-double-up" size={30} color="gray" />
                  </View>
                ) : (
                  <FontAwesome name="angle-double-down" size={30} color="gray" />
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
