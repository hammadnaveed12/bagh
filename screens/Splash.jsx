import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const Splash = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const mobile = await AsyncStorage.getItem('mobile');
          if (mobile !== null) {
            navigation.navigate('Main');
          } else {
            navigation.navigate('Login');
          }
        } catch (e) {
          console.warn(e);
        }
      };

      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/splash.jpg')} resizeMode="cover" style={styles.image}>
      </ImageBackground>
    </View>
  );
};



export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },



})