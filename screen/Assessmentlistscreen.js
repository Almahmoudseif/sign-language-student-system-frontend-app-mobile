// screen/Assessmentlistscreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Assessmentlistscreen = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const user = route.params?.user;

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://192.168.43.33:8080/api/assessments/student/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setAssessments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [user]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.assessmentItem}
      onPress={() => navigation.navigate("Assessmentdetailscreen", { assessmentId: item.id, studentId: user.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.level}>Kiwango: {item.level}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mitihani Yako</Text>
      {assessments.length === 0 ? (
        <Text style={styles.noData}>Hakuna mitihani iliyopatikana.</Text>
      ) : (
        <FlatList
          data={assessments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Assessmentlistscreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  assessmentItem: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 16, color: '#555' },
  description: { fontSize: 16, color: '#777' },
  noData: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
