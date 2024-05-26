import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl ,Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const PooledStatus = () => {
    const navigation = useNavigation();
    const [pendingCount, setPendingCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);
    const [progressCount, setProgressCount] = useState(0);
    const [laterCount, setLaterCount] = useState(0);
    const { variableValue, setVariableValue } = useContext(AppContext);
    useEffect(() => {
      fetchPendingCount();
      fetchResolvedCount();
      fetchProgressCount();
      fetchLaterCount();
    }, []);
  
    const fetchPendingCount = async () => {
      try {
        const response = await fetch(`https://${variableValue}/pooled?status=Pending`);
        const jsonData = await response.json();
        setPendingCount(jsonData.length);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };
    const fetchResolvedCount = async () => {
      try {
        const response = await fetch(`https://${variableValue}/pooled?status=resolved`);
        const jsonData = await response.json();
        setResolvedCount(jsonData.length);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };
    const fetchProgressCount = async () => {
      try {
        const response = await fetch(`https://${variableValue}/pooled?status=on-progress`);
        const jsonData = await response.json();
        setProgressCount(jsonData.length);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };
    const fetchLaterCount = async () => {
      try {
        const response = await fetch(`https://${variableValue}/pooled?status=later`);
        const jsonData = await response.json();
        setLaterCount(jsonData.length);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };
    const handleResolvedTask = (point) => {
      // Navigate to the next screen and pass the status as a parameter
      navigation.navigate('ViewPooled', { point });
    };
    const handleAssignedTask = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedTaskHod'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleTrackTask = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('ViewTasksHod'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleReport = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('ReportTablePooled'); // Replace 'OtherPage' with the name of the target screen
    };
  
  
    return(
<ScrollView>


<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>

    <TouchableOpacity onPress={() => handleResolvedTask('resolved')}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/approved.png')} style={{width:100,height:100}} />
    <Text>Resolved : {resolvedCount}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleResolvedTask('on-progress')}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/on-progress (1).png')} style={{width:100,height:100}} />
    <Text>On-Progress : {progressCount}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleResolvedTask('later')}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/report.png')} style={{width:100,height:100}} />
    <Text>Later : {laterCount}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleResolvedTask('Pending')}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/expired.png')} style={{width:100,height:100}} />
    <Text>Pending : {pendingCount}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleReport}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/download.png')} style={{width:100,height:100}} />
    <Text>Download Report</Text>
    </View>
    </TouchableOpacity>
   {/*  <TouchableOpacity onPress={handleProfile}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20}}>
    <Image source={require('../../assets/Images/man 1.png')} style={{width:100,height:100}} />
    <Text>Profile</Text>
    </View>
    </TouchableOpacity> */}


    
</View>
</ScrollView>
    );
}
export default PooledStatus;