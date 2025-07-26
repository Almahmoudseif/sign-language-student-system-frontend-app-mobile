import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const Assessmentdetail = ({ route }) => {
  const { assessmentId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://192.168.43.33:8080/api/questions/assessment/${assessmentId}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading questions:", err);
        setLoading(false);
      });
  }, [assessmentId]);

  const renderAnswer = (answer) => (
    <View key={answer.id} style={styles.answerContainer}>
      <Text style={styles.answerText}>{answer.content}</Text>
      {answer.isCorrect !== undefined && (
        <Text style={[styles.correctTag, answer.isCorrect ? styles.correct : styles.incorrect]}>
          {answer.isCorrect ? 'Sahihi' : 'Siyosahihi'}
        </Text>
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.content}</Text>
      {item.answers && item.answers.length > 0 ? (
        item.answers.map(renderAnswer)
      ) : (
        <Text style={styles.noAnswers}>Hakuna majibu yaliyopatikana.</Text>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noData}>Hakuna maswali kwa assessment hii.</Text>}
      />
    </View>
  );
};

export default Assessmentdetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  questionContainer: { marginBottom: 20, backgroundColor: '#e3f2fd', padding: 15, borderRadius: 6 },
  questionText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  answerContainer: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#fff', borderRadius: 4, marginBottom: 6 },
  answerText: { fontSize: 16 },
  correctTag: { marginTop: 4, fontWeight: 'bold' },
  correct: { color: 'green' },
  incorrect: { color: 'red' },
  noAnswers: { fontStyle: 'italic', color: '#555' },
  noData: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
});
