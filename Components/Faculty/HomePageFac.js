import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl ,Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePageFac = () => {
    const navigation = useNavigation();

    const handleAssignTask = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedTask'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleAssignCCR = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedCCR'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleAssignCV = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedCompanyVisit'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleAssignOn = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedOnCampus'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleAssignOff = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedOffCampus'); // Replace 'OtherPage' with the name of the target screen
    };
    const handleAssignPool = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('AssignedPooled'); // Replace 'OtherPage' with the name of the target screen
    };
    
    const handleProfile = () => {
      // Navigate to the other page when the button is pressed
      navigation.navigate('ProfileFac'); // Replace 'OtherPage' with the name of the target screen
    };
  
    return(
<ScrollView>


<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
<TouchableOpacity onPress={handleAssignTask}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/list 1.png')} style={{width:100,height:100}} />
    <Text>Assigned Task</Text>
    </View>
    </TouchableOpacity>
<TouchableOpacity onPress={handleAssignCCR}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/contact-information.png')} style={{width:100,height:100}} />
    <Text>Assigned CCR</Text>
    </View>
    </TouchableOpacity>
<TouchableOpacity onPress={handleAssignCV}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/building-insurance.png')} style={{width:100,height:100}} />
    <Text>Assigned Company Visit</Text>
    </View>
    </TouchableOpacity>
<TouchableOpacity onPress={handleAssignOn}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/school.png')} style={{width:100,height:100}} />
    <Text>Assigned On-Campus</Text>
    </View>
    </TouchableOpacity>
<TouchableOpacity onPress={handleAssignOff}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/office-building (1).png')} style={{width:100,height:100}} />
    <Text>Assigned Off-Campus</Text>
    </View>
    </TouchableOpacity>
<TouchableOpacity onPress={handleAssignPool}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:30,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/team.png')} style={{width:100,height:100}} />
    <Text>Assigned Pooled</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleProfile}>
    <View style={{backgroundColor:'#D0EFCB',padding:30,width:300,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,marginBottom:50,borderWidth:0.5,borderColor:'black'}}>
    <Image source={require('../../assets/Images/man 1.png')} style={{width:100,height:100}} />
    <Text>Profile</Text>
    </View>
    </TouchableOpacity>
</View>
</ScrollView>
    );
}
export default HomePageFac;