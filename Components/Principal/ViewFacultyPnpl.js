import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const ViewFacultyPnpl= () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const navigation = useNavigation();
  const { variableValue, setVariableValue } = useContext(AppContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://${variableValue}/faculty`); // Replace with your server URL
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('FacultyDetailsPnpl', { faculty: item });
  };

  const onRefresh = async () => {
    console.log("Refreshing data...");
    setRefreshing(true); // Set refreshing state to true
    try {
      const response = await fetch(`https://${variableValue}/faculty`); // Fetch data
      const jsonData = await response.json();
      setData(jsonData); // Update data state
      console.log("Data refreshed!");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false); // Set refreshing state to false after fetching data
    }
  };


  
  const handleProfile = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('ProfilePnpl'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleHome = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('HomePagePnpl'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleAdd = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('AddFacultyPnpl'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleView = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('ViewFacultyPnpl'); // Replace 'OtherPage' with the name of the target screen
  };

  const renderFacultyItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
        <View style={styles.itemContent}>
          <Image
            source={{ uri: item.profImg }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.department}>{item.department}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderFacultyItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={ // Add refresh control
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

<View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fafafa',width:"100%",padding:10,marginTop:50}}>

<TouchableOpacity onPress={handleHome}>
  <View >
    
  <Image source={require('../../assets/Images/home.png')} style={{width:25,height:25}} />
 
  </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleAdd}>
  <View >
  <Image source={require('../../assets/Images/add-friend.png')} style={{width:25,height:25}} />
  
  </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleView}>
  <View style={{backgroundColor:'#D0EFCB',padding:10,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',width:60,height:60}}>
  <Image source={require('../../assets/Images/list.png')} style={{width:25,height:25}} />
  <Text>View</Text>
  </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleProfile}>
  <View >
  <Image source={require('../../assets/Images/user (2).png')} style={{width:25,height:25}} />
  </View>
  </TouchableOpacity>
</View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 0,
  },
  itemContainer: {
    backgroundColor: '#D0EFCB',
    padding: 7,
    borderRadius: 10,
    margin: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
});

export default ViewFacultyPnpl;
