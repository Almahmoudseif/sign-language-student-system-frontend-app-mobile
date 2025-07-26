import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function Welcomescreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/welcome-bg.jpg')} // hakikisha picha ipo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Karibu kwenye Mfumo wa Kujifunza Lugha ya Alama</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>Anza Sasa</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
