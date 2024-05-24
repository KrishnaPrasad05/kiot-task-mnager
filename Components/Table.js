import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
const DisplayPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');
  const [updatedExperience, setUpdatedExperience] = useState('');
  const [updatedMailid, setUpdatedMailid] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.246.5:3001/faculty'); // Replace with your server URL
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenModal = (id) => {
    const selectedItem = data.find(item => item.id === id);
    setSelectedItemId(id);
    setUpdatedName(selectedItem.name);
    setUpdatedDepartment(selectedItem.department);
    setUpdatedExperience(selectedItem.experience);
    setUpdatedMailid(selectedItem.mailid);
    setUpdatedUsername(selectedItem.username);
    setUpdatedPassword(selectedItem.password);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItemId(null);
    setUpdatedName('');
    setUpdatedDepartment('');
    setUpdatedExperience('');
    setUpdatedMailid('');
    setUpdatedUsername('');
    setUpdatedPassword('');
  };

  const handleDeleteConfirmation = (id) => {
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
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.246.5:3001/faculty/${selectedItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedName,
          department: updatedDepartment,
          experience: updatedExperience,
          mailid: updatedMailid,
          username: updatedUsername,
          password: updatedPassword
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Item updated successfully');
        setIsModalVisible(false);
        fetchData();
      } else {
        Alert.alert('Error', 'Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert('Error', 'Failed to update item. Please try again later');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.246.5:3001/faculty/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Item deleted successfully');
        fetchData();
      } else {
        Alert.alert('Error', 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item. Please try again later');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.column1]}>{item.name}</Text>
      <Text style={[styles.cell, styles.column2]}>{item.department}</Text>
      <Text style={[styles.cell, styles.column3]}>{item.experience}</Text>
      <Text style={[styles.cell, styles.column4]}>{item.mailid}</Text>
      <Text style={[styles.cell, styles.column5]}>{item.username}</Text>
      <Text style={[styles.cell, styles.column6]}>{item.password}</Text>
      <TouchableOpacity onPress={() => handleOpenModal(item.id)}>
        <Text style={[styles.updateButton, styles.cell]}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id)}>
        <Text style={[styles.deleteButton, styles.cell]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
        </DataTable.Header>
        </DataTable>
          {/* Table Header */}
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText, styles.column1]}>Name</Text>
            <Text style={[styles.cell, styles.headerText, styles.column2]}>Department</Text>
            <Text style={[styles.cell, styles.headerText, styles.column3]}>Experience</Text>
            <Text style={[styles.cell, styles.headerText, styles.column4]}>Mail ID</Text>
            <Text style={[styles.cell, styles.headerText, styles.column5]}>Username</Text>
            <Text style={[styles.cell, styles.headerText, styles.column6]}>Password</Text>
            <Text style={[styles.cell, styles.headerText]}>Action1</Text>
            <Text style={[styles.cell, styles.headerText]}>Action2</Text>
          </View>

          {/* Table Data */}
          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, styles.column1]}>{item.name}</Text>
              <Text style={[styles.cell, styles.column2]}>{item.department}</Text>
              <Text style={[styles.cell, styles.column3]}>{item.experience}</Text>
              <Text style={[styles.cell, styles.column4]}>{item.mailid}</Text>
              <Text style={[styles.cell, styles.column5]}>{item.username}</Text>
              <Text style={[styles.cell, styles.column6]}>{item.password}</Text>
              <TouchableOpacity onPress={() => handleOpenModal(item.id)}>
                <Text style={[styles.updateButton, styles.cell]}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id)}>
                <Text style={[styles.deleteButton, styles.cell]}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal for Update */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={text => setUpdatedName(text)}
            placeholder="Enter name"
          />
          <TextInput
            style={styles.input}
            value={updatedDepartment}
            onChangeText={text => setUpdatedDepartment(text)}
            placeholder="Enter department"
          />
          <TextInput
            style={styles.input}
            value={updatedExperience}
            onChangeText={text => setUpdatedExperience(text)}
            placeholder="Enter experience"
          />
          <TextInput
            style={styles.input}
            value={updatedMailid}
            onChangeText={text => setUpdatedMailid(text)}
            placeholder="Enter mail ID"
          />
          <TextInput
            style={styles.input}
            value={updatedUsername}
            onChangeText={text => setUpdatedUsername(text)}
            placeholder="Enter user name"
          />
          <TextInput
            style={styles.input}
            value={updatedPassword}
            onChangeText={text => setUpdatedPassword(text)}
            placeholder="Enter password"
          />
          <Button title="Save" onPress={handleUpdate} />
          <Button title="Cancel" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    padding: 5,
  },
  header: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
  },
  updateButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  deleteButton: {
    color: 'red',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  column1: {
    flex: 2,
    textAlign: 'left',
  },
  column2: {
    flex: 2,
    textAlign: 'left',
  },
  column3: {
    flex: 1,
    textAlign: 'center',
  },
  column4: {
    flex: 2,
    textAlign: 'left',
  },
  column5: {
    flex: 2,
    textAlign: 'left',
  },
  column6: {
    flex: 2,
    textAlign: 'left',
  },
});

export default DisplayPage;
