import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert 
} from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ImageViewing from 'react-native-image-viewing';

export default function Historyscreen({ route }) {
  const { studentId } = route.params;
  const [results, setResults] = useState([]);
  const [passedLessons, setPassedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsRes, passedRes] = await Promise.all([
          axios.get(`http://192.168.43.33:8080/api/results/student/${studentId}`),
          axios.get(`http://192.168.43.33:8080/api/results/student/${studentId}/passed-lessons`)
        ]);

        setResults(resultsRes.data);

        const mergedPassedLessons = passedRes.data.sort((a, b) => {
          const levels = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3 };
          return (levels[a.lessonLevel] || 0) - (levels[b.lessonLevel] || 0);
        });

        setPassedLessons(mergedPassedLessons);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (results.length === 0 && passedLessons.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No history of results or passed lessons</Text>
      </View>
    );
  }

  const downloadFile = async (url, filename) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'App needs permission to save files to your device');
        return;
      }

      const fileUri = FileSystem.documentDirectory + filename;
      const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
      const { uri } = await downloadResumable.downloadAsync();

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      Alert.alert('Downloaded', 'File saved to gallery');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to download file');
    }
  };

  const renderPassedLesson = ({ item }) => (
    <View style={styles.cardPassed}>
      <Text style={styles.title}>{item.lessonTitle}</Text>
      {item.lessonType === 'video' && (
        <View>
          <Video
            source={{ uri: item.contentUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={false}
            useNativeControls
            style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 10 }}
          />
          <TouchableOpacity 
            style={styles.downloadBtn} 
            onPress={() => downloadFile(item.contentUrl, `${item.lessonTitle}.mp4`)}
          >
            <Text style={styles.downloadText}>Download Video</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.lessonType === 'picture' && (
        <View>
          <TouchableOpacity onPress={() => { 
            setModalImage(item.contentUrl); 
            setModalVisible(true); 
          }}>
            <Image source={{ uri: item.contentUrl }} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.downloadBtn} 
            onPress={() => downloadFile(item.contentUrl, `${item.lessonTitle}.jpg`)}
          >
            <Text style={styles.downloadText}>Download Image</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.detail}>Score: {item.score}</Text>
      <Text style={styles.detail}>Grade: {item.grade}</Text>
      <Text style={styles.passedText}>Passed</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>All Results</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => 'result-' + item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.assessment?.title || 'Assessment Title'}</Text>
            <Text style={styles.detail}>Score: {item.score ?? 'N/A'}</Text>
            <Text style={styles.detail}>
              Date: {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'N/A'}
            </Text>
            <Text style={styles.detail}>Grade: {item.grade ?? 'N/A'}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Passed Lessons</Text>
      <FlatList
        data={passedLessons}
        keyExtractor={(item) => 'passed-' + item.lessonId.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No passed lessons</Text>}
        renderItem={renderPassedLesson}
      />

      {/* Modal ya picha zoom in fully */}
      <ImageViewing
        images={[{ uri: modalImage }]}
        imageIndex={0}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#555' },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2 },
  cardPassed: { backgroundColor: '#d4edda', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold' },
  detail: { fontSize: 14, color: '#666', marginTop: 5 },
  passedText: { marginTop: 5, fontWeight: 'bold', color: '#155724' },
  image: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#333' },
  downloadBtn: { marginTop: 10, backgroundColor: '#007bff', padding: 8, borderRadius: 5, alignItems: 'center' },
  downloadText: { color: '#fff', fontWeight: 'bold' },
});
