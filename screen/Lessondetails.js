import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const Lessondetails = ({ route }) => {
  const { lesson } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>

      {/* Video ikiwa ipo */}
      {lesson.videoUrl ? (
        <Video
          source={{ uri: lesson.videoUrl }}
          useNativeControls
          resizeMode="contain"
          shouldPlay={false}
          style={styles.video}
        />
      ) : (
        // Ikiwa video haipo, angalia kama kuna picha
        lesson.imageUrl && (
          <Image source={{ uri: lesson.imageUrl }} style={styles.image} />
        )
      )}

      <Text style={styles.description}>{lesson.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  video: { width: '100%', height: 200, backgroundColor: '#000', marginBottom: 10 },
  image: { width: '100%', height: 200, marginBottom: 10 },
  description: { fontSize: 16 },
});

export default Lessondetails;
