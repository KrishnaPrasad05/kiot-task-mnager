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
  SafeAreaView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox'; // Correct import
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const AssignCCR1 = () => {
  const navigation = useNavigation();
  const { variableValue, setVariableValue } = useContext(AppContext);
  const [taskPurpose,setTaskPurpose]= useState('');
  const [note,setNote]= useState('');
  const [taskName, setTaskName] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('Pending');
  const [modalVisible, setModalVisible] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    fetch(`https://${variableValue}/faculty`)
      .then(response => response.json())
      .then(data => setFacultyList(data))
      .catch(error => console.error('Error fetching faculty:', error));
  }, [variableValue]);

 

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
          taskPurpose,
          assignTo: option.name,
          note,
          description,
          date: date.toISOString().split('T')[0],
          time: time.toLocaleTimeString(),
          priority,
          createdAt,
          status
        };

        let endpoint = '';
        switch (taskName) {
          case 'CCR':
            endpoint = `https://${variableValue}/ccr`;
            break;
          case 'Company Visits':
            endpoint = `https://${variableValue}/compVist`;
            break;
          case 'On-Campus Drive':
            endpoint = `https://${variableValue}/onCamp`;
            break;
          case 'Off-Campus Drive':
            endpoint = `https://${variableValue}/offCamp`;
            break;
          case 'Pooled Drive':
            endpoint = `https://${variableValue}/pooled`;
            break;
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
      if(!taskName|| !taskPurpose|| !assignTo|| !note|| !description|| !date|| !time|| !priority|| !status){
        Alert.alert('Error', 'Fill the missing fields');
      }
      else{

      
      if (results.every(result => result === true)) {
        Alert.alert('Success', 'All tasks added successfully');
        setModalVisible(false);
        setTaskName('');
        setTaskPurpose('');
        setAssignTo('');
        setNote('');
        setDescription('');
        setDate(new Date());
        setTime(new Date());
        setPriority('medium');
      } else {
        Alert.alert('Error', 'Some tasks failed to add. Please try again.');
      }
    }
    } catch (error) {
      console.error('Error saving tasks:', error);
      Alert.alert('Error', 'Failed to add tasks. Please try again.');
    }
  };

  const handleReset = () => {
    setTaskName('');
    setTaskPurpose('');
    setAssignTo('');
    setNote('');
    setDescription('');
    setDate(new Date());
    setTime(new Date());
    setPriority('medium');
    setSelectedOptions([]);
  };

  const handleSaveModal = () => {
    setAssignTo(selectedOptions.map(option => option.name).join(', '));
    setModalVisible(false);
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

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <SafeAreaView>
<ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <Text style={styles.label}>Task Type:</Text>
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

        <Text style={styles.label}>Task Name:</Text>
        <TextInput
          style={styles.input}
          value={taskPurpose}
          onChangeText={text => setTaskPurpose(text)}
          placeholder='Enter task name'
          editable={true}
        />

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

              <Button title="Save" onPress={handleSaveModal} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Remarks:</Text>
        <TextInput
          style={styles.textArea}
          value={note}
          onChangeText={text => setNote(text)}
          placeholder="Enter any note"
          multiline={true}
          numberOfLines={3}
        />
        <Text style={styles.label}>Link:</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder="Enter link for sheets or docs"
          multiline={true}
          numberOfLines={3}
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.button2}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveAssignTo}>
            <Text style={styles.button1}>Assign</Text>
          </TouchableOpacity>
        </View>

        
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
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfile}>
            <Image source={require('../../assets/Images/user (2).png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
    </ScrollView>
    </SafeAreaView>
    
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
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    backgroundColor: '#D0EFCB',
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '80%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionText: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    width: '100%',
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

export default AssignCCR1;
