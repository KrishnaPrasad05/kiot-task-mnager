import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const AssignTaskPnpl = () => {
  const navigation = useNavigation();
  const [taskName, setTaskName] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize with current date
  const [time, setTime] = useState(new Date()); // Initialize with current time
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('Pending');
  const { variableValue, setVariableValue } = useContext(AppContext);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    fetch(`https://${variableValue}/faculty`)
      .then(response => response.json())
      .then(data => setFacultyList(data))
      .catch(error => console.error('Error fetching faculty:', error));
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    hideDatePicker();
    setDate(currentDate);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    hideTimePicker();
    setTime(currentTime);
  };

  const handleSave = async () => {
    // Check if any field is empty
    if (!taskName || !selectedOption || !description || !date || !time || !priority) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const createdAt = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const taskData = {
      taskName,
      assignTo: selectedOption.name,
      description,
      date: date.toISOString().split('T')[0], // Ensure date is a Date object
      time: time.toLocaleTimeString(), // Ensure time is a Date object
      priority,
      createdAt,
      status
    };

    try {
      const response = await fetch(`https://${variableValue}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task added successfully');
        // Clear input fields and reset form state
        setTaskName('');
        setSelectedOption(null); // Reset assignTo state
        setDescription('');
        setDate(new Date()); // Reset date state to current date
        setTime(new Date()); // Reset time state to current time
        setPriority('medium');
        setStatus('Pending'); // Reset status state
      } else {
        Alert.alert('Error', 'Failed to add task');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  const handleReset = () => {
    // Reset all form fields
    setTaskName('');
    setSelectedOption(null);
    setDescription('');
    setDate(new Date());
    setTime(new Date());
    setPriority('');
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Task Name:</Text>
        <TextInput
          style={styles.input}
          value={taskName}
          onChangeText={text => setTaskName(text)}
          placeholder="Enter task name"
        />

        <Text style={styles.label}>Assign To:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.input}>{selectedOption ? selectedOption.name : 'Select assignee'}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Select Assignee:</Text>
              <ScrollView>
                {facultyList.map(faculty => (
                  <TouchableOpacity
                    key={faculty.id}
                    onPress={() => {
                      setSelectedOption(faculty);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{faculty.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={4}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                style={styles.input}
                value={date.toISOString().split('T')[0]}
                placeholder="Select date"
                editable={false}
              />
            </TouchableOpacity>
            {isDatePickerVisible && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.label}>Time:</Text>
            <TouchableOpacity onPress={showTimePicker}>
              <TextInput
                style={styles.input}
                value={time.toLocaleTimeString()}
                placeholder="Select time"
                editable={false}
              />
            </TouchableOpacity>
            {isTimePickerVisible && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>

        <Text style={styles.label}>Priority:</Text>
        <Picker
          selectedValue={priority}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
        >
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Low" value="low" />
        </Picker>

        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
          <TouchableOpacity >
            <Text style={styles.button2} onPress={handleReset}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.button1}>Assign</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity onPress={handleHome}>
            <Image source={require('../../assets/Images/home.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAdd}>
            <Image source={require('../../assets/Images/add-friend.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleView}>
            <View style={styles.menuItem}>
              <Image source={require('../../assets/Images/list.png')} style={styles.menuIcon} />
              <Text>View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfile}>
            <Image source={require('../../assets/Images/user (2).png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
    height: 120,
    textAlignVertical: 'top',
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%',
    width: '80%',
  },
  optionText: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  menuItem: {
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#ADD8E6',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    width: 200,
    borderRadius: 30,
  },
  button2: {
    backgroundColor: '#ADD8E6',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    width: 200,
    borderRadius: 30,
    marginRight: 20,
  },
});

export default AssignTaskPnpl;
