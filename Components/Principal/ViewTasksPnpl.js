import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const ViewTasksPnpl = ({ route }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { variableValue } = useContext(AppContext);
  
  useEffect(() => {
    fetchData();
  }, []);

  const { point } = route.params;

  const fetchData = async () => {
    try {
      const response = await fetch(`https://${variableValue}/tasks`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProfile = () => {
    navigation.navigate('ProfilePnpl');
  };
  const handleHome = () => {
    navigation.navigate('HomePagePnpl');
  };
  const handleAdd = () => {
    navigation.navigate('AddFacultyPnpl');
  };
  const handleView = () => {
    navigation.navigate('ViewFacultyPnpl');
  };

  const handleItemPress = (item) => {
    navigation.navigate('TaskDetailsPnpl', { faculty: item });
  };

  const onRefresh = async () => {
    console.log("Refreshing data...");
    setRefreshing(true);
    try {
      const response = await fetch(`https://${variableValue}/tasks`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log("Data refreshed!");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredData = data.filter(item => item.status === `${point}`).sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA - dateTimeB;
  });

  const handleDeleteConfirmation = (item) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDelete(item),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (item) => {
    try {
      const response = await fetch(`https://${variableValue}/tasks/${item.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onRefresh();
      } else {
        Alert.alert('Error', 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task. Please try again later');
    }
  };

  const renderFacultyItem = ({ item }) => {
    console.log('Rendering item:', item);
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)} onLongPress={() => handleDeleteConfirmation(item)}>
        <View style={styles.itemContent}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.taskName} </Text>
            <Text style={{ fontSize: 15 }}>{item.assignTo}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.resolveBy}>Resolve By : {item.date} | {item.time}</Text>
              <Text style={styles.priority}>⏳{item.priority}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Task Status : {point}</Text>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderFacultyItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleHome}>
          <View>
            <Image source={require('../../assets/Images/home.png')} style={styles.footerImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd}>
          <View>
            <Image source={require('../../assets/Images/add-friend.png')} style={styles.footerImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleView}>
          <View style={styles.footerButton}>
            <Image source={require('../../assets/Images/list.png')} style={styles.footerImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfile}>
          <View>
            <Image source={require('../../assets/Images/user (2).png')} style={styles.footerImage} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#024c12',
    padding: 5,
    margin: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#D0EFCB',
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    color: '#024c12',
  },
  itemDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  resolveBy: {
    marginRight: 10,
    color: 'grey',
  },
  priority: {
    color: 'maroon',
  },
  footer: {
    backgroundColor: '#fafafa',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#fff',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  footerImage: {
    width: 25,
    height: 25,
  },
});

export default ViewTasksPnpl;
