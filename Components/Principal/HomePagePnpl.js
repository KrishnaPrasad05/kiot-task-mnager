import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView,Alert, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HomePagePnpl = () => {
    const navigation = useNavigation();

    const handleAssignTask = () => {
        navigation.navigate('AssignTaskPnpl');
    };
    const handleTrackTask = () => {
        navigation.navigate('TaskStatusPnpl');
    };
    const handleProfile = () => {
        navigation.navigate('ProfilePnpl');
    };
    const handleHome = () => {
        navigation.navigate('HomePagePnpl');
    };
    const handleAdd = () => {
        navigation.navigate('AddFacultyPnpl');
    };
    const handleView = () => {
        navigation.navigate('ViewFacultyPnpl');
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
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity onPress={handleAssignTask}>
                            <View style={styles.buttonContainer}>
                                <Image source={require('../../assets/Images/list 1.png')} style={styles.image} />
                                <Text>Assign Task</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleTrackTask}>
                            <View style={styles.buttonContainer}>
                                <Image source={require('../../assets/Images/status 1.png')} style={styles.image} />
                                <Text>Track Task</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleHome}>
                        <View style={styles.footerButton}>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#D0EFCB',
        padding: 30,
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 30,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    image: {
        width: 100,
        height: 100
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
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    footerButton: {
        backgroundColor: '#D0EFCB',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerImage: {
        width: 25,
        height: 25
    }
});

export default HomePagePnpl;
