// MyDrawer.js
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import ViewTasksHod from './ViewTasks'; // Assume you have these components
import AddFacultyHod from './AddFacultyHod'; // Assume you have these components
import HomePageHod from './HomePage';
import AssignTaskHod from './AssignTaskHod';
import ViewFacultyHod from './ViewFacultyHOD';
import ProfileHod from './ProfileHod';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from '../Navigation';
import FacultyDetailsHod from './FacultyDetailsHod';
import TaskDetailsHod from './TaskDetailsHod';
import AssignedTask from '../Faculty/AssignedTask';
import AssignedTaskDetails from '../Faculty/AssignedTaskDetails';
import LoginHod from './LoginHod';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="LoginHod" headerMode="none">
       <Stack.Screen name="LoginHod" component={LoginHod} />
       <Stack.Screen name="HomePageHod" component={HomePageHod} />
 
  <Stack.Screen name="ViewFacultyHod" component={ViewFacultyHod} />
  <Stack.Screen name="FacultyDetailsHod" component={FacultyDetailsHod} />
  <Stack.Screen name="AddFacultyHod" component={AddFacultyHod} />
  <Stack.Screen name="AssignTaskHod" component={AssignTaskHod} />
 <Stack.Screen name="ViewTasksHod" component={ViewTasksHod} options={{ headerShown: false }} />
  <Stack.Screen name="TaskDetailsHod" component={TaskDetailsHod} />
  <Stack.Screen name="ProfileHod" component={ProfileHod} />
  <Stack.Screen name="AssignedTask" component={AssignedTask} />
  <Stack.Screen name="AssignedTaskDetails" component={AssignedTaskDetails} />
      </Stack.Navigator>
    );
  };

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
         <Drawer.Screen name="Main" component={StackNavigator} />
      <Drawer.Screen 
        name="Home Page"
        component={HomePageHod}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Assign Task"
        component={AssignTaskHod}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Track Task"
        component={ViewTasksHod}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Add Faculties"
        component={AddFacultyHod}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="View Faculties"
        component={ViewFacultyHod}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Profile"
        component={ProfileHod}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
