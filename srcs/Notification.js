import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const Notification = ({ message, isError }) => {
  const [notificationOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(notificationOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideNotification();
      }, 3000);
    });

    return () => {
      clearTimeout(hideNotification);
    };
  }, []);

  const hideNotification = () => {
    Animated.timing(notificationOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
      <Text style={isError ? styles.errorText : styles.successText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
});

export default Notification;
