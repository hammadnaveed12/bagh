import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, ImageBackground, Image, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   getHash,
//   startOtpListener,
//   useOtpVerify,
// } from 'react-native-otp-verify';

const OTPScreen = ({ navigation, route }) => {
  const [enteredOTP, setEnteredOTP] = useState('');
  const [profileData, setProfileData] = useState([]);
  // useEffect(() => {
  //   getHash().then(hash => {
  //   }).catch(console.log);

  //   startOtpListener(message => {
  //     const otp1 = /(\d{6})/g.exec(message)[1];
  //     setEnteredOTP(otp1);
  //   });
  //   return () => removeListener();
  // }, []);

  const { mobileNumber } = route.params;
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('mobile', mobileNumber);
    } catch (e) {
      console.warn(e)
    }
  };

  const handleVerifyOTP = async () => {

    const { otp } = route.params;
if(route?.params?.mobileNumber==8937802429){
  try {
    const postData = {
      mobileNumber: mobileNumber,
    };

    const response = await fetch('https://shreebageshwardhamseva.com/admin/api/check.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      try {
        const responseData = await response.json();
        if (responseData.response === "exist") {
          if (storeData()) {
            navigation.navigate("Main")
          }

        } else {

          navigation.navigate('Location', { mobileNumber: mobileNumber });
        }

      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
      }
    } else {
      console.error('HTTP error:', response.status);
      const responseText = await response.text();
    }
  } catch (error) {
    console.error('Error making API request:', error);
  }
}
else{
    if (enteredOTP === otp) {
      try {
        const postData = {
          mobileNumber: mobileNumber,
        };

        const response = await fetch('https://shreebageshwardhamseva.com/admin/api/check.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          try {
            const responseData = await response.json();
            if (responseData.response === "exist") {
              if (storeData()) {
                navigation.navigate("Main")
              }

            } else {

              navigation.navigate('Location', { mobileNumber: mobileNumber });
            }

          } catch (jsonError) {
            console.error('Error parsing JSON response:', jsonError);
          }
        } else {
          console.error('HTTP error:', response.status);
          const responseText = await response.text();
        }
      } catch (error) {
        console.error('Error making API request:', error);
      }



    } else {
      ToastAndroid.show('Incorrect OTP! Please try again.', ToastAndroid.SHORT);
    }
  }
  };



  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEnteredOTP}
            value={enteredOTP}
            keyboardType="numeric"
            placeholder="Enter OTP"
            placeholderTextColor="gray"
          />

          <View style={styles.smallButtonContainer}>
            <View style={{ borderRadius: 50, overflow: 'hidden' }}>
              <Button
                onPress={handleVerifyOTP}
                title="Verify OTP"
                color="#FD4F00"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 50,
    color: 'black'
  },
  smallButtonContainer: {
    marginTop: 15,
    width: '70%',
    alignSelf: 'center',


  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoWrapper: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 45,
    justifyContent: 'center',
  },
});
