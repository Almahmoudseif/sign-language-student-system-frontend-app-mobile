import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Homescreen = () => {
  const route = useRoute();
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.fullName}!</Text>
      <Text style={styles.info}>Registration Number: {user?.registrationNumber}</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>
      <Text style={styles.info}>Role: {user?.role}</Text>
      {user?.level && <Text style={styles.info}>Level: {user?.level}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Homescreen;
