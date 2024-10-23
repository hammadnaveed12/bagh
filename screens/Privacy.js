import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import React,{useState} from 'react'
import Header from '../components/Header'
import MainHeader from '../components/MainHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const Privacy = () => {

    const [profileImage, setProfileImage] = useState();
    const [mobileNumber, setMobileNumber] = useState();

    const handleEmailPress = () => {
        const email = 'maha.bageshwardss@gmail.com';
        const subject = 'Regarding Terms and Conditions'; // You can customize the subject
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

        Linking.openURL(url).catch((err) =>
            console.error('An error occurred while opening the email:', err)
        );
    };

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

    const navigation=useNavigation();

    return (
        <View style={styles.container}>

<MainHeader profileImg={profileImage} navigation={navigation} />


            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>

                <View style={styles.container}>
                    <Text style={{
                        fontWeight: '900',
                        marginBottom: 10,
                        alignSelf: 'center',
                        marginTop: 15, fontSize: 18,
                        color: 'black'
                    }}>Privacy Policy</Text>

                    
                    <Text style={{paddingBottom: 5, color: 'black'}}>This Privacy Policy (“Policy”) delineates the policies and procedures governing the collection, use,
                        disclosure, and protection of user information on the Bageshwar Dham Balaji Charitable Trust mobile
                        application (“the App”) provided by the Bageshwar Dham Balaji Charitable Trust (“we,” “us,” or “our”).
                        For authentication, users can refer to the official registration certificate of Bageshwar Dham Balaji
                        Charitable Trust. Number in the register of public trust: E-0013500(THN).</Text>
                    <Text style={{paddingBottom: 5, color: 'black'}}>The terms “you” and “your” refer to the user of the Bageshwar Dham Balaji Charitable Trust app. The
                        term “Services” refers to any services offered by the App </Text>
                    <Text style={{paddingBottom: 5, color: 'black'}}>Please read this Policy before using the “the App” or submitting any personal information to “the App”.
                        This Policy is a part of and incorporated within, and is to be read along with, the Terms of Use.</Text>
                    <Text style={styles.heading}>1. Introduction</Text>
                    <Text style={{paddingBottom: 5, color: 'black'}}>The Bageshwar Dham Balaji Charitable Trust respects your privacy and is committed to protecting your
                        personal data. By using our mobile application, you agree to the collection, transfer, storage, use, and
                        disclosure of your information in accordance with this Policy.</Text>
                    <View>
                        <Text style={styles.heading}>2. Information Collection</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>The App collects the following types of information:</Text>

                        <View style={styles.list}>
                            <Text style={styles.listItem}>
                                •  <Text style={styles.listItemBold}>User Profile:</Text> When creating a profile, users may provide personal information such as name, contact details, and authentication credentials.
                            </Text>

                            <Text style={styles.listItem}>
                                •  <Text style={styles.listItemBold}>Verification:</Text> To enhance security, the App collects and verifies user phone numbers through
                                confirmation codes sent to registered mobile numbers.
                            </Text>

                            <Text style={styles.listItem}>
                                •  <Text style={styles.listItemBold}>Dashboard Data:</Text> Users can access and view detailed information about their profiles through
                                the App's dashboard.
                            </Text>

                            <Text style={styles.listItem}>
                                •  <Text style={styles.listItemBold}>Content Viewing:</Text> Users can view posts and videos posted by the App's administrators.
                            </Text>

                            <Text style={styles.listItem}>
                                •  <Text style={styles.listItemBold}>Content Sharing:</Text> The App facilitates sharing of posts and videos via mobile devices.
                            </Text>

                            <Text style={styles.listItem}>
                                •  <Text style={styles.listItemBold}>Donation Processing:</Text> Different donation options are available within the App for user
                                contributions to the Bageshwar Dham Balaji Charitable Trust.
                            </Text>



                        </View>

                        {/* Additional Text components or list items can be added here */}
                    </View>
                    <View>
                        <Text style={styles.heading}>3. Use of Information</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>Collected information is used for the following purposes:</Text>

                        <View style={styles.list}>
                            <Text style={styles.listItem}>
                                •  To provide personalized services to users based on their preferences and profile information.
                            </Text>

                            <Text style={styles.listItem}>
                                •  To facilitate interaction between users and the App's administrators.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Collected data may be used to process donations made by users through the App.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Providing, personalizing, maintaining, and improving products and services.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Administering and enhancing the security of the App.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Providing information about services similar to those being used.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Understanding user behaviors, improving content and features, processing transactions, and
                                providing customer support.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Generating reports, conducting research, and delivering relevant advertising.
                            </Text>





                        </View>

                        {/* Additional Text components or list items can be added here */}
                    </View>
                    <View>
                        <Text style={styles.heading}>4. Data Sharing</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>User information may be shared with the following entities:</Text>

                        <View style={styles.list}>
                            <Text style={styles.listItem}>
                                • <Text style={styles.listItemBold}>Service Providers:</Text> Information may be shared with service providers involved in user
                                verification, communication, or donation processing.
                            </Text>

                            <Text style={styles.listItem}>
                                • <Text style={styles.listItemBold}>Administrators:</Text> User-generated content (posts, videos) may be shared among administrators
                                for management and curation purposes.
                            </Text>







                        </View>

                        {/* Additional Text components or list items can be added here */}
                    </View>
                    <View>
                        <Text style={styles.heading}>5. Disclosure and Distribution of your information</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>We may share your information for several purposes:</Text>

                        <View style={styles.list}>
                            <Text style={styles.listItem}>
                                •  With service providers, our partners , other users, and advertisers.
                            </Text>

                            <Text style={styles.listItem}>
                                •  For crime prevention, investigations, and internal use.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Fulfilling the purpose for which you provided the information.
                            </Text>

                            <Text style={styles.listItem}>
                                •  As required by law or to protect our rights and interests.
                            </Text>







                        </View>

                        {/* Additional Text components or list items can be added here */}
                    </View>
                    <View>
                        <Text style={styles.heading}>6. Cookies</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>Our App and third parties may use cookies, pixel tags, web beacons, mobile device IDs, and similar
                            technologies to collect and store information with respect to your use of the Services and third-party
                            websites.</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>Cookies, pixel tags, web beacons, and similar technologies are used for various purposes:</Text>

                        <View style={styles.list}>
                            <Text style={styles.listItem}>
                                •  Authenticating users.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Remembering user preferences and settings.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Determining the popularity of content.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Delivering and measuring the effectiveness of advertising campaigns.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Analyzing site traffic and trends.
                            </Text>

                            <Text style={styles.listItem}>
                                •  Understanding online behaviors and interests.
                            </Text>







                        </View>

                        <Text style={{paddingBottom: 5, color: 'black'}}>These technologies may be used by third parties for audience measurement, analytics services, and
                            serving advertisements.</Text>

                        {/* Additional Text components or list items can be added here */}
                    </View>
                    <View>
                        <Text style={styles.heading}>7. Data Security</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>We implement appropriate technical measures to safeguard user data collected through the App.
                            However, no method of transmission over the internet or electronic storage is entirely secure.</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>Queries relating to information processing or usage can be emailed to <Text style={{color: 'blue'}} onPress={handleEmailPress}> maha.bageshwardss@gmail.com</Text>.
                            Any abuse or violation of the Policy can also be reported to the same address.</Text>



                        <Text style={{paddingBottom: 5, color: 'black'}}>The App stores data with the cloud or on premise , on cloud data may store this data on servers located
                            outside of India.</Text>


                    </View>
                    <View>
                        <Text style={styles.heading}>8. User Control</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>Users have the option to control and manage their data through profile settings within the App.
                            Additionally, users may contact us at <Text style={{color: 'blue'}} onPress={handleEmailPress}> maha.bageshwardss@gmail.com</Text> for any data-related queries or
                            requests.</Text>



                    </View>
                    <View>
                        <Text style={styles.heading}>9. Policy Updates</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>This Policy may undergo periodic updates and changes. Significant alterations will be prominently
                            displayed within the App or communicated to users via registered email addresses.</Text>



                    </View>

                    <View>
                        <Text style={styles.heading}>10. Acknowledgment</Text>
                        <Text style={{paddingBottom: 5, color: 'black'}}>By using the Bageshwar Dham Balaji Charitable Trust Mobile App, users acknowledge and consent to the
                            collection, processing, and usage of their information as outlined in this Policy.</Text>
                        <Text style={{paddingBottom: 20, color: 'black'}}>This Policy is a part of and incorporated within the Terms of Use of the App.</Text>



                    </View>





                </View>

            </ScrollView>



        </View>
    )
}

export default Privacy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F8F8C6',
        color: 'black'

    },

    list: {
        marginLeft: 20, // Adjust the left margin for indentation
    },
    listItem: {
        fontSize: 14,
        marginBottom: 5,
        color: 'black'
    },
    listItemBold: {
        fontWeight: 'bold',
    },



    heading: {
        fontWeight: '900',
        fontSize: 16,
        color: 'black',
        paddingVertical: 10
    },

    subHeading: {
        fontWeight: '500',
        fontSize: 12
    }


})