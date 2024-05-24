import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importing community DateTimePicker
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const AssignCCR = () => {
  const navigation = useNavigation();
  const { variableValue, setVariableValue } = useContext(AppContext);
  const [taskName, setTaskName] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('Pending');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to manage date picker visibility
  const [showTimePicker, setShowTimePicker] = useState(false); // State to manage time picker visibility

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleSaveAssignTo = async () => {
    try {
      const requests = selectedOptions.map(async option => {
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
          assignTo: option.name,
          description,
          date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
          time: time.toLocaleTimeString(), // Format time to HH:mm:ss
          priority,
          createdAt,
          status
        };

        // Constructing the endpoint URL based on the selected task name
        let endpoint = '';
        switch (taskName) {
          case 'CCR':
            endpoint = `http://${variableValue}/ccr`;
            break;
          case 'Company Visits':
            endpoint = `http://${variableValue}/compVist`; // Adjust endpoint as per your requirement
            break;
          case 'On-Campus Drive':
            endpoint = `http://${variableValue}/onCamp`; // Adjust endpoint as per your requirement
            break;
          case 'Off-Campus Drive':
            endpoint = `http://${variableValue}/offCamp`; // Adjust endpoint as per your requirement
            break;
          case 'Pooled Drive':
            endpoint = `http://${variableValue}/pooled`; // Adjust endpoint as per your requirement
            break;
          // Add cases for other task names as needed
          default:
            break;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          console.log(`Task added successfully for ${option.name}`);
          return true;
        } else {
          console.error(`Failed to add task for ${option.name}`);
          return false;
        }
      });

      const results = await Promise.all(requests);

      if (results.every(result => result === true)) {
        // All tasks added successfully
        Alert.alert('Success', 'All tasks added successfully');
        setModalVisible(false);
        setTaskName('');
        setAssignTo('');
        setDescription('');
        setDate(new Date());
        setTime(new Date());
        setPriority('medium');
      } else {
        // Some tasks failed to add
        Alert.alert('Error', 'Some tasks failed to add. Please try again.');
      }
    } catch (error) {
      console.error('Error saving tasks:', error);
      Alert.alert('Error', 'Failed to add tasks. Please try again.');
    }
  };

  const handleReset = () => {
    // Reset all form fields
    setTaskName('');
    setAssignTo('');
    setDescription('');
    setDate(new Date());
    setTime(new Date());
    setPriority('medium');
  };

  const handleProfile = () => {
    navigation.navigate('ProfileHod');
  };

  const handleHome = () => {
    navigation.navigate('HomePageHod');
  };

  const handleAdd = () => {
    navigation.navigate('AddFacultyHod');
  };

  const handleView = () => {
    navigation.navigate('ViewFacultyHod');
  };

  useEffect(() => {
    fetch(`http://${variableValue}/faculty`)
      .then(response => response.json())
      .then(data => setFacultyList(data))
      .catch(error => console.error('Error fetching faculty:', error));
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Task Name:</Text>
        <Picker
          selectedValue={taskName}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setTaskName(itemValue)}
        >
          <Picker.Item label="Select below options" value="" />
          <Picker.Item label="CCR" value="CCR" />
          <Picker.Item label="Company Visits" value="Company Visits" />
          <Picker.Item label="On-Campus Drive" value="On-Campus Drive" />
          <Picker.Item label="Off-Campus Drive" value="Off-Campus Drive" />
          <Picker.Item label="Pooled Drive" value="Pooled Drive" />
        </Picker>

        <Text style={styles.label}>Assign To:</Text>
        <TextInput
          style={styles.input}
          value={assignTo}
          placeholder="Enter assignee name"
          editable={false} // To make TextInput read-only
        />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.button1}>Select Assignee</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Select Assignee:</Text>
              {facultyList.map(faculty => (
                <TouchableOpacity
                  key={faculty.id}
                  onPress={() =>
                    setSelectedOptions(prevOptions =>
                      prevOptions.some(option => option.id === faculty.id)
                        ? prevOptions.filter(option => option.id !== faculty.id)
                        : [...prevOptions, faculty]
                    )
                  }
                >
                  <Text >
                    {selectedOptions.some(option => option.id === faculty.id) ? '☑' : '☐'}{' '}
                    {faculty.name}
                  </Text>
                </TouchableOpacity>
              ))}

              <Button title="Save" onPress={() => {
                setAssignTo(selectedOptions.map(option => option.name).join(', '));
                setModalVisible(false);
              }} />
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

        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <View>
            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.dateTimeInput}
                value={date.toISOString().split('T')[0]}
                placeholder="Select date"
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="datePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View>
            <Text style={styles.label}>Time:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={styles.dateTimeInput}
                value={time.toLocaleTimeString()}
                placeholder="Select time"
                editable={false}
              />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
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
          <TouchableOpacity onPress={handleSaveAssignTo}>
            <Text style={styles.button1}>Assign</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomMenu}>
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
    marginVertical: 7,
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    height: 120, // Set height according to your preference
    textAlignVertical: 'top', // Align text at the top
    marginBottom: 10,
  },
  picker: {
    height: 30,
    borderWidth: 1,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateTimeInput: {
    height: 40,
    borderWidth: 1,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 170,
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
    backgroundColor: 'lightgrey',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 120,
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
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    width: "100%",
    padding: 20,
    marginTop: 50,
  },
  menuItem: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
});

export default AssignCCR;
