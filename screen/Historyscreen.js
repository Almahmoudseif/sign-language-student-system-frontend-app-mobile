import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Historyscreen({ route }) {
  const { studentId } = route.params;
  const [results, setResults] = useState([]);
  const [passedLessons, setPassedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsRes, passedRes] = await Promise.all([
          axios.get(`http://192.168.43.33:8080/api/results/student/${studentId}`),
          axios.get(`http://192.168.43.33:8080/api/results/student/${studentId}/passed-lessons`)
        ]);

        setResults(resultsRes.data);
        setPassedLessons(passedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (results.length === 0 && passedLessons.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No history of results or passed lessons</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>All Results</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => 'result-' + item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.assessment?.title || 'Assessment Title'}</Text>
            <Text style={styles.detail}>Score: {item.score ?? 'N/A'}</Text>
            <Text style={styles.detail}>
              Date: {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'N/A'}
            </Text>
            <Text style={styles.detail}>Grade: {item.grade ?? 'N/A'}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Passed Lessons</Text>
      <FlatList
        data={passedLessons}
        keyExtractor={(item) => 'passed-' + item.lessonId.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No passed lessons</Text>}
        renderItem={({ item }) => (
          <View style={styles.cardPassed}>
            <Text style={styles.title}>{item.lessonTitle || 'Lesson Title'}</Text>
            <Text style={styles.detail}>Score: {item.score ?? 'N/A'}</Text>
            <Text style={styles.detail}>
              Date: {item.datePassed ? new Date(item.datePassed).toLocaleDateString() : 'N/A'}
            </Text>
            <Text style={styles.detail}>Grade: {item.grade ?? 'N/A'}</Text>
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
  cardPassed: {
    backgroundColor: '#d4edda',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
});
