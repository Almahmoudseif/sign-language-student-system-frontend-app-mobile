import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';

const Lessonscreen = () => {
  const route = useRoute();
  const user = route.params?.user;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.level) {
      fetchLessons();
    } else {
      console.warn('Level ya user haipo au haijafika bado.');
      setLoading(false);
    }
  }, [user]);

  const fetchLessons = async () => {
    try {
      const level = user.level.toUpperCase();
      const url = `http://192.168.43.33:8080/api/lessons/level/${level}`;
      const response = await axios.get(url);
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMediaUrl = (path) => {
    if (!path) return null;
    return path.startsWith('/')
      ? `http://192.168.43.33:8080${path}`
      : `http://192.168.43.33:8080/${path}`;
  };

  const renderLesson = ({ item }) => (
    <View style={styles.lessonCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {item.imageUrl && (
        <Image
          source={{ uri: getMediaUrl(item.imageUrl) }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {item.videoPath ? (
        <Video
          source={{ uri: getMediaUrl(item.videoPath) }}
          useNativeControls
          resizeMode="contain"
          style={styles.video}
        />
      ) : (
        <Text style={styles.noVideo}>No video available.</Text>
      )}
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
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  noLessons: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  noVideo: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
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
