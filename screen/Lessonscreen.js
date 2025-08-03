import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const Lessonscreen = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('images');

  const navigation = useNavigation();

  useEffect(() => {
    fetchLessonsByLevel('BEGINNER');
  }, []);

  const fetchLessonsByLevel = async (level) => {
    try {
      const response = await axios.get(`http://192.168.43.33:8080/api/lessons/level/${level}`);
      setLessons(response.data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Imeshindikana kupakia masomo.');
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to Lessondetails screen with selected lesson
  const goToDetails = (lesson) => {
    navigation.navigate('Lessondetails', { lesson });
  };

  const renderImageItem = ({ item }) =>
    item.imageUrl ? (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => goToDetails(item)}>
          <Text style={styles.buttonText}>Tazama Maelezo</Text>
        </TouchableOpacity>
      </View>
    ) : null;

  const renderVideoItem = ({ item }) =>
    item.videoUrl ? (
      <View style={styles.card}>
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <TouchableOpacity style={styles.button} onPress={() => goToDetails(item)}>
          <Text style={styles.buttonText}>Tazama Maelezo</Text>
        </TouchableOpacity>
      </View>
    ) : null;

  if (loading) {
    return <ActivityIndicator size="large" color="#003366" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab('images')}
          style={[styles.tabButton, activeTab === 'images' && styles.activeTab]}
        >
          <Text style={styles.tabText}>Picha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('videos')}
          style={[styles.tabButton, activeTab === 'videos' && styles.activeTab]}
        >
          <Text style={styles.tabText}>Video</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={activeTab === 'images' ? renderImageItem : renderVideoItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
  },
  video: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
  },
  button: {
    backgroundColor: '#003366',
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  tabButton: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#cce6ff',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#003366',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default Lessonscreen;
