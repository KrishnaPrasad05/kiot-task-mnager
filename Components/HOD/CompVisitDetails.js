import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import community DateTimePicker
import AppContext from '../AppContext';
import { Picker } from '@react-native-picker/picker';

const CompVisitDetails = ({ route }) => {
  const navigation = useNavigation();
  const { faculty } = route.params;
  const { variableValue } = useContext(AppContext);

  // State variables
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({
    taskName:faculty.taskName,
    taskPurpose: faculty.taskPurpose,
    assignTo: faculty.assignTo,
    note: faculty.note,
    description: faculty.description,
    date: new Date(faculty.date), // Assuming faculty.date is in a parseable date format
    time: parseTimeString(faculty.time), // Call parseTimeString function here
    priority: faculty.priority,
    status: faculty.status,
    createdAt: faculty.createdAt,
  });

  // Function to parse time string into Date object
  function parseTimeString(timeString) {
    const [hours, minutes] = timeString.split(':').map(str => parseInt(str, 10));
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

  const [showDatePicker, setShowDatePicker] = useState(false); // State to manage date picker visibility
  const [showTimePicker, setShowTimePicker] = useState(false); // State to manage time picker visibility

  // Date change handler
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUpdatedValues(prev => ({
        ...prev,
        date: selectedDate,
      }));
    }
  };

  // Time change handler
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setUpdatedValues(prev => ({
        ...prev,
        time: selectedTime,
      }));
    }
  };

  // Update task handler
  const handleUpdate = async () => {
    try {
      const formattedDate = updatedValues.date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      const formattedTime = updatedValues.time.toLocaleTimeString('en-US', { hour12: true }); // Format time to HH:mm:ss

      const response = await fetch(`https://${variableValue}/compVisit/${faculty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedValues,
          date: formattedDate,
          time: formattedTime,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task updated successfully');
        navigation.navigate('ViewCompVisit');
      } else {
        Alert.alert('Error', 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task. Please try again later');
    }
  };

  // Delete task confirmation
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

  // Delete task handler
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://${variableValue}/compVisit/${faculty.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Task deleted successfully');
        navigation.navigate('ViewCompVisit');
      } else {
        Alert.alert('Error', 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task. Please try again later');
    }
  };

  // Function to open Google Sheets links
  const openGoogleSheet = () => {
   /*  const googleSheetRegex = /https?:\/\/docs\.google\.com\/(?:spreadsheets|document)\/d\/\S+/g;
    const description = faculty.description;
    const googleSheetLinks = description.match(googleSheetRegex);

    if (googleSheetLinks) {
      googleSheetLinks.forEach(link => {
        Linking.openURL(link);
      });
    } */
    const description = faculty.description;
    Linking.openURL(description);
  };

  return (
    <ScrollView>

    
    <View style={styles.container}>
      <Text style={styles.label}>Name of the task</Text>
      <Text style={styles.text}>{faculty.taskPurpose}</Text>
      
      <Text style={styles.label}>Type of the task</Text>
      <Text style={styles.text}>{faculty.taskName}</Text>
      
      <Text style={styles.label}>Resolve By</Text>
      <Text style={styles.text}>{updatedValues.date.toDateString()} | {updatedValues.time.toLocaleTimeString()}</Text>
      
      <Text style={styles.label}>Task created time</Text>
      <Text style={styles.text}>{faculty.createdAt}</Text>

      <Text style={styles.label}>Remarks</Text>
      <Text style={styles.text}>{faculty.note}</Text>
      <Text style={styles.label}>Link</Text>
      <Text style={[styles.label, { color: '#024c12', backgroundColor: '#D0EFCB', width: 130, padding: 7, borderRadius: 7 }]} onPress={openGoogleSheet}>Open activity Link</Text>
      
      <Text style={styles.label}>Assigned To</Text>
      <Text style={styles.text}>{faculty.assignTo}</Text>
      
      <Text style={styles.label}>Priority</Text>
      <Text style={styles.text}>{faculty.priority}</Text>
      
      <Text style={styles.label}>Status</Text>
      <Text style={styles.text}>{faculty.status}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDeleteConfirmation}>
          <Text style={[styles.button,{backgroundColor:'maroon'}]}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Text style={styles.button}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for update */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Task Name:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.taskPurpose}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, taskPurpose: text }))}
            placeholder="Enter task name"
          />

         {/*  <Text style={styles.modalText}>Assign to:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.assignTo}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, assignTo: text }))}
            placeholder="Enter name"
          /> */}

          <Text style={styles.modalText}>Remarks:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.note}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, note: text }))}
            placeholder="Enter any note"
          />
          <Text style={styles.modalText}>Link:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.description}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, description: text }))}
            placeholder="Enter description"
          />

          {/* <Text style={styles.modalText}>Priority:</Text>
          <TextInput
            style={styles.input}
            value={updatedValues.priority}
            onChangeText={text => setUpdatedValues(prev => ({ ...prev, priority: text }))}
            placeholder="Enter priority"
          /> */}

<Text style={{color:'white',marginBottom:5}}>Priority:</Text>
        <Picker
          selectedValue={updatedValues.priority}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setUpdatedValues(prev => ({ ...prev, priority: itemValue }))}
        >
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Low" value="low" />
        </Picker>

<View style={{display:'flex',alignContent:'center',justifyContent:'space-between',flexDirection:'row',width:'80%'}}>


<View style={{display:'flex',alignContent:'center',justifyContent:'space-evenly',flexDirection:'column'}}>


          <Text style={styles.modalText}>Select date:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButton}>Click here</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={updatedValues.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          </View>

          <View style={{display:'flex',alignContent:'center',justifyContent:'space-between',flexDirection:'column'}}>

          <Text style={styles.modalText}>Select time:</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateButton}>Click here</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={updatedValues.time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
          </View>

</View>

          <View style={{display:'flex',alignContent:'center',justifyContent:'space-around',flexDirection:'row',width:'80%',marginTop:30}}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#024c12' }]} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
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
  label: {
    color: 'grey',
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
  
  picker: {
    width:'80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#024c12',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems:'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#D0EFCB',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dateButton: {
    backgroundColor:'#D0EFCB',
    padding:10,
    borderRadius:5,
    color: '#024c12',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default CompVisitDetails;
