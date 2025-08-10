import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';

const Lessonscreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params || {};
  const studentId = user?.id;
  const level = user?.level;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('images');

  useEffect(() => {
    if (!studentId || !level) {
      setError('Student ID au level haijapatikana.');
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      try {
        const res = await axios.get(`http://192.168.43.33:8080/api/lessons/student/${studentId}`);
        setLessons(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError('Imeshindikana kupakia masomo.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [studentId]);

  const goToDetails = (lesson) => {
    navigation.navigate('Lessondetails', { lesson });
  };

  const renderImageItem = ({ item }) =>
    item.imageUrl && (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => goToDetails(item)}>
          <Text style={styles.buttonText}>Tazama Maelezo</Text>
        </TouchableOpacity>
      </View>
    );

  const renderVideoItem = ({ item }) =>
    item.videoUrl && (
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
    );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#003366" />
        <Text>Inapakia somo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (lessons.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Hakuna masomo kwa daraja hili.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Masomo yako ya daraja: {level}</Text>

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
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: '#2e7d32', textAlign: 'center' },
  tabs: { flexDirection: 'row', backgroundColor: '#eee' },
  tabButton: { padding: 12, flex: 1, alignItems: 'center' },
  activeTab: { backgroundColor: '#cce6ff' },
  tabText: { fontWeight: 'bold', color: '#003366' },
  list: { padding: 10 },
  card: { marginBottom: 20, backgroundColor: '#f9f9f9', borderRadius: 12, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 220 },
  video: { width: '100%', height: 220, backgroundColor: '#000' },
  button: { backgroundColor: '#003366', padding: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});

export default Lessonscreen;
