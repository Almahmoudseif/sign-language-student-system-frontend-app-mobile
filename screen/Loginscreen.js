// Loginscreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

const Loginscreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  
  // State za tour
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(true);

  const nextStep = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else setShowTip(false); // tour imekamilika
  };

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

      <Tooltip
        isVisible={showTip && step === 0}
        content={<Text>Ingiza Registration Number yako hapa.</Text>}
        placement="bottom"
        onClose={nextStep}
      >
        <TextInput
          placeholder="Registration Number"
          style={styles.input}
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
        />
      </Tooltip>

      <Tooltip
        isVisible={showTip && step === 1}
        content={<Text>Ingiza password yako hapa.</Text>}
        placement="bottom"
        onClose={nextStep}
      >
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </Tooltip>

      <Tooltip
        isVisible={showTip && step === 2}
        content={<Text>Bofya hapa kuingia kwenye mfumo.</Text>}
        placement="top"
        onClose={nextStep}
      >
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingia</Text>
        </TouchableOpacity>
      </Tooltip>

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
