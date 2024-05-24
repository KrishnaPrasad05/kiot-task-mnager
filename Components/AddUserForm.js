import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [mailid, setMailId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!name || !department || !experience || !mailid || !username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.246.5:3001/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, department, experience, mailid, username, password }),
      });

      if (response.ok) {
        Alert.alert('Success', 'User added successfully');
        // Clear input fields
        setName('');
        setDepartment('');
        setExperience('');
        setMailId('');
        setUsername('');
        setPassword('');
      } else {
        Alert.alert('Error', 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user. Please try again later');
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Department:</Text>
      <TextInput
        style={styles.input}
        value={department}
        onChangeText={text => setDepartment(text)}
        placeholder="Enter department"
      />
      <Text style={styles.label}>Experience:</Text>
      <TextInput
        style={styles.input}
        value={experience}
        onChangeText={text => setExperience(text)}
        placeholder="Enter experience"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Mail ID:</Text>
      <TextInput
        style={styles.input}
        value={mailid}
        onChangeText={text => setMailId(text)}
        placeholder="Enter mail ID"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="Enter username"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default AddUserForm;
