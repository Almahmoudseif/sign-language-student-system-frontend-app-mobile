import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Studentdashboard from './Studentdashboard';
import Lessonscreen from './Lessonscreen';
import Assessmentscreen from './Assessmentscreen'; // ya zamani
import Assessmentlistscreen from './Assessmentlistscreen'; // mpya uliyoomba
import Resultscreen from './Resultscreen';
import Profilescreen from './Profilescreen';
import Homescreen from './Homescreen';

const Drawer = createDrawerNavigator();

const Studentdrawer = ({ route }) => {
  const user = route.params?.user;

  return (
    <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Dashboard" component={Studentdashboard} initialParams={{ user }} />
      <Drawer.Screen name="Lessons" component={Lessonscreen} initialParams={{ user }} />
      <Drawer.Screen name="Assessments" component={Assessmentscreen} initialParams={{ user }} />
      <Drawer.Screen name="Assessment List" component={Assessmentlistscreen} initialParams={{ user }} />
      <Drawer.Screen name="Results" component={Resultscreen} initialParams={{ user }} />
      <Drawer.Screen name="Profile" component={Profilescreen} initialParams={{ user }} />
      <Drawer.Screen name="Home" component={Homescreen} initialParams={{ user }} />
    </Drawer.Navigator>
  );
};

export default Studentdrawer;
