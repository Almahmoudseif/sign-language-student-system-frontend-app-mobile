import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const Resultscreen = ({ user }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://192.168.43.33:8080/api/results/student/${user?.id}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.examTitle}>{item.assessmentTitle}</Text>
      <Text style={styles.score}>Alama: {item.score}</Text>
      <Text style={styles.level}>Kiwango: {item.level}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Matokeo Yako</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Resultscreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  resultItem: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 12,
  },
  examTitle: { fontSize: 18, fontWeight: '600' },
  score: { fontSize: 16 },
  level: { fontSize: 16, color: '#555' },
});
