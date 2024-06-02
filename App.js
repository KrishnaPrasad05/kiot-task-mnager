 // App.js
 import React from 'react';

 import LoginScreen from './Components/LoginPage';
 import AddUser from './Components/HomePage';
 import Table from './Components/Table';
 import AddUserForm from './Components/AddUserForm';
 import Navigation from './Components/Navigation';
 import LoginHod from './Components/HOD/LoginHod';
 
 import { createStackNavigator } from '@react-navigation/stack';
 import { NavigationContainer } from '@react-navigation/native';
 import ViewFacultyHod from './Components/HOD/ViewFacultyHOD';
 import FacultyDetailsHod from './Components/HOD/FacultyDetailsHod';
 import AddFacultyHod from './Components/HOD/AddFacultyHod';
 import AssignTaskHod from './Components/HOD/AssignTaskHod';
 import ViewTasksHod from './Components/HOD/ViewTasks';
 import TaskDetailsHod from './Components/HOD/TaskDetailsHod';
 import ProfileHod from './Components/HOD/ProfileHod';
 import AssignedTask from './Components/Faculty/AssignedTask';
 import AssignedTaskDetails from './Components/Faculty/AssignedTaskDetails';
 import MyDrawer from './Components/HOD/MyDrawer';
 import HomePageHod from './Components/HOD/HomePage';
 import HomePageFac from './Components/Faculty/HomePageFac';
 import LoginPageFac from './Components/Faculty/LoginPageFac';
 import ProfileFac from './Components/Faculty/ProfileFac';
 import CommonLand from './Components/CommonLand';
 import AddFacultyPnpl from './Components/Principal/AddFacultyPnpl';
 import AssignTaskPnpl from './Components/Principal/AssignTaskPnpl';
 import FacultyDetailsPnpl from './Components/Principal/FacultyDetailsPnpl';
 import HomePagePnpl from './Components/Principal/HomePagePnpl';
 import LoginPnpl from './Components/Principal/LoginPnpl';
 import ProfilePnpl from './Components/Principal/ProfilePnpl';
 import TaskDetailsPnpl from './Components/Principal/TaskDetailsPnpl';
 import ViewFacultyPnpl from './Components/Principal/ViewFacultyPnpl';
 import ViewTasksPnpl from './Components/Principal/ViewTasksPnpl';
 import { AppProvider } from './Components/AppContext';
 import AssignedTaskHod from './Components/HOD/AssignedTaskHod';
 import TaskStatusHod from './Components/HOD/TaskStatus';
 import TaskStatusPnpl from './Components/Principal/TaskStatusPnpl';
 import AssignCCR from './Components/HOD/CCRAssign';
 import CCRStatus from './Components/HOD/CCRStatus';
 import ViewCCR from './Components/HOD/ViewCCR';
 import CCRDetails from './Components/HOD/CCRDetails';
 import AssignedCCR from './Components/Faculty/AssignedCCR';
 import AssignedCCRDetails from './Components/Faculty/AssignedCCRDetails';
 import ReportTable from './Components/HOD/ReportTable';
 import CompVisitStatus from './Components/HOD/CompVisitStatus';
 import OnCampStatus from './Components/HOD/OnCampStatus';
 import OffCampStatus from './Components/HOD/OffCampStatus';
 import PooledStatus from './Components/HOD/PooledStatus';
 import CompVisitDetails from './Components/HOD/CompVisitDetails';
 import OnCampDetails from './Components/HOD/OnCampDetails';
 import OffCampDetails from './Components/HOD/OffCampDetails';
 import PooledDetails from './Components/HOD/PooledDetails';
 import ViewCompVisit from './Components/HOD/ViewCompVisit';
 import ViewOffCamp from './Components/HOD/ViewOffCamp';
 import ViewOnCamp from './Components/HOD/ViewOnCamp';
 import ViewPooled from './Components/HOD/ViewPooled';
 import TrackOperations from './Components/HOD/TrackOperations';
 import AssignedCompVisit from './Components/Faculty/AssignedCompVisit';
 import AssignedOffCamp from './Components/Faculty/AssignedOffCamp';
 import AssignedOnCamp from './Components/Faculty/AssignedOnCamp';
 import AssignedPooled from './Components/Faculty/AssignedPooled';
 import AssignedCVDetails from './Components/Faculty/AssignedCVDetails';
 import AssignedOfCetails from './Components/Faculty/AssignedOfCDetails';
 import AssignedOnCDetails from './Components/Faculty/AssignedOnCDetials';
 import AssignedPoolDetails from './Components/Faculty/AssignedPoolDetails';
 import ReportTableCV from './Components/HOD/ReportTableCV';
 import ReportTableOn from './Components/HOD/ReportTableOn';
 import ReportTableOff from './Components/HOD/ReportTableOff';
 import ReportTablePooled from './Components/HOD/ReportTablePooled';
import AssignCCR1 from './Components/HOD/CCRAssign1';
import About from './Components/About';
 
 
 
 const Stack = createStackNavigator();
 const App = () => {
   return (
     
     <AppProvider>
 
 <NavigationContainer>
 <Stack.Navigator initialRouteName="CommonLand" >
   <Stack.Screen name="Navigation" component={Navigation} />
   <Stack.Screen name="LoginHod" component={LoginHod} options={{ headerShown: false }}/>
   <Stack.Screen name="ViewFacultyHod" component={ViewFacultyHod} />
   <Stack.Screen name="FacultyDetailsHod" component={FacultyDetailsHod} />
   <Stack.Screen name="AddFacultyHod" component={AddFacultyHod} />
   <Stack.Screen name="AssignTaskHod" component={AssignTaskHod} />
  <Stack.Screen name="ViewTasksHod" component={ViewTasksHod} />
   <Stack.Screen name="TaskDetailsHod" component={TaskDetailsHod} />
   <Stack.Screen name="ProfileHod" component={ProfileHod} />
   <Stack.Screen name="ProfileFac" component={ProfileFac} />
   <Stack.Screen name="AssignedTask" component={AssignedTask} />
   <Stack.Screen name="AssignedTaskDetails" component={AssignedTaskDetails} />
   <Stack.Screen name="HomePageHod" component={HomePageHod}  options={{ 
    headerShown: true,
    headerLeft: () => null,
  }} />
   <Stack.Screen name="CommonLand" component={CommonLand} options={{ headerShown: false }}/>
   <Stack.Screen name="HomePageFac" component={HomePageFac}  options={{ 
    headerShown: true,
    headerLeft: () => null,
  }} />
   <Stack.Screen name="LoginPageFac" component={LoginPageFac} options={{ headerShown: false }}/>
   <Stack.Screen name="AddFacultyPnpl" component={AddFacultyPnpl} />
   <Stack.Screen name="AssignTaskPnpl" component={AssignTaskPnpl} />
   <Stack.Screen name="FacultyDetailsPnpl" component={FacultyDetailsPnpl} />
   <Stack.Screen name="HomePagePnpl" component={HomePagePnpl}  options={{ 
    headerShown: true,
    headerLeft: () => null,
  }} />
   <Stack.Screen name="LoginPnpl" component={LoginPnpl} options={{ headerShown: false }}/>
   <Stack.Screen name="ProfilePnpl" component={ProfilePnpl} />
   <Stack.Screen name="TaskDetailsPnpl" component={TaskDetailsPnpl} />
   <Stack.Screen name="ViewFacultyPnpl" component={ViewFacultyPnpl} />
   <Stack.Screen name="ViewTasksPnpl" component={ViewTasksPnpl} />
   <Stack.Screen name="AssignedTaskHod" component={AssignedTaskHod} />
   <Stack.Screen name="TaskStatusHod" component={TaskStatusHod} />
   <Stack.Screen name="TaskStatusPnpl" component={TaskStatusPnpl} />
   <Stack.Screen name="AssignCCR" component={AssignCCR1} />
   <Stack.Screen name="CCRStatus" component={CCRStatus} />
   <Stack.Screen name="CompVisitStatus" component={CompVisitStatus} />
   <Stack.Screen name="OnCampStatus" component={OnCampStatus} />
   <Stack.Screen name="OffCampStatus" component={OffCampStatus} />
   <Stack.Screen name="PooledStatus" component={PooledStatus} />
   <Stack.Screen name="ViewCCR" component={ViewCCR} />
   <Stack.Screen name="ViewCompVisit" component={ViewCompVisit} />
   <Stack.Screen name="ViewOffCamp" component={ViewOffCamp} />
   <Stack.Screen name="ViewOnCamp" component={ViewOnCamp} />
   <Stack.Screen name="ViewPooled" component={ViewPooled} />
   <Stack.Screen name="CCRDetails" component={CCRDetails} />
   <Stack.Screen name="CompVisitDetails" component={CompVisitDetails} />
   <Stack.Screen name="OnCampDetails" component={OnCampDetails} />
   <Stack.Screen name="OffCampDetails" component={OffCampDetails} />
   <Stack.Screen name="PooledDetails" component={PooledDetails} />
   <Stack.Screen name="AssignedCCR" component={AssignedCCR} />
   <Stack.Screen name="AssignedCCRDetails" component={AssignedCCRDetails} />
   <Stack.Screen name="ReportTable" component={ReportTable} />
   <Stack.Screen name="TrackOperations" component={TrackOperations} />
   <Stack.Screen name="AssignedCompanyVisit" component={AssignedCompVisit} />
   <Stack.Screen name="AssignedOffCampus" component={AssignedOffCamp} />
   <Stack.Screen name="AssignedOnCampus" component={AssignedOnCamp} />
   <Stack.Screen name="AssignedPooled" component={AssignedPooled} />
   <Stack.Screen name="AssignedCompanyVisitDetails" component={AssignedCVDetails} />
   <Stack.Screen name="AssignedOffCampusDetails" component={AssignedOfCetails} />
   <Stack.Screen name="AssignedOnCampusDetails" component={AssignedOnCDetails} />
   <Stack.Screen name="AssignedPoolDetails" component={AssignedPoolDetails} />
   <Stack.Screen name="ReportTableCV" component={ReportTableCV} />
   <Stack.Screen name="ReportTableOn" component={ReportTableOn} />
   <Stack.Screen name="ReportTableOff" component={ReportTableOff} />
   <Stack.Screen name="ReportTablePooled" component={ReportTablePooled} />
   <Stack.Screen name="About" component={About} />
 
 </Stack.Navigator> 
 
 
 
 {/* <Stack.Navigator initialRouteName="LoginPageFac" headerMode="none">
   <Stack.Screen name="HomePageFac" component={HomePageFac} />
   <Stack.Screen name="AssignedTask" component={AssignedTask} />
   <Stack.Screen name="AssignedTaskDetails" component={AssignedTaskDetails} />
   <Stack.Screen name="LoginPageFac" component={LoginPageFac} />
   <Stack.Screen name="ProfileFac" component={ProfileFac} />
   </Stack.Navigator> */}
 
 
 {/* <MyDrawer/> */}
 
 
 
 </NavigationContainer>
 </AppProvider>
   );
 };
 
 export default App;
  
 
 
 
 
 
 
 
 
 
 /* import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import Navigation from './Components/Navigation'; // Importing the navigation page component
 import LoginScreen from './Components/LoginPage';
 import AddUser from './Components/HomePage';
 import AddUserForm from './Components/AddUserForm';
 import DisplayPage from './Components/Table';
 import ProfileScreen from './Components/Profile';
 import TaskForm from './Components/TaskForm';
 import SampTask from './Components/SampleTask';
 import LoginHod from './Components/HOD/LoginHod';
 
 const Stack = createStackNavigator();
 
 const App = () => {
   return (
      <NavigationContainer>
       <Stack.Navigator initialRouteName="Navigation" headerMode="none">
         <Stack.Screen name="Navigation" component={Navigation} />
         <Stack.Screen name="AddUser" component={AddUser} />
         <Stack.Screen name="AddFaculty" component={AddUserForm} />
         <Stack.Screen name="Table" component={DisplayPage} />
         <Stack.Screen name="LoginPage" component={LoginHod} />
         <Stack.Screen name="TaskForm" component={TaskForm} />
         <Stack.Screen name="SampTask" component={SampTask} />
         
       </Stack.Navigator>
     </NavigationContainer> 
 
    
   );
 };
 
 export default App;*/
 