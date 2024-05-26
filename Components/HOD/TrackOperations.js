import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl ,Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../AppContext';

const TrackOperations = () => {
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
    const handleCCR = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('CCRStatus'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleOnCamp = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('CompVisitStatus'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleOffCamp = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('OnCampStatus'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleCompVisit = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('OffCampStatus'); // Replace 'OtherPage' with the name of the target screen
    };
    const handlePooled = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('PooledStatus'); // Replace 'OtherPage' with the name of the target screen
    };
  
  
    return(
<ScrollView>


<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>

    <TouchableOpacity onPress={handleCCR}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/contact-information.png')} style={{width:100,height:100}} />
    <Text>Track CCR</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleOnCamp}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/building-insurance.png')} style={{width:100,height:100}} />
    <Text>Track Company Visits</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleOffCamp}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/school.png')} style={{width:100,height:100}} />
    <Text>Track On-Campus</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleCompVisit}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/office-building (1).png')} style={{width:100,height:100}} />
    <Text>Track Off-Campus</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePooled}>
    <View style={{backgroundColor:'#D0EFCB',padding:10,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/team.png')} style={{width:100,height:100}} />
    <Text>Track Pooled</Text>
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
export default TrackOperations;