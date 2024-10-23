import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  ImageBackground
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import Share from 'react-native-share';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';
import ViewShot from 'react-native-view-shot';
import {TextInput} from 'react-native-gesture-handler';
import {stat} from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import scaler from '../components/scaler';
import MainHeader from '../components/MainHeader';
const Personalize = ({route,navigation}) => {
  const {imageUrl} = route.params;
  const [manipulatedImagePath, setManipulatedImagePath] = useState(null);
  const [mobileNumber, setMobileNumber] = useState();
  const [lastname, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [profileLoader, setProfileLoader] = useState(false);
  const [newPic, setNewPic] = useState();

  const viewShotRef = useRef();

  const getProfile = async () => {
    try {
      const mobile = await AsyncStorage.getItem('mobile');

      if (mobile !== null) {
        await setMobileNumber(mobile);
      }

      const postData = {
        mobileNumber: mobile,
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

          if (profileData && profileData.name) {
            console.log(profileData, '-=-=-=-=-==');

            await AsyncStorage.setItem('name', profileData.name);
            if (profileData?.father_name) {
              await AsyncStorage.setItem('lastname', profileData.father_name);
            }
            if (profileData?.surname) {
              await AsyncStorage.setItem('surname', profileData.surname);
            }

            await AsyncStorage.setItem('img', profileData?.profile_image);
            console.log(profileData, '0-0-0-0-0');
            setLastName(profileData?.father_name);
            // await setName(profileData.name);
            // await setProfileComplition(profileData.profile_completion);
            await setProfileImage(`${profileData?.profile_image}`);
            loadProfileImage();
            // setSet(!set)
          }

          if (profileImage) {
            // setIsLoading(false);
          }
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
        }
      } else {
        console.error('HTTP error:', response.status);
        const responseText = await response.text();
      }
    } catch (error) {
      console.error('Error getting mobile number from AsyncStorage:', error);
    }
  };

  const loadProfileImage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('profileImageUri');
      if (savedUri) {
        setProfileImage(savedUri);
      }
    } catch (error) {
      console.error('Error loading profxile image from AsyncStorage:', error);
    }
  };

  // useEffect(() => {
  //   getProfile();

  // }, []);

  const image = imageUrl;

  useEffect(() => {
    manipulateImage();
  }, []);

  const manipulateImage = async () => {
    let name = await AsyncStorage.getItem('name');
    let last = await AsyncStorage.getItem('lastname');
    let surname = await AsyncStorage.getItem('surname');
    let fname = '';
    if (name !== null) {
      fname += name;
    }
    if (last !== null) {
      fname += ' ' + last;
    }
    if (surname !== null) {
      fname += ' ' + surname;
    }
    let img = await AsyncStorage.getItem('img');
    (async () => {
      try {
        const responsedd = await ImageResizer.createResizedImage(
          img,
          128,
          128,
          'PNG',
          10,
          0,
          undefined,
          false,
          {
            mode: 'contain',
          },
        );

        const texts = [
          {
            position: {x: 200, y: 710},
            text: fname,
            textSize: 30,
            color: 'red',
            thickness: 2,
          },
        ];
        // Print text on the image
        RNPhotoManipulator.printText(image, texts).then(textImagePath => {
          // Overlay an image on the image with printed text
          const overlay = responsedd.uri;
          const position = {x: 50, y: 650};

          RNPhotoManipulator.overlayImage(
            textImagePath,
            overlay,
            position,
          ).then(finalImagePath => {
            setManipulatedImagePath(finalImagePath);
          });
        });
        // Handle the response as needed
      } catch (err) {}
    })();
  };

  const shareImage = async () => {
    if (manipulatedImagePath) {
      try {
        await Share.open({url: manipulatedImagePath});
      } catch (error) {}
    }
  };

  const [fnames, setFnames] = useState('');
  useEffect(async () => {
    let name = await AsyncStorage.getItem('name');
    let last = await AsyncStorage.getItem('lastname');
    let surname = await AsyncStorage.getItem('surname');
    setFnames(name + ' ' + last + ' ' + surname);
  }, []);

  const [states, setStates] = useState('');
  getProfile();

  const saveProfilePic = async newpics => {
    console.log('jjjdjkjdkjdk');
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
      console.log(responseData, '-=-=-======+++++0--0--0-0');
      if (responseData.success) {
        try {
          console.log(responseData, '-==-=-=-=--');
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
        console.log('jjjjjjamana');
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

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{flex: 1}}>
      <ScrollView>
        <MainHeader
          profileImg={profileImage}
          // title="श्री बागेश्वर धाम सरकार"
          // profilePic="../assets/images/splash.jpg"
          navigation={navigation}
        />
        <View style={styles.card}>
          <ViewShot ref={viewShotRef} style={{flex: 1}}>
            <Image
              style={{height: 400, width: scaler(370)}}
              resizeMode="contain"
              source={{uri: imageUrl}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom: 20,
                left: 10,
              }}>
              <View style={styles.logoWrapper}>
                <Image
                  style={styles.logo}
                  source={{uri: profileImage, cache: 'reload'}}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 17, fontWeight: '700', color: 'red'}}>
                  {fnames}
                </Text>
                <Text style={{fontSize: 17, fontWeight: '700', color: 'red'}}>
                  {states}
                </Text>
              </View>
            </View>
          </ViewShot>
        </View>
        <TouchableOpacity
          onPress={async () => {
            try {
              const uri = await viewShotRef.current.capture();
              await Share.open({url: uri});
            } catch (error) {
              console.error('Error capturing screenshot:', error);
            }
          }}
          style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Share Image</Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={e => setStates(e)}
          placeholderTextColor={'black'}
          placeholder="Enter Title"
          style={{
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            color: 'black',
          }}
        />
        <TouchableOpacity
          onPress={() => setOpenModal(true)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: 'orange',
            marginHorizontal: 100,
            height: 50,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 17, fontWeight: '700', color: '#ffff'}}>
            Change Image
          </Text>
        </TouchableOpacity>

        {renderModal()}
        {/* {manipulatedImagePath && (
        <Image
          style={styles.sliderImage}
          source={{ uri: manipulatedImagePath }}
          onError={(e) => console.error('Image load error:', e.nativeEvent.error)}
        />
      )} */}
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Personalize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8C6',
  },
  downloadButton: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  card: {
   
    borderRadius: 8,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 400,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cardSmall: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 35,
    margin: 5,
    marginTop: 5,
    marginBottom: 25,
    flex: 1,
    paddingHorizontal: 10,
    width: '50%',
  },
  iconViews: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    width: 20,
    height: 20,
  },
  heading: {
    fontWeight: '500',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
  },
  sliderImage: {
    width: '99%',
    flex: 1,
    resizeMode: 'contain',
  },
  logoWrapper: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    // borderWidth: 4, // Add this line for border width
    // borderRadius: 50,
    // borderColor: 'red', // Add this line for border color
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
});
