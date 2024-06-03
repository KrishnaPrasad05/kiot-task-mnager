import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity, ScrollView,Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';
const AddFacultyPnpl = () => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [profImg, setprofImg] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [mob, setmob] = useState('');
  const [mailid, setMailId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { variableValue, setVariableValue } = useContext(AppContext);
  const handleSubmit = async () => {
    if (!name || !department || !mob || !mailid || !username || !password || !profImg || !role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`https://${variableValue}/faculty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, department, mob, mailid, username, password,profImg,role }),
      });

      if (response.ok) {
        Alert.alert('Success', 'User added successfully');
        navigation.navigate('HomePagePnpl');
        // Clear input fields
        setName('');
        setDepartment('');
        setRole('');
        setmob('');
        setMailId('');
        setUsername('');
        setPassword('');
        setprofImg('');
      } else {
        Alert.alert('Error', 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user. Please try again later');
    }
  };

  const handleReset = () => {
    // Reset all form fields
    setName('');
        setDepartment('');
        setRole('');
        setmob('');
        setMailId('');
        setUsername('');
        setPassword('');
        setprofImg('');
  };
  

  const handleProfile = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('ProfilePnpl'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleHome = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('HomePagePnpl'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleAdd = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('AddFacultyPnpl'); // Replace 'OtherPage' with the name of the target screen
  };
  const handleView = () => {
    // Navigate to the other page when the button is pressed
    navigation.navigate('ViewFacultyPnpl'); // Replace 'OtherPage' with the name of the target screen
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
        
        <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Profile image:</Text>
      <TextInput
        style={styles.input}
        value={profImg}
        onChangeText={text => setprofImg(text)}
        placeholder="Enter Url"
      />
      <Text style={styles.label}>Department:</Text>
      <TextInput
        style={styles.input}
        value={department}
        onChangeText={text => setDepartment(text)}
        placeholder="Enter department"
      />
      <Text style={styles.label}>Role:</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={text => setRole(text)}
        placeholder="Enter role"
      />
      <Text style={styles.label}>Mobile Number:</Text>
      <TextInput
        style={styles.input}
        value={mob}
        onChangeText={text => setmob(text)}
        placeholder="Enter mob"
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
     <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
     <TouchableOpacity >
        <Text style={styles.button2} onPress={handleReset}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.button1}>Add</Text>
      </TouchableOpacity>
     </View>


     
        
     
     
    </View>
    <View style={{ backgroundColor: '#fafafa',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#fff',
    width: '100%',
    
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',}}>

    <TouchableOpacity onPress={handleHome}>
      <View >
        
      <Image source={require('../../assets/Images/home.png')} style={{width:25,height:25}} />
     
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAdd}>
      <View style={{backgroundColor:'#D0EFCB',padding:10,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',width:60,height:60}}>
      <Image source={require('../../assets/Images/add-friend.png')} style={{width:25,height:25}} />
      <Text>Add</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleView}>
      <View >
      <Image source={require('../../assets/Images/list.png')} style={{width:25,height:25}} />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfile}>
      <View >
      <Image source={require('../../assets/Images/user (2).png')} style={{width:25,height:25}} />
      </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   padding:10,
    backgroundColor: '#fff',
  },
  button1: {
    backgroundColor: '#024c12',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:120,
  },
  button2: {
    backgroundColor: 'lightgrey',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:120,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft:10,
    color:'grey'
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    backgroundColor:'#D0EFCB',
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default AddFacultyPnpl;
