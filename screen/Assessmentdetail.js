// screen/Assessmentdetail.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Assessmentdetail = () => {
  const route = useRoute();
  const { assessmentId } = route.params;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://192.168.43.33:8080/api/questions/assessment/${assessmentId}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [assessmentId]);

  const renderQuestion = ({ item, index }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{index + 1}. {item.content}</Text>
      {item.optionA && <Text style={styles.option}>A. {item.optionA}</Text>}
      {item.optionB && <Text style={styles.option}>B. {item.optionB}</Text>}
      {item.optionC && <Text style={styles.option}>C. {item.optionC}</Text>}
      {item.optionD && <Text style={styles.option}>D. {item.optionD}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
        <Text>Inapakia maswali...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noQuestions}>Hakuna maswali kwa assessment hii.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maswali ya Assessment</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderQuestion}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Assessmentdetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  questionCard: {
    backgroundColor: '#f1f8e9',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  questionText: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  option: { fontSize: 14, color: '#555', marginBottom: 4 },
  noQuestions: { fontSize: 16, color: '#999' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
