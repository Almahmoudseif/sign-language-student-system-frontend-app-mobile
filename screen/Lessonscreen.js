import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';

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

  // Tooltips state
  const [showTabTooltip, setShowTabTooltip] = useState(false);
  const [showDetailTooltip, setShowDetailTooltip] = useState(false);

  useEffect(() => {
    if (!studentId || !level) {
      setError('Student ID or level not found.');
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      try {
        const res = await axios.get(`http://192.168.43.33:8080/api/lessons/student/${studentId}`);
        setLessons(res.data);
        setError('');
        setShowTabTooltip(true); // show tooltip after lessons load
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError('Failed to load lessons.');
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
      <Tooltip
        isVisible={showDetailTooltip}
        content={<Text>Tap "View Details" to see lesson information</Text>}
        placement="top"
        onClose={() => setShowDetailTooltip(false)}
      >
        <View style={styles.card}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={() => { goToDetails(item); setShowDetailTooltip(true); }}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </Tooltip>
    );

  const renderVideoItem = ({ item }) =>
    item.videoUrl && (
      <Tooltip
        isVisible={showDetailTooltip}
        content={<Text>Tap "View Details" to see lesson information</Text>}
        placement="top"
        onClose={() => setShowDetailTooltip(false)}
      >
        <View style={styles.card}>
          <Video
            source={{ uri: item.videoUrl }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
          <TouchableOpacity style={styles.button} onPress={() => { goToDetails(item); setShowDetailTooltip(true); }}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </Tooltip>
    );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#003366" />
        <Text>Loading lessons...</Text>
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
        <Text>No lessons found for this level.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Your lessons for level: {level}</Text>

      <Tooltip
        isVisible={showTabTooltip}
        content={<Text>Select Images or Videos to view your lessons in different formats</Text>}
        placement="bottom"
        onClose={() => setShowTabTooltip(false)}
      >
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('images')}
            style={[styles.tabButton, activeTab === 'images' && styles.activeTab]}
          >
            <Text style={styles.tabText}>Images</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('videos')}
            style={[styles.tabButton, activeTab === 'videos' && styles.activeTab]}
          >
            <Text style={styles.tabText}>Videos</Text>
          </TouchableOpacity>
        </View>
      </Tooltip>

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
