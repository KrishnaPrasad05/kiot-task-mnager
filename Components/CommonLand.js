import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
const CommonLand = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('');

  const handleHodLogin =()=>{
    navigation.navigate('LoginHod')
  }
  const handleFacLogin =()=>{
    navigation.navigate('LoginPageFac')
  }
  const handlePrincipalLogin =()=>{
    navigation.navigate('LoginPnpl')
  }

  return (
    <SafeAreaView style={{flex:1}}>

   
    <View style={styles.container}>
        <View style={styles.containerSm}>
            <Text style={{fontWeight:600,margin:10,fontSize:25,color:'#024C12'}}>KIOT - Task Manager</Text>
            
        <Image source={require('../assets/Images/kiotLogo.png')}  style={{borderRadius:10}}/>
        </View>
       
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={handlePrincipalLogin} style={{backgroundColor:'#024C12',width:150,padding:10,borderRadius:5,marginTop:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white'}}>Director's Login</Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={handleHodLogin} style={{backgroundColor:'#024C12',width:150,padding:10,borderRadius:5,marginTop:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white'}}>CRM/IRM('s) Login</Text>
    </TouchableOpacity>
        <TouchableOpacity onPress={handleFacLogin} style={{backgroundColor:'#024C12',width:150,padding:10,borderRadius:5,marginTop:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white'}}>PO's Login</Text>
    </TouchableOpacity>
      </View>
     {/*  <View style={styles.footer}>
        <Text style={{color:'black'}}>&copy;KIOT | Developed by : KRISHNA PRASAD S & Team</Text>
        </View> */}
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
    height:'60%',
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

export default CommonLand;

