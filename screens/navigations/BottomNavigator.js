import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Reels from '../Reels';
import Greating from '../Greating';
import Profile from '../Profile';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    
        <Bottom.Navigator initialRouteName='Event'>
            <Bottom.Screen name="Home" component={Home} options={{headerShown: false,
            tabBarActiveTintColor: '#fb5403',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 12,
              paddingBottom: 5,
              // color: '#fb5403'
          }, 
            tabBarIcon: () => {
              return (
                <Image source={require('../../assets/icons/home.png')} style={{width: 20, height: 20, tintColor: 'gray'}}/>

              );
            },
            
          }} />

            <Bottom.Screen name="Media" component={Reels} options={{headerShown: false,
            tabBarActiveTintColor: '#fb5403',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 12,
              paddingBottom: 5,
              // color: '#fb5403'
          },
            tabBarIcon: () => {
              return (
                <Image source={require('../../assets/icons/marketing.png')} style={{width: 20, height: 20, tintColor: 'gray'}}/>

              );
            },}} />

            <Bottom.Screen name="Greeting" component={Greating} options={{headerShown: false,
            tabBarActiveTintColor: '#fb5403',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 14,
              paddingBottom: 5,
              // color: '#fb5403'
          }, 
            tabBarIcon: () => {
              return (
                <Image source={require('../../assets/icons/video.png')} style={{width: 20, height: 20, tintColor: 'gray'}}/>

              );
            },}} />
            <Bottom.Screen name="Profile" component={Profile} options={{headerShown: false,
            tabBarActiveTintColor: '#fb5403',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 14,
              paddingBottom: 5,
              // color: '#fb5403'
              
          }, 
            tabBarIcon: () => {
              return (
                <Image source={require('../../assets/icons/person.png')} style={{width: 25, height: 20, tintColor: 'gray'}}/>

              );
            },}} />

            
        </Bottom.Navigator>
    
  )
}

export default BottomNavigator

const styles = StyleSheet.create({})