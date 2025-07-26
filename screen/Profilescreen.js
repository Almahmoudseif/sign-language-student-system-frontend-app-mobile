import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profilescreen = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Taarifa za Mwanafunzi</Text>
      <Text style={styles.label}>Jina Kamili:</Text>
      <Text style={styles.value}>{user?.fullName}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user?.email}</Text>
      <Text style={styles.label}>Nambari ya Usajili:</Text>
      <Text style={styles.value}>{user?.registrationNumber}</Text>
    </View>
  );
};

export default Profilescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  value: {
    fontSize: 17,
    marginBottom: 15,
    color: '#555',
  },
});
