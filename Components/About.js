import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, FlatList } from 'react-native';

const About = () => {

    const data = [
        { id: '1', title: 'Operating System', description: 'Windows' },
        
        { id: '2', title: 'Development Environment', description: 'Microsoft Visual Studio (IDE)' },
        { id: '3', title: 'User Interface (UI) Development', description: 'Figma' },
        { id: '4', title: 'Framework', description: 'React Native' },
      ];
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.paragraph}>
      This task assignment application is designed to streamline task and 
project management, aiding individuals and teams in organizing, 
tracking, and managing tasks efficiently.By providing a platform 
for creating, assigning, prioritizing, and monitoring tasks' progress, 
it enhances productivity and collaboration within organizations. 
With features such as secure user authentication, task tracking, and 
collaboration tools, the system ensures timely completion of tasks 
while fostering communication and teamwork among users.
      </Text>
      <Text style={styles.header}>Our Team</Text>

      <Text style={styles.link} onPress={() => openLink('https://www.linkedin.com/in/krishnaprasad-srinivasan/')}>
       KRISHNA PRASAD S
      </Text>
      <Text style={styles.link} onPress={() => openLink('https://www.linkedin.com/in/mugilvendhan/')}>
        MUGIL VENDHAN G
      </Text>
      <Text style={styles.link} onPress={() => openLink('https://www.linkedin.com/in/nithyapriya-v-203173235/')}>
        NITHYAPRIYA V
      </Text>
      <Text style={styles.link} onPress={() => openLink('https://www.linkedin.com/in/pommi-sujitha-eswaran/')}>
        POMMI SUJITHA E
      </Text>
      <Text>Batch 2020-2024</Text>
      <Text style={{textTransform:'capitalize'}}>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</Text>
      <Text>Knowledge Institute of Technology, Salem</Text>
      <Text style={styles.header}>Under the guidance of</Text>
      <Text style={styles.link} onPress={() => openLink('https://www.linkedin.com/in/dr-rajendran-periyasamy-b257b1148/')}>
      Dr . P. RAJENDRAN,
      </Text>
      <Text>DIR-PAT , Professor</Text>
      <Text style={{textTransform:'capitalize'}}>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</Text>
      <Text>Knowledge Institute of Technology, Salem</Text>

<Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#024C12',marginBottom:10,marginTop:10}}>Developed Using :</Text>
{data.map(item => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.bullet}>•</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}:</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  link: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
    textDecorationLine: 'underline',
    textDecorationColor:'blue'
  },
  paragraph: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'justify',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'#024C12'
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    
  },
  description: {
    fontSize: 16,
    color:'grey',
  },
});

export default About;
