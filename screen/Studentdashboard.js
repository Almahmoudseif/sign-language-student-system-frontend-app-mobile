import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useRoute, useNavigation } from '@react-navigation/native';

const Studentdashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = route.params?.user;

  // Tooltip states
  const [showTooltip1, setShowTooltip1] = useState(true); // for name
  const [showTooltip2, setShowTooltip2] = useState(false); // for registration number
  const [showTooltip3, setShowTooltip3] = useState(false); // for button

  const handleNext = (current) => {
    if (current === 1) {
      setShowTooltip1(false);
      setShowTooltip2(true);
    } else if (current === 2) {
      setShowTooltip2(false);
      setShowTooltip3(true);
    } else if (current === 3) {
      setShowTooltip3(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Dashboard</Text>

      {user ? (
        <>
          <Tooltip
            isVisible={showTooltip1}
            content={<Text>This is your student name</Text>}
            placement="bottom"
            onClose={() => handleNext(1)}
          >
            <Text style={styles.info}>Name: {user.fullName}</Text>
          </Tooltip>

          <Tooltip
            isVisible={showTooltip2}
            content={<Text>Here you can see your registration number</Text>}
            placement="bottom"
            onClose={() => handleNext(2)}
          >
            <Text style={styles.info}>Registration Number: {user.registrationNumber}</Text>
          </Tooltip>

          <Text style={styles.info}>Email: {user.email}</Text>

          <Tooltip
            isVisible={showTooltip3}
            content={<Text>Click here to view the lessons you have taken</Text>}
            placement="top"
            onClose={() => handleNext(3)}
          >
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Historyscreen', { studentId: user.id })}
            >
              <Text style={styles.buttonText}>Taken Lessons</Text>
            </TouchableOpacity>
          </Tooltip>
        </>
      ) : (
        <Text style={styles.info}>Student information is not available</Text>
      )}
    </View>
  );
};

export default Studentdashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  info: {
    fontSize: 18,
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
