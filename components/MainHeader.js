import {StyleSheet, Text, View, Image, TouchableOpacity,Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scaler from './scaler';

const MainHeader = ({navigation, profileImg, set}) => {
  const [profileImage, setProfileImage] = useState(profileImg);

  const loadProfileImage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('profileImageUri');
      if (savedUri) {
        // setProfileImage(savedUri);
      }
    } catch (error) {
      console.error('Error loading profile image from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadProfileImage();
  }, [profileImg]);

  const handleClick = () => {
    navigation.navigate('ProfileDetails');
  };

  useEffect(() => {
    setProfileImage('kklkl');
  }, [set]);
  return (
    <View style={styles.header}>
      {profileImg ? (
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => handleClick()}>
          <Image
            style={styles.profilePic}
            source={{
              uri: `${profileImg}?timestamp=${new Date().getTime()}`,
              cache: 'reload',
            }}
          />
          {/* <View style={{ backgroundColor: "white", alignItems: 'center', borderRadius: 50, height: 25, width: 25, justifyContent: 'center', padding: 5, position: 'absolute', top: 10, right: -10 }}> */}
          {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/icons/menu.png')} /> */}
          {/* </View> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => handleClick()}>
          <Image
            style={styles.profilePic}
            source={require('../assets/images/dummy-avatar.jpg')}
          />
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              borderRadius: 50,
              height: 25,
              width: 25,
              justifyContent: 'center',
              padding: 5,
              position: 'absolute',
              top: 10,
              right: -10,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/icons/menu.png')}
            />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <Image
          style={{height: scaler(78), width: scaler(320)}}
          resizeMode="contain"
          source={require('../assets/images/h-1.png')}
        />
        {/* <Text style={styles.headerText}>श्री बागेश्वर धाम सरकार</Text>
        <Text style={{ alignSelf: 'center', marginTop: 'auto', color: 'orange' }}>मध्यप्रदेश मुख्य धाम अंतर्गत महाराष्ट्र राज्य</Text> */}
      </View>

      <View>
        <Image
          style={styles.profilePic}
          source={require('../assets/images/b-l.png')}
        />
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 50 : 0
    // backgroundColor: '#F8F8C6',
  },
  headerText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
