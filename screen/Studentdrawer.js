import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Studentdashboard from './Studentdashboard';
import Lessonscreen from './Lessonscreen';
import Assessmentscreen from './Assessmentscreen';
import Resultscreen from './Resultscreen';
import Profilescreen from './Profilescreen';
import Homescreen from './Homescreen';

const Drawer = createDrawerNavigator();

const Studentdrawer = ({ route }) => {
  const user = route.params?.user;

  return (
    <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Dashboard">
        {() => <Studentdashboard user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="Lessons">
        {() => <Lessonscreen user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="Assessments">
        {() => <Assessmentscreen user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="Results">
        {() => <Resultscreen user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {() => <Profilescreen user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="Home">
        {() => <Homescreen user={user} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default Studentdrawer;
