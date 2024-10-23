import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  ImageBackground,
} from 'react-native';
import Header from '../components/Header';
import Swiper from 'react-native-swiper';
import {red100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import MainHeader from '../components/MainHeader';
import {SafeAreaView} from 'react-native';

const Home = ({navigation}) => {
  const mobile = AsyncStorage.getItem('mobile');
  const [mobileNumber, setMobileNumber] = useState();

  const [sliderImages, setSliderImages] = useState([]);
  const [content, setContent] = useState([]);
  const [profileImage, setProfileImage] = useState();
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
            await AsyncStorage.setItem('name', profileData.name);
            if (profileData?.father_name) {
              await AsyncStorage.setItem('lastname', profileData.father_name);
            }
            if (profileData?.surname) {
              await AsyncStorage.setItem('surname', profileData.surname);
            }

            if (profileData.father_name) {
              await AsyncStorage.setItem('lastname', profileData.father_name);
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

  // useEffect(() => {
  //   // Call your getProfile function here
  //   getProfile();
  // }, []);

  // getProfile();
  // useEffect(()=>{
  //   console.log("happy1")
  // getProfile();
  // },[set,profileImage])

  const [set, setSet] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = navigation.addListener('focus', () => {
        getProfile();
        setSet(!set);
      });

      return () => {
        subscribe;
      };
    }, []),
  );

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://shreebageshwardhamseva.com/admin/api/home-slider.php')
      .then(response => response.json())
      .then(data => setSliderImages(data))
      .catch(error => console.error('Error fetching slider images:', error));
  }, []);

  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   fetch('https://shreebageshwardhamseva.com/admin/api/home-content.php')
  //     .then((response) => response.json())
  //     .then((data) => setContent(data))
  //     .catch((error) => console.error('Error fetching home content:', error));
  // }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{flex: 1}}>
        <MainHeader
          set={set}
          profileImg={profileImage}
          navigation={navigation}
        />
        <ScrollView style={{marginTop: 2}}>
          <View style={{}}>
            <View
              style={{
                backgroundColor: '#ff9933',
                borderWidth: 1,
                elevation: 3,
                borderColor: '#ff9933',
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: '#fff',
                  fontSize: 25,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                अखंड हिंदू राष्ट्र के लिए बागेश्वर धाम सरकार का वार्षिक संकल्प
              </Text>
            </View>
            <View style={styles.card}>
              {/* <Swiper
              style={styles.sliderContainer}
              showsButtons={false}
              showsPagination={true}
              paginationStyle={{ bottom: -20 }}
              activeDot={<View style={{ backgroundColor: 'black', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
              dot={<View style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
              />}

              autoplay
            > */}
              <Swiper
                key={sliderImages?.length}
                paginationStyle={{bottom: -20}}
                activeDot={
                  <View
                    style={{
                      backgroundColor: 'black',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }
                dot={
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,.2)',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }
                autoplayTimeout={5.5}
                autoplay={true}
                style={styles.wrapper}>
                {sliderImages.map((image, index) => (
                  <View style={styles.slide} key={index}>
                    <Image
                      style={styles.sliderImage}
                      source={{uri: image.image_url}}
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              marginTop: 10,
            }}>
            {/* {content.map((item, index) => ( */}
            <Text
              style={{
                fontWeight: '900',
                fontFamily: 'SHREE-DEV7-1265',
                marginBottom: 10,
                color: 'black',
                alignSelf: 'center',
                fontSize: 24,
                color: '#ff5607',
                textShadowColor: '#ffffff', // White shadow to mimic border
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 3,
              }}>
              श्री बागेश्वर धाम सरकार के विचार
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'SHREE-DEV7-3690',
                fontSize: 20,
                textAlign: 'center',
                color: '#FF0000',
                textShadowColor: '#ffffff', // White shadow to mimic border
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 3,
              }}>
              परम पुज्य श्री धरेंद्रजी कृष्ण शास्त्री इनके विचार अर्थात सनातन
              हिंदु राष्ट्र की जरुरत
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'SHREE-DEV7-3690',
                fontSize: 20,
                textAlign: 'center',
                color: '#FF0000',
                marginBottom: 5,
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 3,
              }}>
              आप सभी जनमानस को सादर प्रणाम
            </Text>
            <Text
              style={{
                color: '#7b221b',
                fontFamily: 'SHREE-DEV7-0715',
                textAlign: 'justify',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              वैदिक सनातन हिंदू धर्म ही अनादि काल से चला आ रहा है जिसकी उत्पत्ति
              के विषय में कोई प्रामाणिक तथ्य नहीं है अन्य सभी को मजहब या पंथ ही
              कहा जा सकता है जिसकी उत्पत्ति को हम उंगलियों पर गिन सकते हैं जैसे
              ईसाई धर्म 2000 वर्ष पूर्व इस्लाम धर्म तो 1400 वर्ष पूर्व कुछ
              अज्ञानी निर्लज कायरों के कारण जन्म ही है{' '}
            </Text>
            {/* <Text style={{
            marginBottom: 10,
            color: 'black',
            marginTop: 10
          }}>जैसे ईसाई धर्म 2000 वर्ष पूर्व इस्लामी धर्म तो 1400 वर्ष पूर्व कुछ अज्ञानी निर्लज कारों के कारण जन्मा है ।</Text> */}
            <Text
              style={{
                fontWeight: '600',
                color: '#7b221b',
                fontFamily: 'SHREE-DEV7-0715',
                textAlign: 'justify',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              ‘‘ना छोड़ी जीने की आशा नमन का मर्म बदला है।
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: '#7b221b',
                fontFamily: 'SHREE-DEV7-0715',
                textAlign: 'justify',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              {' '}
              ना रहते जाति के मद में ना अपना कर्म बदला है।
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: '#7b221b',
                fontFamily: 'SHREE-DEV7-0715',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              जिसे थे रामप्यारे आज वो है गर्व से हिंदू।
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: '#7b221b',
                fontFamily: 'SHREE-DEV7-0715',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              {' '}
              जिसे था मोह प्राणों का उसी ने धर्म बदला है।"
            </Text>

            <Text
              style={{
                marginBottom: 10,
                color: '#7b221b',
                marginTop: 10,
                fontFamily: 'SHREE-DEV7-0715',
                textAlign: 'justify',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              लेकिन तत्कालीन समय में तमाम राजनीतिक दल के नेताओं द्वारा वोट बैंक
              के तुष्टीकरण के लिए सनातन धर्म के विरुद्ध ऊंट पटांग बयान बाजी और
              कार्य किया जा रहे हैं मिशनरी और कट्टरपंथियों द्वारा दलित आदिवासी
              और गरीब हिंदुओं का तेजी से धर्मांतरण किया जा रहा है जिससे हिंदू की
              आबादी में कमी और ईसाई व मुसलमानों की आबादी असीमित मात्रा में बढ़ती
              जा रही है, कश्मीर के इतिहास का काला अध्याय 1990 के कत्लेआम हिंदू
              का मारा जाना आदि के माध्यम से हम यह समझ सकते हैं की नित्य निरंतर
              हिंदू धर्म का शोषण अपमान और तिरस्कार ही किया गया है, इसलिए वर्तमान
              समय में राजनीतिक और सामाजिक गतिविधियों को देखते हुए बागेश्वर धाम
              के पीठाधीश्वर श्री धीरेंद्र कृष्ण शास्त्री जी ने सनातन धर्म के
              प्रचार प्रसार व संरक्षण के लिए अखंड हिंदू राष्ट्र की परिकल्पना के
              आधार पर वार्षिक संकल्प लिया है, जिसमें गौशाला निर्माण, रक्तदान
              शिबिर, जरूरतमंद के लिए अन्नपूर्णा भोजनालय, प्रतिवर्ष गरीब कन्याओं
              का सामुहिक विवाह करना आदि की शुरुआत के साथ हिंदू धर्म के संरक्षण
              और सुविधा हेतु श्री धीरेंद्र कृष्ण शास्त्री जी द्वारा चलाए जा रहे
              अखंड हिंदू राष्ट्र अभियान में सदस्यता ग्रहण हिंदू राष्ट्र बनाने
              में तन मन धन से सहयोग करते हुए अपने हिंदू होने पर गर्व करना चाहिए,
              क्योंकि,
            </Text>

            {/* 
          <Text style={{
            fontWeight: '700',
            color: 'black',

          }}>* पालघर हत्याकांड 16 अप्रैल 2000 में महाराष्ट्र के पालघर में साधुओं का मारा जाना</Text> */}
            {/* <Text style={{
            fontWeight: '700',
            marginBottom: 10,
            color: 'black',
            marginTop: 10
          }}>* तमिलनाडु सरकार के मुख्यमंत्री के बेटे वह मंत्री उदय नीति स्टालिन का सनातन धर्म पर शर्मनाक बयान</Text> */}
            {/* <Text style={{
            fontWeight: '700',
            color: 'black',

          }}>* हिंदुत्व की विचारधारा पौराणिक ग्रंथ रामचरितमानस जैसे मर्यादित जीवन जीने की मार्गदर्शिका को नफरत बांटने वाला ग्रंथ  बताना आदिशक्ति मां दुर्गा के अस्तित्व पर सवाल उठाना </Text> */}
            {/* <Text style={{
            fontWeight: '800',
            marginBottom: 10,
            color: 'black',
            marginTop: 10
          }}>* धर्म परिवर्तन स्वामी प्रसाद मौर्य ईसाई मिशनरी और इस्लाम में कट्टर पंक्तियों द्वारा दलित आदिवासी व गरीब हिंदुओं का तेजी से धर्मांतरण किया जा रहा है जिस हिंदू की आबादी में कमी और मुसलमान इसी की आबादी में असीमित मंत्र मात्रा में बढ़ोतरी</Text> */}
            {/* <Text style={{
            fontWeight: '700',
            color: 'black',

          }}>* केरल में हिंदुओं का धर्मांतरण  32000 महिलाओं का धर्मांतरण करने और आतंकी संगठन आईएसआईएस में शामिल करने की कहानी बहु प्रतिष्ठित फिल्म डी केरल स्टोरी सामने आने के बाद सवाल पूरे देश में पूछा जा रहा है</Text> */}

            {/* <Text style={{
            marginBottom: 10,
            color: 'black',
            marginTop: 10
          }}>गौ संरक्षण भारत के 20 राज्यों में गौ हत्या पूरी तरीके से अवैध है गुजरात जैसे राज्य में गौ हत्या करने वालों को उम्र कैद की सजा हो सकती है ऐसे सख्त कानून होने के बावजूद भी बहुत सारे राज्य में चोरी चुपके बीफ निर्यात धडले बाजी से किया जा रहा है जो हिंदू के आस्था का सीधा अपमान है ।</Text>
 */}

            {/* <Text style={{
            marginBottom: 10,
            color: 'black',

          }}>कश्मीर के इतिहास का काला अध्याय 1990 के कटले आम हिंदू का मर जाना आदि के माध्यम से हम यह समझ सकते हैं की नित्य निरंतर हिंदू धर्म का शोषण अपमान और तिरस्कार ही किया गया है इसलिए वर्तमान समय में राजनीतिक और सामाजिक गतिविधियों को देखते हुए बागेश्वर धाम के पीठ आदिश्वर श्री धीरेंद्र कृष्ण शास्त्री जी ने सनातन धर्म के प्रचार प्रसार व संरक्षण के लिए अखंड हिंदू राष्ट्र की परिकल्पना के आधार पर वार्षिक संकल्प लिया जिसमें गौशाला निर्माण रक्तदान शिविर जरूरतमंदों के लिए अन्नपूर्णा भोजनालय प्रतिवर्ष गरीब कन्याओं का सामूहिक विवाह करना आदि सम्मिलित है आज विदेश में रहने वाले मुसलमान को भारत में रहने वाला एक मुसलमान भाई मानता है उसके लिए सड़क पर उतर जाता है पर हम एक साथ एक देश में निवास करने वाले हिंदू अपने भाई के प्रति ऐसी भावना नहीं रख पाते इसलिए हमारा शोषण व अपमान किया जा रहा है अतः हम सभी हिंदू भाइयों कोश्री धीरेंद्र कृष्ण शास्त्री जी द्वारा चलाए जा रहे हिंदू राष्ट्र अभियान में सदस्यता ग्रहण कर हिंदू राष्ट्र बनाने में तन मन धन से सहयोग करें  क्योंकि!</Text> */}

            <Text
              style={{
                fontWeight: '600',
                color: '#7b221b',
                fontFamily: 'SHREE-DEV7-0715',
                textAlign: 'justify',
                textShadowColor: '#ffffff',
                textShadowOffset: {width: 3, height: 0},
                textShadowRadius: 1,
                fontWeight: 'bold',
              }}>
              ‘‘सत्य के हेतु प्राण त्याग दे हरिश्चंद्र भी हिंदू थे। मर्यादा
              जन्मी थी जिसे रामचंद्र भी हिंदू थे। इतिहास के पन्ने पलटोगे तो
              हिंदू हिंदू पाओगे।{'\n'}
              हिंदू धर्म नहीं होगा इतिहास कहां से लाओगे।। जन्मी जिससे सभी सभ्यता
              हिंदू मानो माता है। पाप को हरने विश्व विधाता इसी धर्म में आता है।
              {'\n'}
              बना केंद्र जो समय चक्र का उसी केंद्र का बिंदु हूं । छाती ठोक के
              कहो गर्व से मैं भारत का हिंदू हूं।।’’
            </Text>
            {/* <Text style={{
            fontWeight: '600',
            color: 'black',

          }}>इतिहास के पन्ने पल्टो गए तो हिंदू हिंदू पाओगे ।</Text> */}
            {/* <Text style={{
            fontWeight: '600',
            color: 'black',

          }}>हिंदू धर्म नहीं होगा इतिहास कहां से लाओगे ।</Text> */}
            {/* <Text style={{
            fontWeight: '600',
            color: 'black',

          }}>बना केंद्र जो समय चक्र का उसी केंद्र का बिंदु हूं ।</Text> */}
            {/* <Text style={{
            fontWeight: '600',
            color: 'black',

          }}>छाती ठोक के कहो गर्व से मैं भारत का हिंदू हूं।</Text> */}
            {/* <Text style={{
            fontWeight: '900',
            marginTop: 10,
            color: 'black',


          }}>भारत माता की जय। हिंदू सनातन धर्म की जय ।श्री धीरेंद्र कृष्ण शास्त्री जी महाराज की जय। श्री बागेश्वर धाम सरकार की जय। जय श्री सीताराम।</Text> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Home;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {height: 450, marginTop: -20},
  container: {
    flex: 1,
    // backgroundColor: '#F8F8C6',
  },
  sliderContainer: {
    height: 280,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // /marginTop:-55
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
   // height: 410,
    marginVertical: 0,
  },
});
