import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcomescreen from './screen/Welcomescreen';
import Loginscreen from './screen/Loginscreen';
import Registerscreen from './screen/Registerscreen';
import Studentdrawer from './screen/Studentdrawer';
import Assessmentscreen from './screen/Assessmentscreen';
import Assessmentdetail from './screen/Assessmentdetail';
import Lessondetails from './screen/Lessondetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={Welcomescreen} />
        <Stack.Screen name="login" component={Loginscreen} />
        <Stack.Screen name="register" component={Registerscreen} />
        <Stack.Screen name="studentdrawer" component={Studentdrawer} />
        <Stack.Screen name="Assessmentscreen" component={Assessmentscreen} />
        <Stack.Screen name="Assessmentdetail" component={Assessmentdetail} />
        <Stack.Screen name="Lessondetails" component={Lessondetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
