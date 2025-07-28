import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Assessmentdetail = () => {
  const route = useRoute();
  const { assessmentId } = route.params;

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(`http://192.168.43.33:8080/api/assessments/${assessmentId}`);
        const data = await response.json();
        setAssessment(data);
      } catch (error) {
        console.error("Error fetching assessment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [assessmentId]);

  const handleSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async () => {
    // Optional: hapa unaweza kutuma kwa backend
    console.log("Majibu yaliyotumwa:", selectedAnswers);

    if (Object.keys(selectedAnswers).length !== assessment.questions.length) {
      Alert.alert("Tafadhali jibu maswali yote kabla ya kutuma.");
      return;
    }

    Alert.alert("Umefanikiwa kutuma majibu yako!", "Ahsante kwa kufanya assessment.");
  };

  const renderAnswers = (question) => {
    return question.answers.map((answer, idx) => {
      const isSelected = selectedAnswers[question.id] === answer.id;
      return (
        <TouchableOpacity
          key={answer.id}
          style={[styles.option, isSelected && styles.selectedOption]}
          onPress={() => handleSelect(question.id, answer.id)}
        >
          <Text style={styles.optionText}>
            {String.fromCharCode(65 + idx)}. {answer.content}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderQuestion = ({ item: question, index }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{index + 1}. {question.content}</Text>
      {question.answers?.length > 0 ? (
        renderAnswers(question)
      ) : (
        <Text style={styles.noAnswers}>Hakuna majibu yaliyopatikana.</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
        <Text>Inapakia assessment...</Text>
      </View>
    );
  }

  if (!assessment || !assessment.questions || assessment.questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noQuestions}>Hakuna maswali yaliyopatikana kwa assessment hii.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maswali ya: {assessment.title}</Text>
      <FlatList
        data={assessment.questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderQuestion}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Tuma Majibu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Assessmentdetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#2e7d32' },
  questionCard: {
    backgroundColor: '#f1f8e9',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 1,
  },
  questionText: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  option: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c8e6c9',
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#a5d6a7',
    borderColor: '#2e7d32',
  },
  optionText: { fontSize: 14, color: '#333' },
  noAnswers: { fontStyle: 'italic', color: '#999' },
  noQuestions: { fontSize: 16, color: '#999' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  submitButton: {
    backgroundColor: '#388e3c',
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});