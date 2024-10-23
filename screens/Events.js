import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../components/MainHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native-elements';
import scaler from '../components/scaler';

const Events = () => {

  const [events, setEvents] = useState([])
  const [profileImage, setProfileImage] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  useEffect(() => {
    try {

      // Fetch data from the API when the component mounts
      fetch('https://shreebageshwardhamseva.com/admin/api/events.php')
        .then((response) => response.json())
        .then((data) => {
          setEvents(data)
        })
        .catch((error) => console.error('Error fetching slider images:', error));

    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);

    }

  }, []);


  const getProfile = async () => {
    try {
        const mobile = await AsyncStorage.getItem('mobile');

        if (mobile !== null) {
            await setMobileNumber(mobile);
        }
console.log(mobile,"[][][][][s][][")
        const postData = {
            mobileNumber: mobile,
        };

        const response = await fetch('https://shreebageshwardhamseva.com/admin/api/get-profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            try {
                const responseData = await response.json();
                const profileData = await responseData[0];
                 
                if (profileData && profileData.name) {
                    await setProfileImage(`${profileData?.profile_image}`);
                
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

const [set,setSet]=useState(false)
const navigation=useNavigation();

  return (
    <View>
      <MainHeader set={set} profileImg={profileImage} navigation={navigation} />
      <SafeAreaView>
        <View style={styles.container}>

          <Text style={{ color: "black", textAlign: "center", fontSize: 24, fontWeight: "700", marginVertical: 15 }}>List Of Active Events</Text>

          <View>
            {events.map((event, index) => {
              console.log(event,"0-0-0-000-")
              return(
               event?.status=="1"&& <View>
                  {/* <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                 {/* <Image  source={{uri:event?.image_url}} style={{height:100,width:100,borderRadius:10}} resizeMode="contain"/> */}
             {/* </View> */} 

              <TouchableOpacity onPress={()=>{
                navigation.navigate('UploadEvent',{
                  id:event?.id,
                  img:event?.image_url,
                  name:event.event_title
                })
              }} key={index} style={{ padding: 15 ,marginBottom: 10,borderRadius:10,backgroundColor:"#fc4f00"}}>
                <View >
                <Text style={{ color: "black", fontSize: 21,color:"#fff",textAlign:"center", }}>{event.event_title}</Text>
                  <Text style={{ color: "black", fontSize: 14,marginTop:3,color:"#fff",textAlign:"center" }}>By {event.name}</Text>

                </View>
              </TouchableOpacity>
              </View>
            )})}

          </View>
        </View>
      </SafeAreaView>
    </View>


  )
}

export default Events

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 25,
  },


})