import { StyleSheet, Text, View, ImageBackground, Image, TextInput, SafeAreaView, Button, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Location = ({ navigation, route }) => {
    const [name, setname] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const { mobileNumber } = route.params;
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('mobile', mobileNumber);
        } catch (e) {
            console.warn(e)
        }
    };
    

    const saveProfile = async () => {

        try {
            const profileData = {
                mobileNumber: mobileNumber,
                name: name,
                country: country,
                state: state,
                city: city

            };

            // console.log(profileData);

            const response = await fetch('https://shreebageshwardhamseva.com/admin/api/save-profile.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                try {
                    const responseData = await response.json(); // Parse the response as JSON
                    if(responseData === "inserted"){
                        
                        if(storeData()){
                            navigation.navigate('Main')
                        }
                        
                    }else{
                        console.log("no")
                    }
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                }
            } else {
                console.error('HTTP error:', response.status);
                const responseText = await response.text();
                console.log('Response text:', responseText);
            }
        } catch (error) {
            console.error('Error making API request:', error);
        }
    };


    const handleLogin = () => {
        if (name.trim() === '') {
            ToastAndroid.show('Enter Your Name!', ToastAndroid.SHORT)
            return;
        } else {
            saveProfile();
        }
    };
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                </View>
                <View>



                    <TextInput
                        style={styles.input}
                        onChangeText={setname}
                        value={name}
                        placeholder="Name"
                        placeholderTextColor="gray"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setCountry}
                        value={country}
                        placeholder="Country"
                        placeholderTextColor="gray"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setState}
                        value={state}
                        placeholder="State"
                        placeholderTextColor="gray"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setCity}
                        value={city}
                        placeholder="City"
                        placeholderTextColor="gray"
                    />

                    <View style={styles.smallButtonContainer}>
                        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
                            <Button
                                onPress={handleLogin}
                                title="Next"
                                color="#FD4F00"

                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default Location

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 26,
    },
    largeCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 30,
        elevation: 5, // Add elevation for an Android-like card shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    input: {
        height: 50,
        marginVertical: 7,
        // borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 0,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        color: 'black'
    },
    smallButtonContainer: {
        marginTop: 15,
        width: '70%',
        alignSelf: 'center',


    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    logoWrapper: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 25,
        justifyContent: 'center',
    },
    cardSmall: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 0,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginTop: 15,
        paddingHorizontal: 0,


    },
});