import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

export default function Welcomescreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(true);

  const nextStep = () => {
    if (step === 0) setStep(1);
    else setShowTip(false);
  };

  return (
    <ImageBackground
      source={require('../assets/welcome-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Tooltip
          isVisible={showTip && step === 0}
          content={<Text>Welcome to the Sign Language Learning System.</Text>}
          placement="bottom"
          onClose={nextStep}
        >
          <Text style={styles.title}>Welcome to the Sign Language Learning System</Text>
        </Tooltip>

        <Tooltip
          isVisible={showTip && step === 1}
          content={<Text>Tap here to start your learning journey.</Text>}
          placement="top"
          onClose={nextStep}
        >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
            <Text style={styles.buttonText}>Start Now</Text>
          </TouchableOpacity>
        </Tooltip>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    alignItems: 'center'
  },
  title: { fontSize: 26, color: '#fff', textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: 'hsla(117, 78%, 35%, 0.92)', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' }
});
