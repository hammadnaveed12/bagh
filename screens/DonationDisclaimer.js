import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import React,{useState} from 'react'
import Header from '../components/Header'
import MainHeader from '../components/MainHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const DonationDisclaimer = () => {
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
                    }}>Donation Disclaimer</Text>

                    <Text style={{ paddingBottom: 5, color: 'black' }}>This Donation Disclaimer ("Disclaimer") outlines the terms and conditions governing
                        donations made through the Bageshwar Dham Trust mobile application ("App").
                        The Trust encourages individuals to read and understand the following before initiating any
                        donation</Text>

                    <Text style={styles.heading}>1. Donation Intent</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>By using the App to make a donation to the Bageshwar Dham Trust, users acknowledge
                        that their contribution is voluntary and made with the intention of supporting the
                        Trust's charitable causes, religious activities, social welfare projects, and other related
                        endeavors.</Text>

                        <Text style={styles.heading}>2. No Obligation Imposed</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>It's vital to note that donations made via the App do not create any binding obligation
on the Trust to provide goods, services, or benefits to the donor. The Trust retains full
discretion and autonomy to allocate, manage, and utilize the donations received based
on its internal priorities and operational requirements.</Text>

                        <Text style={styles.heading}>3. Non-refundable Donations</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>All donations made through the App are considered non-refundable. The Trust does not
undertake any responsibility to refund or reverse donations once they are successfully
processed through the App.</Text>

                        <Text style={styles.heading}>4. Accuracy of Information</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>Users initiating donations are responsible for ensuring the accuracy of the donation
details provided through the App. The Trust shall not be held liable for any errors,
omissions, or discrepancies in donation-related information entered by the user.
</Text>

                        <Text style={styles.heading}>5. Acknowledgment of Contribution</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>The Trust expresses gratitude for every donation received through the App. However,
the Trust does not commit to issuing individual acknowledgments or receipts for each
donation unless specifically required by applicable laws or regulations.</Text>

                        <Text style={styles.heading}>6. Modification of Disclaimer</Text>
                    <Text style={{ paddingBottom: 5, color: 'black' }}>The Bageshwar Dham Trust reserves the right to modify, update, or amend this
Disclaimer at its sole discretion without prior notice. Users are encouraged to review this
Disclaimer periodically for any changes.</Text>

                        <Text style={styles.heading}>7. Acceptance of Terms</Text>
                    <Text style={{ paddingBottom: 15, color: 'black' }}>By proceeding with a donation through the App, users implicitly agree to the terms and
conditions outlined in this Donation Disclaimer.
 For any queries or concerns regarding this Disclaimer or the donation process,
 please contact us at <Text style={{color: 'blue'}} onPress={handleEmailPress}> maha.bageshwardss@gmail.com</Text></Text>


                        




                </View>

            </ScrollView>



        </View>
    )
}

export default DonationDisclaimer

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