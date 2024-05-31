import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl ,Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePagePnpl = () => {
    const navigation = useNavigation();

    const handleAssignTask = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignTaskPnpl'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleTrackTask = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('TaskStatusPnpl'); // Replace 'OtherPage' with the name of the target screen
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
  
    return(
<ScrollView>


<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>

    <TouchableOpacity onPress={handleAssignTask}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30}}>
    <Image source={require('../../assets/Images/list 1.png')} style={{width:100,height:100}} />
    <Text>Assign Task</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleTrackTask}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30}}>
    <Image source={require('../../assets/Images/status 1.png')} style={{width:100,height:100}} />
    <Text>Track Task</Text>
    </View>
    </TouchableOpacity>
   {/*  <TouchableOpacity onPress={handleProfile}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20}}>
    <Image source={require('../../assets/Images/man 1.png')} style={{width:100,height:100}} />
    <Text>Profile</Text>
    </View>
    </TouchableOpacity> */}

<View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fafafa',width:"100%",padding:10,marginTop:300}}>

    <TouchableOpacity onPress={handleHome}>
      <View style={{backgroundColor:'#D0EFCB',padding:10,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center'}}>
        
      <Image source={require('../../assets/Images/home.png')} style={{width:25,height:25}} />
      <Text>Home</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAdd}>
      <View >
      <Image source={require('../../assets/Images/add-friend.png')} style={{width:25,height:25}} />
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
    
</View>

</ScrollView>
    );
}
export default HomePagePnpl;