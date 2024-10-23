import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator,ImageBackground} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgQRCode from 'react-native-qrcode-svg'; // Import QR Code generator
import MainHeader from '../components/MainHeader';

const QrCode = props => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const mobile = await AsyncStorage.getItem('mobile');

        const postData = {
          mobileNumber: mobile, // Use the mobile fetched from AsyncStorage
        };

        const response = await fetch(
          'https://shreebageshwardhamseva.com/admin/api/get-profile.php',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          },
        );

        if (response.ok) {
          const responseData = await response.json();
          const profileData = responseData[0]; // Assuming response is an array

          setProfile(profileData);
        } else {
          console.error('HTTP error:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, []);

  // If the data is loading, show a loader
  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{flex: 1}}>
        <View style={{paddingHorizontal:15}}>
      <MainHeader
        navigation={props.navigation}
        profileImg={profile?.profile_image}
      />
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={{fontSize:25, fontWeight:'700'}}> My QR Code</Text>
      </View>

      <View style={styles.qrContainer}>
        {profile ? (
          <SvgQRCode
            value={JSON.stringify(profile)} // Convert the profile data to a string and encode it in the QR code
            size={300}
          />
        ) : (
          <Text>Loading QR Code...</Text>
        )}
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfoContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default QrCode;
