import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AppContext from '../AppContext';
const AssignedCCRDetails = ({ route }) => {
  const navigation = useNavigation();
  const { faculty } = route.params;
  const { variableValue, setVariableValue } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(faculty.status); // Status field state

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(`https://${variableValue}/ccr/${faculty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...faculty, status }), // Spread the existing faculty object and update only the status
      });

      if (response.ok) {
        Alert.alert('Success', 'Status updated successfully');
        navigation.navigate('HomePageFac');
      } else {
        Alert.alert('Error', 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Failed to update status. Please try again later');
    }
  };

  const openGoogleSheet = () => {
    // Regular expression to match a Google Sheets URL
    const googleSheetRegex = /https?:\/\/docs\.google\.com\/(?:spreadsheets|document)\/d\/\S+/g;
    
    // Extracting Google Sheets link from the description
    const description = faculty.description;
    const googleSheetLinks = description.match(googleSheetRegex);
    
    // Opening each Google Sheets link
    if (googleSheetLinks) {
      googleSheetLinks.forEach(link => {
        Linking.openURL(link);
      });
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
      <Text style={{ color: '#024c12', backgroundColor:'#D0EFCB',width:130,padding:7,borderRadius:7 }} onPress={openGoogleSheet}>Open Google Sheet</Text>
      {/* <Text style={{ marginBottom: 15 }}>{faculty.description}</Text> */}
      <Text style={{ color: 'grey' }}>Priority</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.priority}</Text>
      <Text style={{ color: 'grey' }}>Status</Text>
      <Text style={{ marginBottom: 15 }}>{faculty.status}</Text>

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={styles.button1}>Update Status</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={{ width: '80%', backgroundColor: '#D0EFCB', marginBottom: 10, borderRadius: 5 }}
          >
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="Resolved" value="resolved" />
            <Picker.Item label="Later" value="later" />
            <Picker.Item label="On-Progress" value="on-progress" />
          </Picker>

          <TouchableOpacity style={styles.button} onPress={handleUpdateStatus}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={() => setIsModalVisible(false)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0072f9',
    padding: 10,
    width: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default AssignedCCRDetails;
