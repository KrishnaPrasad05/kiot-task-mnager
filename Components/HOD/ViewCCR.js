import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const ViewCCR = ({ route }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const navigation = useNavigation();
  const { variableValue, setVariableValue } = useContext(AppContext);
  useEffect(() => {
    fetchData();
  }, []);

  const { point } = route.params;

  const fetchData = async () => {
    try {
      const response = await fetch(`https://${variableValue}/ccr`); // Replace with your server URL
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProfile = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('ProfileHod'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleHome = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('HomePageHod'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleAdd = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('AddFacultyHod'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleView = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('ViewFacultyHod'); // Replace 'OtherPage' with the name of the target screen
  };

  const handleItemPress = (item) => {
    navigation.navigate('CCRDetails', { faculty: item });
  };

  const onRefresh = async () => {
    console.log("Refreshing data...");
    setRefreshing(true); // Set refreshing state to true
    try {
      const response = await fetch(`https://${variableValue}/ccr`); // Fetch data
      const jsonData = await response.json();
      setData(jsonData); // Update data state
      console.log("Data refreshed!");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false); // Set refreshing state to false after fetching data
    }
  };

  const filteredData = data.filter(item => item.status === `${point}`).sort((a, b) => {
    // Assuming date and time are stored in 'date' and 'time' properties respectively
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA - dateTimeB;
  });

  const renderFacultyItem = ({ item }) => {
    console.log('Rendering item:', item); // Log the item object
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
        <View style={styles.itemContent}>
          
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.taskName}</Text>
            <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',width:'100%'}}>
            <Text style={{marginRight:10,color:'grey'}}>Resolve By : {item.date} | {item.time}</Text>
            <Text style={styles.department}>⏳{item.status}</Text>
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
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
  <View style={{backgroundColor:'transparent',padding:10,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',width:60,height:60}}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    
  },
  itemContainer: {
    backgroundColor: '#D0EFCB',
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    borderWidth:.5,
    borderColor:'black'
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
    fontSize: 20,
    color:'#024c12'
  },
  department: {
    color: 'maroon',
    
  },
});

export default ViewCCR;
