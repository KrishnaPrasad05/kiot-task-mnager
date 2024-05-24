import React, { useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from './AppContext';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  
  const { variableValue, setVariableValue } = useContext(AppContext);
  useEffect(() => {
    // Fetch profile data from the JSON server
    const fetchProfileData = async () => {
      try {
       
        const response = await fetch(`http://192.168.246.5:3001/faculty`); // Replace with your JSON server URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);


  const [urlData, setUrlData] = useState(null);
  useEffect(() => {
    // Fetch profile data from the JSON server
    const fetchURLData = async () => {
      try {
       
        const response = await fetch(`http://192.168.246.5:3001/faculty`); // Replace with your JSON server URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUrlData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchURLData();
  }, []);

  return (
    <View style={styles.container}>
      {profileData ? (
        <>
          <Text style={styles.label}>Name: {profileData.name}</Text>
          <Text style={styles.label}>Department: {profileData.department}</Text>
          <Text style={styles.label}>Experience: {profileData.experience}</Text>
          <Text style={styles.label}>Email: {profileData.mailid}</Text>
          <Text style={styles.label}>Username: {profileData.username}</Text>
          <Text style={styles.label}>ID: {profileData.id}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
