import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect, useFocusEffect} from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';
import MainHeader from '../components/MainHeader';
import useGetMediaListQuery from '../components/useGetMediaListQuery';
import {Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const Reels = ({navigation}) => {
  const [profileImage, setProfileImage] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const handleShare = url => {
    Share.share({
      message: `https://www.youtube.com/watch?v=${url}`,
      url: `https://www.youtube.com/watch?v=${url}`, // Replace with your actual video URL
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
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

  // useEffect(() => {
  //   // Call your getProfile function here
  //   getProfile();
  // }, []);

  // getProfile();
  // useEffect(()=>{
  //   console.log("happy1")
  // getProfile();
  // },[set,profileImage])

  const {data: reeling, isLoading} = useGetMediaListQuery();

  useEffect(() => {
    const fetchLikesData = async () => {
      const likesPromises = reeling?.map(async videoId => {
        try {
          const response = await Axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId?.url}&key=AIzaSyCS_oBgjL5mVVN0WiBEMyoqgZVUKFPuGPc&part=snippet,contentDetails,statistics,status`,
          );

          if (response.data.items.length > 0) {
            const likes = response.data.items[0].statistics.likeCount;
            const view = response.data.items[0].statistics.viewCount;
            return {videoId, likes, view};
          } else {
            return {videoId, likes: 'Video not found'};
          }
        } catch (error) {
          console.error(
            `Error fetching YouTube likes for video ${videoId}:`,
            error,
          );
          return {videoId, likes: 'Error fetching data'};
        }
      });

      Promise.all(likesPromises).then(likesResults => {
        console.log(likesResults, '0-0--000000-0-0-0-0-0-00-');
        setLikesData(likesResults);
      });
    };

    fetchLikesData();
  }, [reeling]);

  const renderVideoCard = ({item: url, index}) => {
    return (
      <View style={styles.card} key={index}>
        <YoutubeIframe
          height={140}
          width="100%"
          videoId={url?.url}
          style={styles.iframe}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.container}>
          <MainHeader profileImg={profileImage} navigation={navigation} />
          <ScrollView contentContainerStyle={{paddingBottom: 20}}>
            <View style={{paddingVertical: 10}}>
              <Text style={{fontSize: 18, color: 'blue', marginLeft: 8}}>
                Reels
              </Text>
              {reeling?.length > 0 ? (
                <FlatList
                  data={reeling}
                  renderItem={renderVideoCard}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingHorizontal: 10}}
                />
              ) : (
                <Text style={styles.noMediaText}>No media found</Text>
              )}
            </View>
            <View style={styles.infoSection}>
              <View style={{width: '48%'}}>
                <View style={styles.infoCard}>
                  <Image
                    source={require('../assets/images/media.jpg')}
                    style={styles.infoImage}
                  />
                  <Text style={styles.infoTitle}>आगामी कार्यक्रम</Text>
                </View>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#FF0000',
                      textShadowColor: '#ffffff',
                      textShadowOffset: {width: 3, height: 0},
                      textShadowRadius: 1,
                      fontWeight: 'bold',
                    }}>
                    मंगलवार दरबार
                  </Text>

                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 16,
                      fontWeight: '400',
                      paddingTop: 10,
                      color: '#8B4513',
                      textShadowColor: '#ffffff',
                      textShadowOffset: {width: 3, height: 0},
                      textShadowRadius: 1,
                      fontWeight: 'bold',
                    }}>
                    बालाजी महाराज की कृपा से बागेश्वर बालाजी महाराज की पैठ के
                    लिए जिन भक्तों की अर्जी लगती है, उन्हें हर मंगलवार को बालाजी
                    महाराज के दरबार में विशेष रूप से आमंत्रित किया जाता है और
                    महाराजश्री की सान्निधि में अपनी अर्जी पूरी करती होती है। इस
                    दिन ही धाम में प्रेत दरबार भी लगाया जाता है।
                  </Text>
                </View>
                <View style={styles.infoCard}>
                  <Image
                    source={require('../assets/images/media2.jpg')}
                    style={styles.infoImage}
                  />
                  <Text style={styles.infoTitle}>आगामी कार्यक्रम</Text>
                </View>
              </View>

              <View style={{width: '48%'}}>
                <View style={styles.infoCard}>
                  <Image
                    source={require('../assets/images/media.jpg')}
                    style={styles.infoImage}
                  />
                  <Text style={styles.infoTitle}>गुरुदेव के बारे में</Text>
                </View>
                <View style={{padding: 8}}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#FF0000',
                      textShadowColor: '#ffffff',
                      textShadowOffset: {width: 3, height: 0},
                      textShadowRadius: 1,
                      fontWeight: 'bold',
                    }}>
                    सरस राष्ट्रीय कथा व्यास
                  </Text>

                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 16,
                      fontWeight: '400',
                      paddingTop: 10,
                      color: '#8B4513',
                      textShadowColor: '#ffffff',
                      textShadowOffset: {width: 3, height: 0},
                      textShadowRadius: 1,
                      fontWeight: 'bold',
                    }}>
                    श्री बालाजी महाराज के अनन्य भक्त एवं संचालक बाबा के कृपा
                    पात्र और बागेश्वर धाम के पीठाधीश्वर परम पूज्य धीरेंद्र कृष्ण
                    शास्त्री जी के श्रीमुख से होने वाली कथा का मुख्य उद्देश्य
                    है, दुनिया में सनातन परंपरा का प्रचार-प्रसार करना एवं समस्त
                    लोककल्याण, सार्वभौमिक शांति, सत्य, धर्म और करूणा का संदेश
                    फैलाना है...
                  </Text>
                </View>
                <View style={{padding: 8}}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#FF0000',
                      textShadowColor: '#ffffff',
                      textShadowOffset: {width: 3, height: 0},
                      textShadowRadius: 1,
                      fontWeight: 'bold',
                    }}>
                    टोका वितरण
                  </Text>

                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 16,
                      fontWeight: '400',
                      paddingTop: 10,
                      color: '#8B4513',
                      textShadowColor: '#ffffff',
                      textShadowOffset: {width: 3, height: 0},
                      textShadowRadius: 1,
                      fontWeight: 'bold',
                    }}>
                    बागेश्वर धाम के दरबार में लगने वाली अर्जी, पुज्य महाराज से
                    मिलने, उससे संबंधित और मार्गदर्शन लेने बिल्कुल निःशुल्क है।
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </ImageBackground>
  );
};

export default Reels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  card: {
    width: 250, // Adjust width as necessary, or set to '100%' for full width
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  iframe: {
    width: '100%', // Ensure the iframe takes the full width of the card
  },
  noMediaText: {
    color: 'black',
    textAlign: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: '#ffeccb',
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoImage: {
    width: '100%',
    height: 150, // Adjust height as needed
    borderRadius: 5,
  },
  infoTitle: {
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    color: '#feaa27',
    textShadowColor: '#ffffff',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 1,
  },
  infoText: {
    marginTop: 5,
    textAlign: 'justify',
  },
  additionalInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  additionalText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
