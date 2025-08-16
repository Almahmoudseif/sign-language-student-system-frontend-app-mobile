import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useRoute, useNavigation } from '@react-navigation/native';

const Studentdashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = route.params?.user;

  // State za tooltip
  const [showTooltip1, setShowTooltip1] = useState(true); // kwa jina
  const [showTooltip2, setShowTooltip2] = useState(false); // kwa namba ya usajili
  const [showTooltip3, setShowTooltip3] = useState(false); // kwa button

  const handleNext = (current) => {
    if (current === 1) {
      setShowTooltip1(false);
      setShowTooltip2(true);
    } else if (current === 2) {
      setShowTooltip2(false);
      setShowTooltip3(true);
    } else if (current === 3) {
      setShowTooltip3(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karibu kwenye Dashboard</Text>

      {user ? (
        <>
          <Tooltip
            isVisible={showTooltip1}
            content={<Text>Hapa ni jina lako la mwanafunzi</Text>}
            placement="bottom"
            onClose={() => handleNext(1)}
          >
            <Text style={styles.info}>Jina: {user.fullName}</Text>
          </Tooltip>

          <Tooltip
            isVisible={showTooltip2}
            content={<Text>Hapa unaweza kuona namba yako ya usajili</Text>}
            placement="bottom"
            onClose={() => handleNext(2)}
          >
            <Text style={styles.info}>Namba ya Usajili: {user.registrationNumber}</Text>
          </Tooltip>

          <Text style={styles.info}>Barua Pepe: {user.email}</Text>

          <Tooltip
            isVisible={showTooltip3}
            content={<Text>Bofya hapa kuona lessons ulizopitia</Text>}
            placement="top"
            onClose={() => handleNext(3)}
          >
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Historyscreen', { studentId: user.id })}
            >
              <Text style={styles.buttonText}>Lessons Zilizopitiwa</Text>
            </TouchableOpacity>
          </Tooltip>
        </>
      ) : (
        <Text style={styles.info}>Taarifa za mwanafunzi hazipo</Text>
      )}
    </View>
  );
};

export default Studentdashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  info: {
    fontSize: 18,
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
