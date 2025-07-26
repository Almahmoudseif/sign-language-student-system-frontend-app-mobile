// screen/Lessonscreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Lessonscreen = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`http://192.168.43.33:8080/api/lessons/level/${user.level}`);
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.level) {
      fetchLessons();
    }
  }, [user]);

  useEffect(() => {
  console.log('User data:', user); // Angalia kama level ipo
  if (user && user.level) {
    fetchLessons();
  }
}, [user]);


  const renderLesson = ({ item }) => (
    <View style={styles.lessonCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Unaweza kuongeza video viewer au download link hapa kama masomo yana video */}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading lessons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {lessons.length === 0 ? (
        <Text style={styles.noLessons}>Hakuna masomo kwa level yako kwa sasa.</Text>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLesson}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  lessonCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
  noLessons: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default Lessonscreen;
