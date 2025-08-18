// Loginscreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Ionicons } from '@expo/vector-icons';

const Loginscreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // state ya kuonyesha password

  // Tour state
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(true);

  const nextStep = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else setShowTip(false); // tour completed
  };

  const handleLogin = () => {
    if (!registrationNumber || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    fetch('http://192.168.43.33:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationNumber, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          Alert.alert('Welcome ' + data.fullName);
          navigation.navigate('studentdrawer', { user: data });
        } else {
          Alert.alert('Invalid credentials');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Tooltip
        isVisible={showTip && step === 0}
        content={<Text>Enter your registration number here.</Text>}
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
        content={<Text>Enter your password here.</Text>}
        placement="bottom"
        onClose={nextStep}
      >
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </Tooltip>

      <Tooltip
        isVisible={showTip && step === 2}
        content={<Text>Tap here to login to the system.</Text>}
        placement="top"
        onClose={nextStep}
      >
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Tooltip>

      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text style={styles.linkText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 5 },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputPassword: { flex: 1, padding: 12 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  linkText: { color: 'blue', textAlign: 'center', marginTop: 15 },
});
