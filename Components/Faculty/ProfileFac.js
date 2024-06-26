import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext';

const ProfileFac = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false); // State to force component re-render
  const { variableValue, setVariableValue } = useContext(AppContext);
  useEffect(() => {
    fetchData();
  }, [name]); // Fetch data when username changes

  const fetchData = async () => {
    try {
      const response = await fetch(`https://${variableValue}/faculty?name=${name}`); // Replace with your server URL
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('FacultyDetailsHod', { faculty: item });
  };

  const refreshData = async () => {
    setRefreshing(true); // Set refreshing state to true
    await fetchData(); // Fetch data
    setRefreshing(false); // Set refreshing state to false after fetching data
  };

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('name');
      if (storedUsername !== null) {
        setName(storedUsername);
        console.log('Username retrieved:', storedUsername);
      } else {
        console.log('No username stored.');
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleReload = () => {
    // Toggle the forceUpdate state to force component re-render
    setForceUpdate((prev) => !prev);
    refreshData();
  };

  const handleLogout = () => {
navigation.navigate('CommonLand')
  }
  const handleAbout = () => {
navigation.navigate('About')
  }
  const renderFacultyItem = ({ item }) => {
    return (
  <View style={{padding:10}}>       
   <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{ uri: item.profImg }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Department</Text>
        <Text style={styles.text}>{item.department}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.text}>{item.role}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mobile number</Text>
        <Text style={styles.text}>{item.mob}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mail Id</Text>
        <Text style={styles.text}>{item.mailid}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.text}>{item.username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.text}>{item.password}</Text>
      </View>
      <View style={{display:'flex',justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
      <TouchableOpacity style={{backgroundColor:'grey',padding:10,width:100,borderRadius:10,margin:10}} onPress={handleLogout}>
        <Text style={{color:'white',textAlign:'center'}}>Logout</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={{backgroundColor:'#024C12',padding:10,width:100,borderRadius:10,margin:10}} onPress={handleAbout}>
        <Text style={{color:'white',textAlign:'center'}}>About Us</Text>
      </TouchableOpacity> 
      </View> 
      </View>

    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderFacultyItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}
      />
     {/*  <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
        <Text style={styles.reloadButtonText}>Reload</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 0,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom:10
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
  },
  department: {
    color: 'grey',
  },
  infoContainer: {
    backgroundColor: '#D0EFCB',
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: '#024C12',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  label:{
    color:'grey',
  }
});

export default ProfileFac;
