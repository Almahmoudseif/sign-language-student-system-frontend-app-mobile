import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Studentdashboard = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karibu kwenye Dashboard</Text>
      {user ? (
        <>
          <Text style={styles.info}>Jina: {user.fullName}</Text>
          <Text style={styles.info}>Namba ya Usajili: {user.registrationNumber}</Text>
          <Text style={styles.info}>Barua Pepe: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.info}>Taarifa za mwanafunzi hazipo</Text>
      )}
    </View>
  );
};

export default Studentdashboard;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
});
