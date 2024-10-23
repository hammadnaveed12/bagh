import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  Button,
  ImageBackground,
  Image,
  Text,
  ToastAndroid,
} from 'react-native';

const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Function to generate a random 6-digit OTP
  const generateOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
    console.log(`Generated OTP: ${generatedOTP}`);
    setOtp(generatedOTP.toString()); // Set OTP state
  };

  useEffect(() => {
    generateOTP(); // Generate OTP on component load
  }, []);

  const handleLogin = () => {
    // Check if mobileNumber is empty or less than 10 digits
    if (mobileNumber.trim() === '' || mobileNumber.length < 10) {
      ToastAndroid.show('Enter Your Mobile Number!', ToastAndroid.SHORT);
      return;
    }

    generateOTP(); // Generate a new OTP each time the user presses the button

    // Updated URL and parameters for the SMS API
    const url = `https://mobicomm.dove-sms.com/submitsms.jsp`;
    const params = {
      user: "Gbkotp",  // Your username
      key: "19c8512790XX",  // Your API key
      mobile: `+91${mobileNumber}`,  // Mobile number with country code
      message: `Your OTP is ${otp} for श्री बागेश्वर धाम सरकार please use this to complete your phone number verification OTP is valid for 5 minutes. Please do not share the OTP. BGDMSS`,
      senderid: "BGDMSS",  // Header (Sender ID)
      accusage: "6",  // OTP usage type
      unicode: "1",  // Use unicode for non-English content (e.g., Hindi)
      entityid: "1701170383622266368",  // Your DLT entity ID
      tempid: "1707170445440693213"  // Your DLT template ID
    };

    // Create the query string from the params object
    const queryString = new URLSearchParams(params).toString();
    
    // Fetch API to send SMS
    fetch(`${url}?${queryString}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console.log(`SMS API Response: ${data}`);
        console.log(`OTP sent: ${otp}`);
        // Navigate to OTP screen with OTP and mobile number
        navigation.navigate('Otp', { otp: otp, mobileNumber: mobileNumber });
      })
      .catch(error => console.error(error));
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      resizeMode="cover"
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              const cleanedText = text.replace(/[^0-9]/g, ''); // Allow only numeric input
              const limitedText = cleanedText.slice(0, 10); // Limit input to 10 digits
              setMobileNumber(limitedText);
            }}
            value={mobileNumber}
            keyboardType="numeric"
            placeholder="Enter Mobile Number"
            placeholderTextColor="gray"
          />

          <View style={styles.smallButtonContainer}>
            <View style={{ borderRadius: 50, overflow: 'hidden' }}>
              <Button
                onPress={() => handleLogin()}
                title="Get OTP"
                color="#FD4F00"
                accessibilityLabel="Login with mobile number"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 36,
  },
  largeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 50,
    color: 'black',
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
    marginTop: 30,
    marginBottom: 25,
    justifyContent: 'center',
  },
});