import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppContext from '../AppContext';

const TaskDetailsPnpl = ({ route }) => {
  const navigation = useNavigation();
  const { faculty } = route.params;
  const { variableValue } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({
    taskName: faculty.taskName,
    assignTo: faculty.assignTo,
    description: faculty.description,
    date: faculty.date,
    time: faculty.time,
    priority: faculty.priority,
    status: faculty.status,
    createdAt: faculty.createdAt,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setUpdatedValues(prev => ({ ...prev, date: formattedDate }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString();
      setUpdatedValues(prev => ({ ...prev, time: formattedTime }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://${variableValue}/tasks/${faculty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task updated successfully');
        navigation.navigate('HomePageHod');
      } else {
        Alert.alert('Error', 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task. Please try again later');
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
      const response = await fetch(`https://${variableValue}/tasks/${faculty.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Task deleted successfully');
        navigation.navigate('HomePageHod');
      } else {
        Alert.alert('Error', 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task. Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'grey' }}>Name of the task</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.taskName}</Text>
      <Text style={{ color: 'grey' }}>Resolve By</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.date} | {faculty.time}</Text>
      <Text style={{ color: 'grey' }}>Task created time</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.createdAt}</Text>
      <Text style={{ color: 'grey' }}>Assigned To</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.assignTo}</Text>
      <Text style={{ color: 'grey' }}>Task description</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.description}</Text>
      <Text style={{ color: 'grey' }}>Priority</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.priority}</Text>
      <Text style={{ color: 'grey' }}>Status</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.status}</Text>

      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>

        <TouchableOpacity onPress={handleDeleteConfirmation}>
          <Text style={styles.button2}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Text style={styles.button1}>Update</Text>
        </TouchableOpacity>

      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={{ color: 'white' }}>Task Name:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.taskName}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, taskName: text }))}
            placeholder="Enter task name"
          />
          <Text style={{ color: 'white' }}>Assign to:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.assignTo}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, assignTo: text }))}
            placeholder="Enter name"
          />
          <Text style={{ color: 'white' }}>Description:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.description}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, description: text }))}
            placeholder="Enter department"
          />
          <Text style={{ color: 'white' }}>Priority:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.priority}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, priority: text }))}
            placeholder="Enter user name"
          />
          <Text style={{ color: 'white' }}>Select date:</Text>
          {/* Date Picker */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: 'black', backgroundColor: '#D0EFCB', padding: 10, width: 315, borderRadius: 5 }}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(updatedValues.date)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={{ color: 'white' }}>Select time:</Text>
          {/* Time Picker */}
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={{ color: 'black', backgroundColor: '#D0EFCB', padding: 10, width: 315, borderRadius: 5 }}>Select Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date(updatedValues.time)}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>

            <TouchableOpacity style={{ backgroundColor: 'rgba(2,76,18,1)', padding: 10, width: 100, borderRadius: 10, marginRight: 50 }} onPress={handleUpdate}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'grey', padding: 10, width: 100, borderRadius: 10 }} onPress={() => setIsModalVisible(false)}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button1: {
    backgroundColor: '#024c12',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 120,
  },
  button2: {
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 120,
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

export default TaskDetailsPnpl;
