import React,{useState} from "react";
import { Text,View,SafeAreaView,TouchableOpacity,StyleSheet ,Image,Modal,Button, ScrollView, Alert, ActivityIndicator} from "react-native";
import MainHeader from "../components/MainHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import scaler from '../components/scaler';
import useGetEventListQuery from "../components/useGetEventListQuery";
import { queryClient } from "../App";
import {EVENT_IAMGE_LIST_QUERY_KEY} from "../components/useGetEventListQuery";
function UploadEvent(){
    const [profileImage, setProfileImage] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [profileLoader,setProfileLoader]=useState(false)

    const route=useRoute();
    console.log(route?.params?.id,route?.params?.img,"-=-=-=-=-=")
    const navigation=useNavigation();
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
    
    const {data:imageList}=useGetEventListQuery(route?.params?.id??'');

    console.log(imageList,"====0=0-9089738636573556767")

    getProfile();
    
    const [set,setSet]=useState(false)

    const PostEventImg = async (newpics,name) => {
     
        const apiUrl = 'https://shreebageshwardhamseva.com/admin/actions/events_image.php';
      
        const data = new FormData();
        data.append('id',route?.params?.id);
        data.append('event_image', {
            name: name,
            type: 'image/jpeg',
            uri:    newpics,
        });
      
      
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data,
            });
      
            const responseData =  response;
            Alert.alert("Image Uploaded Successfully")
        setProfileLoader(false);

            // queryClient?.refetchQueries(EVENT_IAMGE_LIST_QUERY_KEY(route?.params?.id??''))
            if (responseData.success) {
                try {
                    console.log("mananannanan")
                    queryClient?.refetchQueries(EVENT_IAMGE_LIST_QUERY_KEY(route?.params?.id??''))
                    console.log(responseData,"-==-=-=-=--")
                    
                } catch (removeError) {
                    console.error('Error removing old image URI from AsyncStorage:', removeError);
                }
            } else {
                // Alert.alert('Error', 'Failed to upload profile picture');
        setProfileLoader(false);

            }
        } catch (error) {
            console.error(error);
            // Alert.alert('Error', 'Failed to upload profile picture');
        setProfileLoader(false);

        }
      };


    function renderModal() {
        return (
            <Modal visible={openModal} animationType='slide' transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 10, width: '95%', height: '50%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ borderRadius: 50, overflow: 'hidden', marginBottom: 20 }}>
                            <Button onPress={openCamera} title='Open Camera' style={{ borderRadius: 50, overflow: 'hidden', marginBottom: 20 }} />
                        </View>
                        <View style={{ borderRadius: 50, overflow: 'hidden', marginBottom: 20 }}>
                            <Button onPress={openGallery} title='Open Gallery' />
                        </View>
                        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
                            <Button onPress={() => setOpenModal(false)} title='Cancel' />
                        </View>
                    </View>
                </View>
      
            </Modal >
        )
      }

      const openGallery = async () => {
        setProfileLoader(true);
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        };
      
        await launchImageLibrary(options, async (response) => {
            if (!response.didCancel) {
                // setNewPic(response?.assets[0].uri);
                // setTimeout(() => {
                    // console.log(response?.assets?.[0]?.fileName,"-=-=-=-==-=-=-")
                    PostEventImg(response.assets[0].uri,response?.assets?.[0]?.fileName)
                // }, 1000)
                // console.log("jjjjjjamana")
                // saveProfilePic(response.assets[0].uri);
            } else {
                // setIsLoading(false);
        setProfileLoader(false);

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
      
        launchCamera(options, async (response) => {
            if (!response.didCancel) {
                try {
                    // Save the photo URI in AsyncStorage
                    // await AsyncStorage.setItem('profileImageUri', response.assets[0].uri);
                    PostEventImg(response.assets[0].uri,response?.assets?.[0]?.fileName)
                    // Update state to display the photo
                    // await setProfileImage(response.assets[0].uri);
      
                    // Call a function to save the profile picture (if needed)
                    // saveProfilePic(response.assets[0].uri);
                   
                } catch (error) {
                    console.error('Error saving photo URI to AsyncStorage:', error);
                    // setIsLoading(false);
                }
      
            } else {
                // User canceled the operation
                // setIsLoading(false);
            setProfileLoader(false);

            }
            setOpenModal(false);
            // setProfileLoader(false);
        });
      };
      

    return(
        <View flex={1}>
            <ScrollView>
        <MainHeader set={set} profileImg={profileImage} navigation={navigation} />
        <SafeAreaView>
          {profileLoader?<ActivityIndicator size={"large"} />:<View style={styles.container}>
  
            {/* <Text style={{ color: "black", textAlign: "center", fontSize: 30, fontWeight: "700", marginVertical: 15 }}>List Of Events</Text> */}
           <View style={{alignItems:"center",justifyContent:"center"}}>
            {/* <Image  source={{uri:route?.params?.img}} style={{height:100,width:100,borderRadius:10}} resizeMode="contain" /> */}
            <Text style={{fontSize:21,fontWeight:"700",marginTop:50,textAlign:"center",color:"black"}}>{route?.params?.name}</Text>
  </View>
  <View>
  <TouchableOpacity onPress={() => setOpenModal(true)} style={{alignItems:"center",justifyContent:"center",marginTop:50,height:150,borderRadius:10,borderWidth:1,borderStyle:"dashed"}}>
 <Image source={require('../assets/images/upload.png')} style={{height:scaler(50),width:scaler(50)}}/>

  <Text style={{fontSize:17,fontWeight:"700",marginTop:scaler(10),color:"black"}}>UPLOAD IMAGE</Text>
</TouchableOpacity>
</View>
<View style={{height:scaler(20)}}/>
{/* {
    imageList?.map((item)=>{
        return(
            <View style={styles.card}>
            <Image source={{uri:item?.image_url}} resizeMode="contain" style={{height:380,width:"90%"}}  />
            </View>
        )
    })
} */}

{renderModal()}
<View style={{height:scaler(20)}}/>
          </View>}
        </SafeAreaView>
        </ScrollView>
      </View>
    )
}

export default UploadEvent;

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      paddingHorizontal: 25,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8, 
        padding: 3,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        height: 400,
        margin: 5,
        overflow: 'hidden', 
        alignItems:"center",
        justifyContent:"center"
        // Clip child elements to the rounded border
      },
  
  })