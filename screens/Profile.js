import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RazorpayCheckout from 'react-native-razorpay';
import {useFocusEffect} from '@react-navigation/native';
import MainHeader from '../components/MainHeader';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Profile = ({navigation}) => {
  const [profileComplition, setProfileComplition] = useState(40);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [name, setName] = useState();
  const [midname, setMidName] = useState();
  const [surname, setSurName] = useState();
  const [userData, setUserData] = useState([]);
  const [payment, setPayment] = useState();
  const [email, setEmail] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [gender, setGender] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [address, setAddress] = useState();
  const [education, setEducation] = useState();
  const [profession, setProfession] = useState();
  const [sewaSamaye, setSewaSamaye] = useState();
  const [dikshaDharak, setDikshaDharak] = useState();
  const [dharakWhere, setDharakWhere] = useState();
  const [dharakDate, setDharakDate] = useState();
  const [dharakTime, setDharakTime] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [location, setLocation] = useState();
  const [fatherName, setFatherName] = useState();
  const [newPic, setNewPic] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoader, setProfileLoader] = useState(false);
  const [donationAmount, setDonationAmount] = useState(); // State for the donation amount

  const loadProfileImage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('profileImageUri');
      if (savedUri) {
        setProfileImage(savedUri);
      }
    } catch (error) {
      console.error('Error loading profile image from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  const getProfile = async () => {
    try {
      const mobile = await AsyncStorage.getItem('mobile');
      if (mobile !== null) {
        await setMobileNumber(mobile);
      }

      const postData = {
        mobileNumber: mobileNumber,
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
        try {
          const responseData = await response.json();

          const profileData = await responseData[0];

          // setUserData(profileData);
          let dynamicCompletion = 40; // Default value
          console.log(profileData, '0--0000-0-0-0-0-');
          setPayment(profileData?.payment);
          setEmail(responseData[0]?.email);
          setDateOfBirth(responseData[0]?.dob);
          setGender(responseData[0]?.gender);
          setBloodGroup(responseData[0]?.blood_group);
          setAddress(responseData[0]?.address);
          setEducation(responseData[0]?.education);
          setProfession(responseData[0]?.profession);
          setSewaSamaye(responseData[0]?.sewa_samaye);
          setDikshaDharak(responseData[0]?.diksha_dharak);
          setDharakWhere(responseData[0]?.dharakwhere);
          setDharakDate(responseData[0]?.dharakdate);
          setWhatsappNumber(responseData[0]?.whatsapp_number);
          setDharakTime(responseData[0]?.dharaktime);
          setCity(responseData[0]?.city);
          setState(responseData[0]?.state);
          setPincode(responseData[0]?.pincode);
          setLocation(responseData[0]?.location);
          setFatherName(responseData[0]?.father_name);
         
          
          
          if (profileData?.father_name && profileData?.father_name !== null) {
            setMidName(profileData?.father_name);
          }
          if (profileData?.surname && profileData?.surname !== null) {
            setSurName(profileData?.surname);
          }
          if (profileData && profileData.name) {
            await setName(profileData.name);
            dynamicCompletion += 10; // Add 10 if name is present
          }

          if (profileData && profileData.address) {
            dynamicCompletion += 20; // Add 20 if address is present
          }

          if (profileData && profileData.profile_image) {
            dynamicCompletion += 10; // Add 10 if profile image is present
            await setProfileImage(profileData.profile_image);
          }

          if (profileData && profileData.dob) {
            dynamicCompletion += 10; // Add 10 if date of birth is present
          }

          if (profileData && profileData.email) {
            dynamicCompletion += 10; // Add 10 if email is present
          }
          if (profileData  && payment === 'true') {
            dynamicCompletion = 100; // Add 10 if email is present
          }

          

          await setProfileComplition(dynamicCompletion);

          if (name || dynamicCompletion || profileImage) {
            setIsLoading(false);
          }
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
          setIsLoading(false);
        }
      } else {
        console.error('HTTP error:', response.status);
        const responseText = await response.text();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error getting mobile number from AsyncStorage:', error);
      setIsLoading(false);
    }
  };

  getProfile();

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = navigation.addListener('focus', () => {
        getProfile();
      });

      return () => {
        subscribe;
      };
    }, []),
  );

  const navigateToProfileDetails = () => {
    // Navigate to the 'ProfileDetails' screen
    navigation.navigate('ProfileDetails');
  };
  const navigateToTerms = () => {
    // Navigate to the 'ProfileDetails' screen
    navigation.navigate('Terms');
  };

  const navigateTodonationDisclaimer = () => {
    // Navigate to the 'ProfileDetails' screen
    navigation.navigate('DonationDesclaimer');
  };

  const navigateToQrCode = () => {
    navigation.navigate('QrCode');
  };

  const navigateToScanner = () => {
    navigation.navigate('Scanner', {profileImage: profileImage});
  };
  const navigateToPolicy = () => {
    // Navigate to the 'ProfileDetails' screen
    navigation.navigate('Privacy');
  };

  const navigateEvents = () => {
    // Navigate to the 'ProfileDetails' screen
    navigation.navigate('EventTopBar');
  };

  const updatePaymentStatus = async isPaid => {
    try {
      const mobile = await AsyncStorage.getItem('mobile'); // Get mobile number from storage
      const postData = {
        mobileNumber: mobile,
        payment: isPaid,
        name: name,
        middleName: midname,
        surname: surname,
        email: email,
        dob: dateOfBirth,
        gender:gender,
        blood_group: bloodGroup,
        address: address,
        education: education,
        profession: profession,
        sewa_samaye: sewaSamaye,
        diksha_dharak: dikshaDharak,
        dharakwhere: dharakWhere,
        dharakdate: dharakDate,
        whatsapp_number: whatsappNumber,
        city: city,
        state: state,
        pincode: pincode,
        location: location,
        father_name: fatherName,
        profile_image: profileImage, 

        dharaktime: dharakTime,


      };

      const response = await fetch(
        'https://shreebageshwardhamseva.com/admin/api/save-profile.php',
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
        setPayment('true');
        console.log('Payment status updated:', responseData);
      } else {
        const errorText = await response.text();
        console.error('Error updating payment status:', errorText);
        Alert.alert('Error', 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      Alert.alert('Error', 'An error occurred while updating payment status');
    }
  };

  const openPaymentGateway = (amount) => {
    if (!amount || parseInt(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount.');
      return;
    }

    const donationInPaise = (parseInt(amount) * 100).toString(); // Convert to paise

    const options = {
      description: 'Shree Bageshwar Dham Sarkar',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_live_Ub6gsriBgUFma9',
      amount: donationInPaise, // Amount in paise
      name: 'Shree Bageshwar Dham Sarkar',
      prefill: {
        email: email,
        contact: mobileNumber,
        name: name,
      },
      theme: {color: '#53a20e'},
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success
        if(amount == 111) {
          updatePaymentStatus('true');
        }
        Alert.alert('Success', `Payment ID: ${data.razorpay_payment_id}`);
        setDonationAmount('');
        setIsModalVisible(false); // Close modal after success
        
      })
      .catch((error) => {
        // Handle failure
        setIsModalVisible(false);
        Alert.alert('Error', `Error: ${error.code} | ${error.description}`);
        
      });
  };

  const showDonationModal = () => {
    setIsModalVisible(true);
  };

  const handleDonationConfirm = () => {
    if (!donationAmount || isNaN(donationAmount) || parseInt(donationAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount.');
      return;
    }
    console.log(donationAmount, 'donationAmount');
  
    // First trigger the Razorpay modal
    openPaymentGateway(donationAmount); // Proceed to payment
  
    // // Then close your custom modal after opening Razorpay
    // setIsModalVisible(false);
  };

  const openGallery = async () => {
    setProfileLoader(true);
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    await launchImageLibrary(options, async response => {
      if (!response.didCancel) {
        setNewPic(response.assets[0].uri);
        // setTimeout(() => {

        // }, 1000)
        saveProfilePic(response.assets[0].uri);
      } else {
        setIsLoading(false);
      }
    });

    setOpenModal(false);
    // setProfileLoader(false);
  };

  const openCamera = () => {
    setProfileLoader(true);
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, async response => {
      if (!response.didCancel) {
        try {
          // Save the photo URI in AsyncStorage
          await AsyncStorage.setItem('profileImageUri', response.assets[0].uri);

          // Update state to display the photo
          await setProfileImage(response.assets[0].uri);

          // Call a function to save the profile picture (if needed)
          saveProfilePic(response.assets[0].uri);
        } catch (error) {
          console.error('Error saving photo URI to AsyncStorage:', error);
          setIsLoading(false);
        }
      } else {
        // User canceled the operation
        setIsLoading(false);
      }
      setOpenModal(false);
      // setProfileLoader(false);
    });
  };

  function renderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              width: '95%',
              height: '50%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{borderRadius: 50, overflow: 'hidden', marginBottom: 20}}>
              <Button
                onPress={openCamera}
                title="Open Camera"
                style={{borderRadius: 50, overflow: 'hidden', marginBottom: 20}}
              />
            </View>
            <View
              style={{borderRadius: 50, overflow: 'hidden', marginBottom: 20}}>
              <Button onPress={openGallery} title="Open Gallery" />
            </View>
            <View style={{borderRadius: 50, overflow: 'hidden'}}>
              <Button onPress={() => setOpenModal(false)} title="Cancel" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const saveProfilePic = async newpics => {
    const apiUrl =
      'https://shreebageshwardhamseva.com/admin/api/save-profile-pic.php';

    const data = new FormData();
    data.append('mobileNumber', mobileNumber);
    data.append('profilePic', {
      name: 'profilePic.jpg',
      type: 'image/jpeg',
      uri: newpics,
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      const responseData = await response.json();

      if (responseData.success) {
        try {
          const oldImageUri = await AsyncStorage.getItem('profileImageUri');
          getProfile();
          if (oldImageUri) {
            await AsyncStorage.removeItem('profileImageUri');
          }

          AsyncStorage.setItem('profileImageUri', newPic);
          setProfileImage(newPic);
          setProfileLoader(false);
          Alert.alert('Success', 'Profile picture uploaded successfully');
        } catch (removeError) {
          console.error(
            'Error removing old image URI from AsyncStorage:',
            removeError,
          );
        }
      } else {
        // Alert.alert('Error', 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error(error);
      // Alert.alert('Error', 'Failed to upload profile picture');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('mobile');
      navigation.navigate('Login');
    } catch (exception) {}
  };

  console.log(profileLoader, '390390930930s9');

  return (
    <View
      style={styles.container}
      pointerEvents={profileLoader ? 'none' : 'auto'}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{flex: 1}}>
        {isLoading == true ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'black'} />
          </View>
        ) : null}

        <MainHeader profileImg={profileImage} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 20, top: '50%'}}
                  onPress={() => navigation.navigate('ProfileDetails')}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </TouchableOpacity>
                <View style={payment==='true'?styles.logoWrapper: styles.logoWrapper2}>
                  <TouchableOpacity onPress={() => setOpenModal(true)}>
                    {profileImage ? (
                      <>
                        {profileLoader ? (
                          <ActivityIndicator size={'large'} color={'blue'} />
                        ) : (
                          <Image
                            style={styles.logo}
                            source={{
                              uri: `${profileImage}?timestamp=${new Date().getTime()}`,
                              cache: 'reload',
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <Image
                        style={styles.logo}
                        source={require('../assets/images/dummy-avatar.jpg')}
                      />
                    )}
                    {profileComplition && (
                      <>
                        <Text style={styles.percentText}>
                          {profileComplition}%
                        </Text>
                      </>
                    )}
                    {renderModal()}
                  </TouchableOpacity>
                </View>

                <View style={styles.textWrapper}>
                  {name && (
                    <>
                      <Text style={styles.text}>
                        {(name ? name + ' ' : '') +
                          (midname ?? '') +
                          ' ' +
                          (surname ?? '')}
                      </Text>
                    </>
                  )}

                  {mobileNumber && (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={styles.text}>{mobileNumber}</Text>
                        {payment === 'true' ?
                        <View style={{width: 20, height: 20}}>
                          <Image
                            style={styles.verify}
                            source={require('../assets/icons/verify.png')}
                          />
                        </View>
                        : null}
                      </View>
                    </>
                  )}
                </View>
              </View>

              {/* <TouchableOpacity onPress={() => navigateToProfileDetails()} style={styles.touchableArea}>
                            <Image style={styles.arrowProfile} source={require('../assets/icons/pencil.png')} />
                        </TouchableOpacity> */}

              {payment === 'false' ? (
                <View style={styles.donate}>
                  <TouchableOpacity
                    onPress={()=>openPaymentGateway(111)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.donateText}>
                      <Text style={{fontWeight: '900'}}>
                        Complete Your Profile 100%{' '}
                      </Text>
                      And Get Your {'\n'} Life Time Membership ID Card By Post
                      One {'\n'}Time Fee ₹ 111
                    </Text>

                    <View
                      style={{
                        backgroundColor: '#ededed',
                        padding: 5,
                        paddingHorizontal: 0,
                      }}>
                      <Image
                        style={styles.arrow}
                        source={require('../assets/icons/right-arrow.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            {/* <TouchableOpacity onPress={() => navigateToProfileDetails()}>
                        <View style={styles.cardSmall}>
                            <View style={styles.iconViews}>
                                <Image style={styles.icons} source={require('../assets/icons/upload-file.png')} />
                                <View style={{ marginHorizontal: 5 }}>
                                    <Text style={styles.heading}>Update Profile</Text>

                                </View>

                            </View>
                            <View style={{backgroundColor:"#ededed",padding:5,paddingHorizontal:0}}>

                            <Image style={styles.arrow} source={require('../assets/icons/right-arrow.png')} />

</View>

                        </View>
                    </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigateEvents()}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/upload-file.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>Upload</Text>
                    <Text style={styles.subHeading}>Upload Event Photos</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showDonationModal}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/donate.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>To Donate</Text>
                    <Text style={styles.subHeading}>
                      Contribute Your Presence
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Donation Amount</Text>

              {/* Input for donation amount */}
              <TextInput
                style={styles.input}
                placeholder="Enter donation amount"
                keyboardType="numeric"
                onChangeText={text => setDonationAmount(text)}
                value={donationAmount}
              />

              {/* Confirm and Cancel Buttons */}
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
                <Button title="Confirm" onPress={handleDonationConfirm} />
              </View>
            </View>
          </View>
        </Modal>

            {/* Scanner */}

            <TouchableOpacity onPress={navigateToScanner}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/scanner.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>QR Code Scanner</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* My Qr code */}
            <TouchableOpacity onPress={navigateToQrCode}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/qr-code.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>My QR Code</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateTodonationDisclaimer}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/dd.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>Donation Disclaimer</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {setIsSettingOpen(true)}}>
                        <View style={styles.cardSmall}>
                            <View style={styles.iconViews}>
                                <Image style={styles.icons} source={require('../assets/icons/setting.png')} />
                                <View style={{ marginHorizontal: 5 }}>
                                    <Text style={styles.heading}>Setting</Text>
                                    <Text style={styles.subHeading}>Customize Your Setting</Text>
                                </View>

                            </View>
                            <Image style={styles.arrow} source={require('../assets/icons/right-arrow.png')} />
                        </View>
                        
                    </TouchableOpacity> */}

            <TouchableOpacity onPress={navigateToPolicy}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/privacy.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>Privacy Policy</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToTerms}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/terms.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>Terms & Conditions</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <View style={styles.cardSmall}>
                <View style={styles.iconViews}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/icons/terms.png')}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text style={styles.heading}>Logout</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ededed',
                    padding: 5,
                    paddingHorizontal: 0,
                  }}>
                  <Image
                    style={styles.arrow}
                    source={require('../assets/icons/right-arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  paddingVertical: 15,
                  fontWeight: '700',
                }}>
                Version - 0.0.4
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8F8C6',
  },
  verify: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 5,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },

  // touchableArea: {
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     alignItems: 'flex-end', // Align arrowProfile to the right
  //     justifyContent: 'center', // Center arrowProfile vertically
  // },
  card: {
    // backgroundColor: 'white',
    borderRadius: 8,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // height: 270,
    margin: 5,
  },
  cardSetting: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 270,
    margin: 5,
  },
  cardSmall: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 50,
    margin: 5,
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  arrowProfile: {
    position: 'absolute',
    top: -100,
    paddingHorizontal: 8,
    right: 30,
    width: 20,
    height: 20,
  },

  arrow: {
    width: 15,
    height: 15,
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 70,
  },
  logo2: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },

  logoWrapper: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    borderWidth: 4, // Add this line for border width
    borderRadius: 65,
    borderColor: 'red', // Add this line for border color
  },
  logoWrapper2: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    borderWidth: 4, // Add this line for border width
    borderRadius: 50,
    borderColor: 'red', // Add this line for border color
  },

  // Add a new text style for the 90% text
  percentText: {
    position: 'absolute',
    bottom: -10,
    paddingHorizontal: 8,
    left: 25,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
    borderRadius: 8,
  },

  textWrapper: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center',
  },

  donate: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: '90%',
    alignSelf: 'center',
    padding: 8,
    marginBottom: 10,
  },

  donateText: {
    textAlign: 'center',
    color: 'black',
  },

  iconViews: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    width: 25,
    height: 25,
    tintColor: 'gray',
  },
  heading: {
    fontWeight: '900',
    fontSize: 16,
    color: 'black',
  },

  subHeading: {
    fontWeight: '500',
    fontSize: 12,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the modal vertically
    alignItems: 'center', // Centers the modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    width: '80%', // Adjust width as needed
    backgroundColor: 'white', // White background
    padding: 20,
    borderRadius: 10, // Rounded corners
    elevation: 10, // For shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Space between title and input
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20, // Space between input and buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
