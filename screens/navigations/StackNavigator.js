import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Splash';
import Otp from '../Otp';
import Login from '../Login';
import Main from '../Main';
import ProfileDetails from '../ProfileDetails';
import Personalize from '../Personalize';
import Location from '../Location';
import TermConditions from '../TermConditions';
import DonationDisclaimer from '../DonationDisclaimer';
import Privacy from '../Privacy';
import Events from '../Events';
import UploadEvent from '../UploadEvent';
import EventTopBar from '../EventTopBar';
import QrCode from '../QrCode';
import Scanner from '../Scanner';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
            <Stack.Screen name="Personalize" component={Personalize} options={{headerShown: false}} />
            <Stack.Screen name="Location" component={Location} options={{headerShown: false}} />
            <Stack.Screen name="Terms" component={TermConditions} options={{headerShown: false}} />
            <Stack.Screen name="DonationDesclaimer" component={DonationDisclaimer} options={{headerShown: false}} />
            <Stack.Screen name="Privacy" component={Privacy} options={{headerShown: false}} />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{headerShown: false}} />
            <Stack.Screen name="Events" component={Events} options={{headerShown: false}} />
            <Stack.Screen name="UploadEvent" component={UploadEvent} options={{headerShown: false}} />
            <Stack.Screen name="EventTopBar" component={EventTopBar} options={{headerShown: false}} />
            <Stack.Screen name="QrCode" component={QrCode} options={{headerShown: false}} />
            <Stack.Screen name="Scanner" component={Scanner} options={{headerShown: false}} />


        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})