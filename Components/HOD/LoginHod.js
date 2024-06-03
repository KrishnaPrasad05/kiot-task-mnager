import React, { useState,useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import AppContext from '../AppContext';
const LoginHod = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('');
  const { variableValue, setVariableValue } = useContext(AppContext);
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`https://${variableValue}/faculty?username=${username}&password=${password}`);
      const userData = await response.json();

      if (userData.length > 0) {
        try {
          const { name } = userData[0]; // Assuming name is a property in the JSON response
          await AsyncStorage.setItem('name', name); // Storing the name instead of username
          console.log('Name stored locally:', name);
          navigation.navigate('HomePageHod');
        } catch (error) {
          console.error('Error storing username:', error);
        }
        Alert.alert("Sucess");
       
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to login. Please try again later');
    }
  };

  useEffect(() => {
    // Fetch the username from AsyncStorage when the component mounts
    getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        // Username retrieved successfully
        setUsername(storedUsername);
        console.log('Username retrieved:', storedUsername);
        
      } else {
        console.log('No username stored.');
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>

    
    <View style={styles.container}>
        <View style={styles.containerSm}>
            <Text style={{fontWeight:600,margin:10,fontSize:25}}>KIOT - Task Manager</Text>
            
        <Image source={require('../../assets/Images/kiotLogo.png')} style={{borderRadius:10}} />
        </View>
        <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:30}}>
        <Text style={{color:'#024C12',marginBottom:10,fontSize:15}}>CRM/IRM 's Login</Text>
        <View style={{display:'flex',flexDirection:'row',backgroundColor:'#D0EFCB',width:'80%',borderWidth: 1,
    borderColor: 'black',borderRadius:10,padding:2}}>
            <View style={{backgroundColor:'#D9D9D9',padding:7,borderRadius:10, borderWidth: 1,
    borderColor: 'black',}}>
            <Image  source={require('../../assets/Images/user (1) 1.png')} />
            </View>
            <TextInput
            style={{marginLeft:10,flex:1}}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="Enter username"
      />
        </View>
        <View style={{display:'flex',flexDirection:'row',backgroundColor:'#D0EFCB',width:'80%',borderWidth: 1,
    borderColor: 'black',borderRadius:10,padding:2,marginTop:30}}>
            <View style={{backgroundColor:'#D9D9D9',padding:7,borderRadius:10, borderWidth: 1,
    borderColor: 'black',}}>
            <Image  source={require('../../assets/Images/padlock 1.png')} />
            </View>
            <TextInput style={{marginLeft:5,width:'100%',flex:1}}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Enter password"
        secureTextEntry={true}
      />
        </View>
       {/*  <View style={{flexDirection: 'row',
    backgroundColor: '#D0EFCB',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 2,
    marginTop: 20,}}>
        <View style={{backgroundColor: '#D9D9D9',
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'}}>
          <Image source={require('../../assets/Images/pass 1.png')} />
        </View>
        <View style={{height:'30'}}>
        <Picker
    selectedValue={selectedOption}
    style={{ flex: 1, backgroundColor: 'white'}}
   
    onValueChange={(itemValue, itemIndex) =>
      setSelectedOption(itemValue)
    }>
    <Picker.Item label="Select Option" value="" />
    <Picker.Item label="Principal" value="principal" />
    <Picker.Item label="HOD" value="hod" />
  </Picker>
</View>


       
      </View> */}
        <TouchableOpacity onPress={handleLogin} style={{backgroundColor:'#024C12',width:100,padding:7,borderRadius:5,marginTop:50,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white'}}>Login</Text>
    </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <Text style={{color:'black'}}>&copy;KIOT | Developed by : KRISHNA PRASAD S & Team</Text>
        </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  containerSm:{
    width:'100%',
    height:'50%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#D0EFCB',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});

export default LoginHod;
