// screen/Assessmentdetailscreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Assessmentdetailscreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { assessmentId, studentId } = route.params;

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`http://192.168.43.33:8080/api/assessments/${assessmentId}`);
        setAssessment(response.data);
      } catch (error) {
        console.error("Error fetching assessment:", error);
        Alert.alert("Error", "Imeshindikana kupata maelezo ya assessment. Jaribu tena baadaye.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [assessmentId]);

  const handleSelect = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== assessment.questions.length) {
      Alert.alert("Tafadhali jibu maswali yote kabla ya kutuma.");
      return;
    }

    setSubmitting(true);

    try {
      const formattedAnswers = {};
      assessment.questions.forEach((q) => {
        const selectedAnswerId = answers[q.id];
        if (selectedAnswerId) {
          formattedAnswers[q.id] = selectedAnswerId.toString();
        }
      });

      if (!studentId) {
        Alert.alert("Tatizo", "Student ID haipatikani. Tafadhali ingia tena.");
        setSubmitting(false);
        return;
      }

      const response = await axios.post('http://192.168.43.33:8080/api/assessments/submit', {
        assessmentId,
        studentId,
        answers: formattedAnswers,
      });

      console.log('Majibu yaliyotumwa:', formattedAnswers);
      console.log('Majibu kutoka kwa server:', response.data);

      const { message, newLevel } = response.data;

      Alert.alert(
        "Matokeo",
        message,
        [
          {
            text: "Sawa",
            onPress: () => {
              navigation.navigate("Lessonscreen", { studentId, level: newLevel });
            }
          }
        ],
        { cancelable: false }
      );

      setAnswers({});
    } catch (error) {
      console.error('Kosa wakati wa kutuma majibu:', error);
      Alert.alert("Tatizo", "Imeshindikana kutuma majibu. Tafadhali jaribu tena.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderAnswers = (question) => {
    return question.answers.map((answer, idx) => {
      const isSelected = answers[question.id] === answer.id;
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

      <TouchableOpacity
        style={[styles.submitButton, submitting && { opacity: 0.5 }]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.submitButtonText}>
          {submitting ? "Inatuma..." : "Tuma Majibu"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Assessmentdetailscreen;

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
