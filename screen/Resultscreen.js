import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Historyscreen({ route }) {
  const { studentId } = route.params;  // tunatumia studentId kutoka navigation
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // API inatarajiwa kurudisha results zenye lesson info ndani
        const res = await axios.get(`http://192.168.43.33:8080/api/results/student/${studentId}`);
        setHistory(res.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [studentId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Hakuna historia ya matokeo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.lessonTitle || item.assessmentTitle || 'Lesson Title'}</Text>
            <Text style={styles.detail}>Alama: {item.score ?? 'Haipo'}</Text>
            <Text style={styles.detail}>Tarehe: {new Date(item.date).toLocaleDateString()}</Text>
            {/* Unaweza kuongeza maelezo zaidi kama unataka */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
  