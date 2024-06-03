import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Alert, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HomePageHod = () => {
    const navigation = useNavigation();

    const handleAssignTask = () => {
      navigation.navigate('AssignTaskHod');
    };
    const handleAssignedTask = () => {
      navigation.navigate('AssignedTaskHod');
    };
    const handleTrackTask = () => {
      navigation.navigate('TaskStatusHod');
    };
    const handleTrackCCR = () => {
      navigation.navigate('TrackOperations');
    };
    const handleAssignedCCR = () => {
      navigation.navigate('AssignCCR');
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

    const handleBackPress = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => navigation.navigate('CommonLand')
          }
        ],
        { cancelable: false }
      );
      return true;
    };

      
    useFocusEffect(
      useCallback(() => {
          const onBackPress = () => handleBackPress();

          BackHandler.addEventListener('hardwareBackPress', onBackPress);

          return () => {
              BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          };
      }, [])
  );

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50, flex: 1 }}>
            <TouchableOpacity onPress={handleAssignTask}>
              <View style={styles.option}>
                <Image source={require('../../assets/Images/list 1.png')} style={styles.optionImage} />
                <Text>Assign Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTrackTask}>
              <View style={styles.option}>
                <Image source={require('../../assets/Images/status 1.png')} style={styles.optionImage} />
                <Text>Track Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAssignedTask}>
              <View style={styles.option}>
                <Image source={require('../../assets/Images/clipboard (1).png')} style={styles.optionImage} />
                <Text>Assigned Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAssignedCCR}>
              <View style={styles.option}>
                <Image source={require('../../assets/Images/delegation.png')} style={styles.optionImage} />
                <Text>Assign Operation</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTrackCCR}>
              <View style={styles.option}>
                <Image source={require('../../assets/Images/track (1).png')} style={styles.optionImage} />
                <Text>Track Operation</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleHome}>
              <View style={styles.footerIcon}>
                <Image source={require('../../assets/Images/home.png')} style={styles.footerImage} />
                <Text>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd}>
              <View>
                <Image source={require('../../assets/Images/add-friend.png')} style={styles.footerImage} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleView}>
              <View>
                <Image source={require('../../assets/Images/list.png')} style={styles.footerImage} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile}>
              <View>
                <Image source={require('../../assets/Images/user (2).png')} style={styles.footerImage} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: '#D0EFCB',
    padding: 30,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  optionImage: {
    width: 100,
    height: 100,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    width: "100%",
    padding: 10,
  },
  footerIcon: {
    backgroundColor: '#D0EFCB',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerImage: {
    width: 25,
    height: 25,
  },
});

export default HomePageHod;
