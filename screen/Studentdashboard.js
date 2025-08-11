import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Studentdashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karibu kwenye Dashboard</Text>
      {user ? (
        <>
          <Text style={styles.info}>Jina: {user.fullName}</Text>
          <Text style={styles.info}>Namba ya Usajili: {user.registrationNumber}</Text>
          <Text style={styles.info}>Barua Pepe: {user.email}</Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Historyscreen', { studentId: user.id })}
          >
            <Text style={styles.buttonText}>Lessons Zilizopitiwa</Text>
          </TouchableOpacity>
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
