import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AssignedTaskHod = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const { variableValue, setVariableValue } = useContext(AppContext);
  useEffect(() => {
    fetchData();;
  }, []);

  const fetchData = async () => {
    try {
      
      const response = await fetch(`https://${variableValue}/tasks?assignTo=${name}`);
      const taskData = await response.json();
  
      // Filter tasks based on faculty's name
  
      setTasks(taskData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  

  const handleItemPress = (item) => {
    navigation.navigate('AssignedTaskDetailsHod', { faculty: item });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderTaskItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
        <View style={styles.itemContent}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.taskName}</Text>
            <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',width:'100%',flexWrap:'wrap'}}>
              <Text style={{color:'grey'}}>Resolve By : {item.date} | {item.time}</Text>
              <Text style={styles.department}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#D0EFCB',
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth:0.5,
    borderColor:'black',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    color:'#024c12'
  },
  department: {
    color: 'grey',
  },
});

export default AssignedTaskHod;
