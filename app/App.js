import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View , Image, LogBox} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import OfficeScreen from './screens/OfficeScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserInfoScreen from './screens/UserInfoScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

LogBox.ignoreAllLogs();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color:"white"}, 
  headerTintColor: "white",
}

function Home() {
  return (
    <Tab.Navigator screenOptions={globalScreenOptions} >
     <Tab.Screen name="Home" component={HomeScreen} options={{
       tabBarIcon:({focused}) => (
        <View>
          <Image 
            source={require('./icons/home.png')}
            style={{tintColor: focused ? '#2C6BED' : 'gray',  width:30,
            height: 30,
            marginTop: 5,}}
          />
        
        </View>
       )
     }}/>
          <Tab.Screen name="Office" component={OfficeScreen} options={{
       tabBarIcon:({focused}) => (
        <View >
          <Image 
            source={require('./icons/people.png')}
            style={{tintColor: focused ? '#2C6BED' : 'gray',  width:30,
            height: 30,
            marginTop: 5,}}
          />
        </View>
       )
     }}/>
          <Tab.Screen name="Settings" component={SettingsScreen} options={{
       tabBarIcon:({focused}) => (
        <View >
          <Image 
            source={require('./icons/settings.png')}
            style={{tintColor: focused ? '#2C6BED' : 'gray',  width:27,
            height: 27,
            marginTop: 5,}}
          />
        </View>
       )
     }}/>

    </Tab.Navigator>
  );
}

function App() {


  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name = 'Login' component = {LoginScreen} />
          <Stack.Screen name = 'Register' component = {RegisterScreen} />
          <Stack.Screen options={{headerShown: false}} name = 'HomeNav' component = {Home} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
