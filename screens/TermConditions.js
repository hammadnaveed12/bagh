import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import React,{useState} from 'react'
import Header from '../components/Header'
import MainHeader from '../components/MainHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TermConditions = () => {
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
                    }}>Terms and Conditions</Text>

                    <Text style={{ paddingBottom: 5, color: 'black' }}>These Terms and Conditions ("Terms") govern the use of the Bageshwar Dham Trust mobile
                        application ("App"). By accessing or using the App, users agree to comply with these Terms.
                        If users do not agree to these Terms, they must refrain from using the App.</Text>

                    <Text style={styles.heading}>1. Acceptance of Terms</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>Users must be aware that the use of the App is subject to these Terms. Continued use of
                        the App implies the user's consent to these Terms.</Text>

                    <Text style={styles.heading}>2. Applicability of Terms</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>These Terms shall apply to all users, including donors, visitors, and individuals utilizing the
                        features, services, or content provided by the App.</Text>

                    <Text style={styles.heading}>3. User Registration</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>To access certain features or services within the App, users may need to register and
                        create an account. Users must provide accurate and complete information during the
                        registration process.
                    </Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>Users are responsible for maintaining the confidentiality of their account credentials and
                        for any activity that occurs under their account.
                    </Text>

                    <Text style={styles.heading}>4. Use of App Services</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>Users are granted a limited, non-exclusive, non-transferable, and revocable license to use
                        the App for its intended purposes, which include accessing content, making donations, and
                        engaging with Trust-related activities.
                    </Text>

                    <Text style={styles.heading}>5. Donation Procedures</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}> The App provides a platform for users to voluntarily donate funds to support the Trust's
                        charitable and religious activities. Users understand that donations are voluntary and nonrefundable.</Text>


                    <Text style={styles.heading}>6. User Content</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>Users may be allowed to upload, submit, or share content through the App. By doing so,
                        users grant the Trust a non-exclusive, royalty-free license to use, reproduce, modify, or
                        distribute the content for Trust-related purposes.</Text>

                    <Text style={styles.heading}>7. Intellectual Property</Text>
                    <Text style={{ paddingBottom: 15, color: 'black' }}>All content, trademarks, logos, and intellectual property displayed on the App belong to
                        the Trust. Users agree not to use, reproduce, or modify any Trust-owned content without
                        explicit permission.
                    </Text>

                    <Text style={styles.heading}>8. Limitation of Liability</Text>
                    <Text style={{ paddingBottom: 15, color: 'black' }}>The Trust shall not be liable for any direct, indirect, incidental, consequential, or punitive
damages arising out of or related to the use or inability to use the App.
                    </Text>

                    <Text style={styles.heading}>9. Modifications to Terms</Text>
                    <Text style={{ paddingBottom: 15, color: 'black' }}>The Trust reserves the right to update, modify, or change these Terms at its discretion.
Users will be notified of any significant changes to the Terms.
                    </Text>

                    <Text style={styles.heading}>10. Termination of Access</Text>
                    <Text style={{ paddingBottom: 15, color: 'black' }}>The Trust reserves the right to terminate or suspend user access to the App for violation
of these Terms or for any reason deemed necessary by the Trust.

                    </Text>

                    <Text style={styles.heading}>11. Governing Law</Text>
                    <Text style={{ paddingBottom: 15, color: 'black' }}>These Terms are governed by the laws of Mumbai Jurisdiction. Any disputes arising from
the use of the App shall be subject to the exclusive jurisdiction of the courts in Mumbai
Jurisdiction.
                    </Text>

                    <Text style={{ paddingBottom: 15, color: 'black' }}>By using the App, users acknowledge that they have read, understood, and agreed to these
Terms and Conditions.
For any questions or concerns regarding these Terms, please contact us at
<Text style={{color: 'blue'}} onPress={handleEmailPress}> maha.bageshwardss@gmail.com</Text></Text>







                </View>

            </ScrollView>



        </View>
    )
}

export default TermConditions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F8F8C6',
    },



    heading: {
        fontWeight: '900',
        fontSize: 16,
        color: 'black'
    },

    subHeading: {
        fontWeight: '500',
        fontSize: 12
    }


})