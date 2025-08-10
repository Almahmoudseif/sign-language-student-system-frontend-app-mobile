// Loginscreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Loginscreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!registrationNumber || !password) {
      Alert.alert('Tafadhali jaza taarifa zote');
      return;
    }

    fetch('http://192.168.43.33:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationNumber, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Taarifa si sahihi');
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          Alert.alert('Karibu ' + data.fullName);
          // Hapa tunapeleka user mzima kwenye drawer
          navigation.navigate('studentdrawer', { user: data });
        } else {
          Alert.alert('Taarifa si sahihi');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Tatizo: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingia</Text>
      <TextInput
        placeholder="Registration Number"
        style={styles.input}
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingia</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text style={styles.linkText}>Huna account? Jisajili</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  linkText: { color: 'blue', textAlign: 'center', marginTop: 15 },
});
