import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutMeComponent = ({selectedOptions, setSelectedOptions, availableOptions, setAvailableOptions}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');

  const handleSave = async () => {
    // Implement save functionality here
    console.log('Saved:', aboutMeText);
    setModalVisible(false); // Close the modal after saving

    // Call function to send aboutMeText to ChatGPT and update selectedOptions and availableOptions
    await sendToChatGPT(aboutMeText);
  };

  const sendToChatGPT = async (aboutMeText) => {
    try {
      // Prepare the content for ChatGPT
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Generate keywords about interests of the person from about me text. The result should be separated by comma and should not include words that are not interests. The returned interest should not contain any ."
          },
          {
            role: "user",
            content: aboutMeText // Sending aboutMe text to ChatGPT
          }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      };
  
      // Send request to ChatGPT
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
      const keywordsResponse = data.choices[0].message.content;
  
      // Check for failure response
      if (!keywordsResponse.toLowerCase().includes('sorry') && !keywordsResponse.toLowerCase().includes('failed')) {
        // Parse the response to extract keywords separated by comma
        const keywords = keywordsResponse.split(',').map(keyword => keyword.trim());
  
        // Filter out duplicate keywords that already exist in selectedOptions and availableOptions
        const filteredKeywords = keywords.filter(keyword => !selectedOptions.includes(keyword) && !availableOptions.includes(keyword));
  
        // Update selectedOptions and availableOptions with the generated keywords
        setSelectedOptions([...selectedOptions, ...filteredKeywords]);
        setAvailableOptions([...availableOptions, ...filteredKeywords]);
      } else {
        console.log('ChatGPT response indicates failure.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.textBox}>
          <Text style={styles.text}>About Me</Text>
          <Icon name="magic" size={20} style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Write something about yourself..."
                placeholderTextColor="#999"
                onChangeText={text => setAboutMeText(text)}
                value={aboutMeText}
                autoFocus={true}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'linear-gradient(90deg, rgba(255,215,0,1) 0%, rgba(0,0,0,0) 100%)', // Mustard linear gradient
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row', // Arrange text and icon in the same row
    alignItems: 'center', // Vertically center the text and icon
    justifyContent: 'space-between', // Distribute space between text and icon
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    fontSize: 20,
    color: '#999', // Gray color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'teal',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AboutMeComponent;
