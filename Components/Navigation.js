import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Navigation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="ViewFacultyHod"
        onPress={() => navigation.navigate('ViewFacultyHod')}
      />
      <Button
        title="AddFacultyHod"
        onPress={() => navigation.navigate('AddFacultyHod')}
      />
      <Button
        title="AssignTaskHod"
        onPress={() => navigation.navigate('AssignTaskHod')}
      />
      <Button
        title="ViewTasksHod"
        onPress={() => navigation.navigate('ViewTasksHod')}
      />
      <Button
        title="LoginHod"
        onPress={() => navigation.navigate('LoginHod')}
      />
      <Button
        title="AssignedTask"
        onPress={() => navigation.navigate('AssignedTask')}
      />
      <Button
        title="MyDrawer"
        onPress={() => navigation.navigate('MyDrawer')}
      />
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigation;
