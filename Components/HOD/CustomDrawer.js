// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Drawer Items */}

      <Text>Hi</Text>
      <TouchableOpacity 
        style={[styles.drawerItem, props.state.index === 0 && styles.activeDrawerItem]}
        onPress={() => props.navigation.navigate('ViewTasksHod')}
      >
        <Ionicons name="list" size={24} color="#000" />
        <Text style={[styles.drawerItemText, props.state.index === 0 && styles.activeDrawerItemText]}>View Tasks Hod</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.drawerItem, props.state.index === 1 && styles.activeDrawerItem]}
        onPress={() => props.navigation.navigate('AddFacultyHod')}
      >
        <Ionicons name="person-add" size={24} color="#000" />
        <Text style={[styles.drawerItemText, props.state.index === 1 && styles.activeDrawerItemText]}>Add Faculty Hod</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000', // Default text color
  },
  activeDrawerItem: {
    backgroundColor: '#e0e0e0', // Active drawer item background color
  },
  activeDrawerItemText: {
    color: 'red', // Change the text color of the active drawer item here
  },
});

export default CustomDrawerContent;
