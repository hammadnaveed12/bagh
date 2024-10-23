import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../components/Header';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scaler from '../components/scaler';
import {useFocusEffect} from '@react-navigation/native';
import MainHeader from '../components/MainHeader';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import ViewShot from 'react-native-view-shot';

const Greetings = ({navigation}) => {
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [set, setSet] = useState(false);
  const viewShotRefs = useRef([]);

  useEffect(() => {
    try {
      // Fetch data from the API when the component mounts
      fetch('https://shreebageshwardhamseva.com/admin/api/greetings.php')
        .then(response => response.json())
        .then(data => {setSliderImages(data)
          console.log(data, 'data')
        })
        .catch(error => console.error('Error fetching slider images:', error));
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
    } finally {
      setIsLoding(false);
    }
  }, []);

  // useEffect(() => {
  //   // Call your getProfile function here
  //   getProfile();
  // }, []);

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

  const handleShare = async img => {
    const image = img;
    const cropRegion = {x: 0, y: 0, height: 840, width: 770};
    const targetSize = {height: 400, width: 400, resizeMode: 'contain'};
    if (img) {
      try {
        await RNPhotoManipulator.optimize(image, 90).then(path => {
          Share.open({url: path});
        });
      } catch (error) {}
    }
  };

  const handlePersonalize = imageUrl => {
    RNPhotoManipulator.optimize(imageUrl, 90).then(path => {
      navigation.navigate('Personalize', {imageUrl: path});
    });
  };

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
            if (profileData.father_name) {
              await AsyncStorage.setItem('lastname', profileData.father_name);
            }

            await AsyncStorage.setItem('name', profileData.name);
            if (profileData?.father_name) {
              await AsyncStorage.setItem('lastname', profileData.father_name);
            }
            if (profileData?.surname) {
              await AsyncStorage.setItem('surname', profileData.surname);
            }

            await AsyncStorage.setItem('img', profileData?.profile_image);

            // await setName(profileData.name);
            // await setProfileComplition(profileData.profile_completion);
            await setProfileImage(`${profileData?.profile_image}`);
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

  getProfile();

  // getProfile();
  // useEffect(()=>{
  //   console.log("happy1")
  // getProfile();
  // },[set,profileImage])
  const [fname, setFname] = useState('');
  useEffect(async () => {
    let name = await AsyncStorage.getItem('name');
    let last = await AsyncStorage.getItem('lastname');
    let surname = await AsyncStorage.getItem('surname');
    setFname(name + ' ' + surname);
  }, []);

  console.log(sliderImages, '0-0-0-');
  const [catlist, setCatList] = useState();

  useEffect(() => {
    let arr = [];
    sliderImages?.map(ite => {
      if (!arr.includes(ite?.category)) {
        arr.push(ite?.category);
      }
    });

    setCatList(arr);
  }, [sliderImages]);

  const [date, setdate] = useState('All');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{flex: 1}}>
        {isLoding == true ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'orange'} />
          </View>
        ) : null}
        <MainHeader
          set={set}
          profileImg={profileImage}
          navigation={navigation}
        />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View
            style={{
              flexDirection: 'row',
              height: scaler(60),
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => setdate('All')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: date == 'All' ? 'black' : '#fff',
                width: scaler(80),
                marginLeft: scaler(10),
                height: scaler(35),
                borderRadius: scaler(20),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: date == 'All' ? '#fff' : 'orange',
                }}>
                {'All'}
              </Text>
            </TouchableOpacity>
            {catlist?.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => setdate(item)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: scaler(10),
                    backgroundColor: date == item ? 'black' : '#fff',
                    marginLeft: scaler(10),
                    height: scaler(35),
                    borderRadius: scaler(10),
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: date == item ? '#fff' : 'orange',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View style={{height: scaler(10)}} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View>
              {sliderImages.map((image, index) => {
                return (
                  <>
                    {date !== 'All' ? (
                      date == image?.category && (
                        <View key={index}>
                          <View style={styles.card}>
                            <ViewShot ref={el => (viewShotRefs.current[index] = el)} style={{flex: 1}}>
                              <Image
                                style={styles.sliderImage}
                                resizeMode="contain"
                                source={{uri: image.image_url}}
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
                                    source={{
                                      uri: profileImage,
                                      cache: 'reload',
                                    }}
                                  />
                                </View>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: 'red',
                                  }}>
                                  {fname}
                                </Text>
                              </View>
                            </ViewShot>
                          </View>
                          {/*<View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.cardSmall} onPress={() => handlePersonalize(image.image_url)}>
                    <View style={styles.iconViews}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.heading}>Personalize</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cardSmall}
                    onPress={() => handleShare(image.image_url)}
                  >
                    <View style={styles.iconViews}>
                      <Image style={styles.icons} source={require('../assets/icons/share.png')} />
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.heading}>Share</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View> */}
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginVertical: scaler(10),
                              marginHorizontal: scaler(20),
                            }}>
                            <TouchableOpacity
                              onPress={() => handlePersonalize(image.image_url)}
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                width: '45%',
                                height: scaler(40),
                                borderRadius: scaler(10),
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '500',
                                  color: 'black',
                                }}>
                                Personalize
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={async () => {
                                try {
                                  const uri =
                                    await viewShotRefs.current[index].capture();
                                    console.log(uri, 'uri')
                                  await Share.open({url: uri});
                                } catch (error) {
                                  console.error(
                                    'Error capturing screenshot:',
                                    error,
                                  );
                                }
                              }}
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                width: '45%',
                                height: scaler(40),
                                borderRadius: scaler(10),
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  style={styles.icons}
                                  source={require('../assets/icons/share.png')}
                                />
                                <View style={{width: scaler(20)}} />
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    color: 'black',
                                  }}>
                                  Share
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    ) : (
                      <View key={index}>
                        <View style={styles.card}>
                          <ViewShot ref={el => (viewShotRefs.current[index] = el)} style={{flex: 1}}>
                            <Image
                              style={styles.sliderImage}
                              resizeMode="contain"
                              source={{uri: image.image_url}}
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 20,
                                left: 10,
                              }}>
                              {/* <Image style={{height:50,width:50}} resizeMode='contain' source={{ uri: profileImage }} /> */}
                              <View style={styles.logoWrapper}>
                                <Image
                                  style={styles.logo}
                                  source={{uri: profileImage, cache: 'reload'}}
                                />
                              </View>
                              <Text
                                style={{
                                  fontSize: 17,
                                  fontWeight: '700',
                                  color: 'red',
                                }}>
                                {' '}
                                {fname}
                              </Text>
                            </View>
                          </ViewShot>
                        </View>
                        {/*<View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.cardSmall} onPress={() => handlePersonalize(image.image_url)}>
                    <View style={styles.iconViews}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.heading}>Personalize</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cardSmall}
                    onPress={() => handleShare(image.image_url)}
                  >
                    <View style={styles.iconViews}>
                      <Image style={styles.icons} source={require('../assets/icons/share.png')} />
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.heading}>Share</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: scaler(10),
                            marginHorizontal: scaler(20),
                          }}>
                          <TouchableOpacity
                            onPress={() => handlePersonalize(image.image_url)}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#fff',
                              width: '45%',
                              height: scaler(40),
                              borderRadius: scaler(10),
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: 'black',
                              }}>
                              Personalize
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={async () => {
                              try {
                                const uri = await viewShotRefs.current[index].capture();
                                console.log(uri, 'uri')
                                await Share.open({url: uri});
                              } catch (error) {
                                console.error(
                                  'Error capturing screenshot:',
                                  error,
                                );
                              }
                            }}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#fff',
                              width: '45%',
                              height: scaler(40),
                              borderRadius: scaler(10),
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                style={styles.icons}
                                source={require('../assets/icons/share.png')}
                              />
                              <View style={{width: scaler(20)}} />
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '500',
                                  color: 'black',
                                }}>
                                Share
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Greetings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8F8C6',
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
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 8,

    // Add border radius to match the card
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 400,
    margin: 5,
    overflow: 'hidden', // Clip child elements to the rounded border
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
