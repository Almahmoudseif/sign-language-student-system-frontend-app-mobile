// Registerscreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';

const Registerscreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Tour state
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(true);

  const nextStep = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else setShowTip(false); // tour imekamilika
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Tafadhali jaza taarifa zote');
      return;
    }

    try {
      const response = await axios.post('http://192.168.43.33:8080/api/users/register', {
        fullName,
        email,
        password,
        role: 'student'
      });

      const data = response.data;

      Alert.alert(
        'Usajili Umefanikiwa!',
        `Namba yako ya usajili ni: ${data.registrationNumber}`,
      );

      setTimeout(() => {
        navigation.navigate('login');
      }, 3000);
    } catch (error) {
      console.log(error);
      Alert.alert('Usajili umeshindikana', 'Tafadhali hakikisha taarifa zako ni sahihi');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jisajili</Text>

      <Tooltip
        isVisible={showTip && step === 0}
        content={<Text>Ingiza jina lako kamili hapa.</Text>}
        placement="bottom"
        onClose={nextStep}
      >
        <TextInput
          placeholder="Jina Kamili"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      </Tooltip>

      <Tooltip
        isVisible={showTip && step === 1}
        content={<Text>Ingiza barua pepe yako hapa.</Text>}
        placement="bottom"
        onClose={nextStep}
      >
        <TextInput
          placeholder="Barua Pepe"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
      </Tooltip>

      <Tooltip
        isVisible={showTip && step === 2}
        content={<Text>Weka nenosiri yako hapa.</Text>}
        placement="bottom"
        onClose={nextStep}
      >
        <TextInput
          placeholder="Nenosiri"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </Tooltip>

      <Tooltip
        isVisible={showTip && step === 3}
        content={<Text>Bofya hapa kujiandikisha kwenye mfumo.</Text>}
        placement="top"
        onClose={nextStep}
      >
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Jisajili</Text>
        </TouchableOpacity>
      </Tooltip>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.link}>Tayari una akaunti? Ingia hapa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registerscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center'
  }
});
