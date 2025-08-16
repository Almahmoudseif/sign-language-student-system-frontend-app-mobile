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
          content={<Text>Hapa ni ujumbe wa kukukaribisha kwenye mfumo wa kujifunza lugha ya alama.</Text>}
          placement="bottom"
          onClose={nextStep}
        >
          <Text style={styles.title}>Karibu kwenye Mfumo wa Kujifunza Lugha ya Alama</Text>
        </Tooltip>

        <Tooltip
          isVisible={showTip && step === 1}
          content={<Text>Bofya hapa kuanza safari yako ya kujifunza.</Text>}
          placement="top"
          onClose={nextStep}
        >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
            <Text style={styles.buttonText}>Anza Sasa</Text>
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
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' }
});
