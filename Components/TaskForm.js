import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
const TaskForm = () => {
    const [taskName, setTaskName] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('medium');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    setDate(selectedDate.toISOString().split('T')[0]);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    hideTimePicker();
    setTime(selectedTime.toLocaleTimeString());
  };

  const handleSave = async () => {
    const taskData = {
      taskName,
      assignTo,
      description,
      date,
      time,
      priority
    };

    if (!taskName || !assignTo || !description || !date || !time || !priority) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
    try {
      const response = await fetch('http://192.168.246.5:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task added successfully');
        // Clear input fields
        setTaskName('');
        setAssignTo('');
        setDescription('');
        setDate('');
        setTime('');
        setPriority('');
      } else {
        Alert.alert('Error', 'Failed to add user');
      }

      // Task saved successfully
      console.log('Task saved successfully');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Name:</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={text => setTaskName(text)}
        placeholder="Enter task name"
      />
      <Text style={styles.label}>Assign To:</Text>
      <TextInput
        style={styles.input}
        value={assignTo}
        onChangeText={text => setAssignTo(text)}
        placeholder="Enter assignee name"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
        placeholder="Enter description"
        multiline={true}
        numberOfLines={4}
      />
     <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        placeholder="Select date"
        onFocus={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.label}>Time:</Text>
      <TextInput
        style={styles.input}
        value={time}
        placeholder="Select time"
        onFocus={showTimePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default TaskForm;
