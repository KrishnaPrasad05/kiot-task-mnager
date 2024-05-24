import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const FacultyDetailsHod = ({ route }) => {
  const navigation = useNavigation();
  const { faculty } = route.params;
  const { variableValue, setVariableValue } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({
    name: faculty.name,
    department: faculty.department,
    role: faculty.role,
    mob: faculty.mob,
    mailid: faculty.mailid,
    username: faculty.username,
    password: faculty.password,
    profImg: faculty.profImg
  });

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://${variableValue}/faculty/${faculty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues), // Send only the updated values
      });

      if (response.ok) {
        Alert.alert('Success', 'Item updated successfully');
        navigation.navigate('HomePageHod');
      } else {
        Alert.alert('Error', 'Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert('Error', 'Failed to update item. Please try again later');
    }
  };

  const handleDeleteConfirmation = () => {
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
          onPress: handleDelete,
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://${variableValue}/faculty/${faculty.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Item deleted successfully');
        navigation.navigate('HomePageHod');
      } else {
        Alert.alert('Error', 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item. Please try again later');
    }
  };

  

  return (
    <ScrollView>

   
    <View style={styles.container}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{ uri: faculty.profImg }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{faculty.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Department</Text>
        <Text style={styles.text}>{faculty.department}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.text}>{faculty.role}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mail Id</Text>
        <Text style={styles.text}>{faculty.mailid}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.text}>{faculty.mob}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.text}>{faculty.username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.text}>{faculty.password}</Text>
      </View>
      <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}> 
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={styles.button1}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteConfirmation}>
        <Text style={styles.button2}>Delete</Text>
      </TouchableOpacity>
      </View>
      
      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        <TextInput
            style={styles.input}
            value={updatedValues.profImg}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, profImg: text }))}
            placeholder="Enter URL"
          />
          <TextInput
            style={styles.input}
            value={updatedValues.name}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, name: text }))}
            placeholder="Enter name"
          />
         
          <TextInput
            style={styles.input}
            value={updatedValues.department}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, department: text }))}
            placeholder="Enter department"
          />
          <TextInput
            style={styles.input}
            value={updatedValues.role}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, role: text }))}
            placeholder="Enter role"
          />
          <TextInput
            style={styles.input}
            value={updatedValues.mob}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, mob: text }))}
            placeholder="Enter mobile number"
          />
          <TextInput
            style={styles.input}
            value={updatedValues.mailid}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, mailid: text }))}
            placeholder="Enter mail ID"
          />
          <TextInput
            style={styles.input}
            value={updatedValues.username}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, username: text }))}
            placeholder="Enter user name"
          />
          <TextInput
            style={styles.input}
            value={updatedValues.password}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, password: text }))}
            placeholder="Enter password"
          />
          <View style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
          <TouchableOpacity style={{backgroundColor:'#0072f9',padding:10,width:100,borderRadius:10,marginRight:50}} onPress={handleUpdate}>
        <Text style={{color:'white',textAlign:'center'}}>Save</Text>
      </TouchableOpacity> 
          <TouchableOpacity style={{backgroundColor:'grey',padding:10,width:100,borderRadius:10}} onPress={() => setIsModalVisible(false)}>
        <Text style={{color:'white',textAlign:'center'}}>Cancel</Text>
      </TouchableOpacity> 
          
          </View>
          
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#D0EFCB',
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  label: {
    color: 'grey',
  },
  text: {
    marginBottom: 5,
  },
  button1: {
    backgroundColor: '#024c12',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:120,
  },button2: {
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:120,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#D0EFCB',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default FacultyDetailsHod;
