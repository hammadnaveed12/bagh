import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Modal,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  ImageBackground
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileDetails = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState();
  const [dharakWhere, setDharakWhere] = useState();
  const [dharakDate, setDharakDate] = useState();
  // const [dharakTime, setDharakTime] = useState();

  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [middleName, setmiddleName] = useState();
  const [surname, setSurname] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [email, setEmail] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState();
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [sewaSamaye, setSewaSamaye] = useState('');
  const [dikshaDharak, setDikshaDharak] = useState();
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [professionData, setProfessionData] = useState([]);
  const [payment,setPayment] = useState();

  const [profileData, setProfileData] = useState();
  const [profileImage, setProfileImage] = useState();
  const [storedNumber, setStoredNumber] = useState();

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);

    if (date) {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      setDateOfBirth(formattedDate);
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const loadProfileImage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('profileImageUri');
      if (savedUri) {
        // setProfileImage(savedUri);
      }
    } catch (error) {
      console.error('Error loading profile image from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const mobile = await AsyncStorage.getItem('mobile');
        if (mobile !== null) {
          setStoredNumber(mobile);
          await getProfile();
          getEducation();
          getProfession();
          getBbloodGroup();
        }
      } catch (e) {}
    };

    getData();
  }, [storedNumber]);

  const getProfile = async () => {
    try {
      const postData = {
        mobileNumber: storedNumber,
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
          // Use responseData[0] directly to update the state
          // setProfileData(responseData[0]);
          setName(responseData[0].name);
          setmiddleName(responseData[0].father_name);
          setSurname(responseData[0].surname);
          setMobileNumber(responseData[0].mobile);
          setEmail(responseData[0].email);
          setDateOfBirth(responseData[0].dob);
          setGender(responseData[0].gender);
          setBloodGroup(responseData[0].blood_group);
          setAddress(responseData[0].address);
          setEducation(responseData[0].education);
          setProfession(responseData[0].profession);
          setSewaSamaye(responseData[0].sewa_samaye);
          setDikshaDharak(responseData[0].diksha_dharak);
          setDharakWhere(responseData[0].dharakwhere);
          setDharakDate(responseData[0].dharakdate);
          setWhatsappNumber(responseData[0].whatsapp_number);
          setCity(responseData[0].city);
          setState(responseData[0].state);
          setPincode(responseData[0].pincode);
          setEmail(responseData[0].email);
          setProfileImage(responseData[0]?.profile_image);
          setPayment(responseData[0]?.payment);
          // setDharakTime(responseData[0].dharaktime);
        } catch (jsonError) {}
      } else {
        const responseText = await response.text();
      }
    } catch (error) {}
  };

  const handleBack = () => {
    navigation.navigate('Profile');
  };

  const getBbloodGroup = () => {
    fetch('https://shreebageshwardhamseva.com/admin/api/blood-group.php')
      .then(response => response.json())
      .then(data => {
        setBloodGroupData(data);
      })
      .catch(error => console.error('Error fetching blood group data:', error));
  };

  const getEducation = () => {
    fetch('https://shreebageshwardhamseva.com/admin/api/education.php')
      .then(response => response.json())
      .then(data => {
        setEducationData(data);
      })
      .catch(error => console.error('Error fetching blood group data:', error));
  };

  const getProfession = () => {
    fetch('https://shreebageshwardhamseva.com/admin/api/profession.php')
      .then(response => response.json())
      .then(data => {
        setProfessionData(data);
      })
      .catch(error => console.error('Error fetching blood group data:', error));
  };

  const saveProfile = async () => {
    let fdate = await String(convertDateFormat(dateOfBirth));
    console.log(fdate, '0-0-0-0');
    // console.log(formattedDate)
    if (!privacyPolicyChecked) {
      ToastAndroid.show('Please Accept Privacy Policy!', ToastAndroid.SHORT);
      return;
    }

    if (!termsChecked) {
      ToastAndroid.show(
        'Please Accept Terms and Conditions!',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (!isValidDate(fdate)) {
      Alert.alert('Error', 'Please enter a valid date in dd-mm-yyyy format.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);

      const profileData = {
        name,
        middleName,
        surname,
        mobileNumber,
        whatsappNumber,
        email,
        dateOfBirth: fdate,
        gender,
        bloodGroup,
        address,
        state,
        city,
        pincode,
        education,
        profession,
        sewatime: sewaSamaye,
        dikshaDharak,
        dharakWhere,
        dharakDate,
        payment
        // dharakTime
      };
      console.log(profileData, '03-03-03--30-30');
      const response = await fetch(
        'https://shreebageshwardhamseva.com/admin/api/save-profile.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        },
      );

      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log(name, middleName, surname);
          if (middleName) {
            await AsyncStorage.setItem('lastname', middleName);
          }
          if (name) {
            await AsyncStorage.setItem('name', name);
          }
          if (surname) {
            await AsyncStorage.setItem('surname', surname);
          }

          Alert.alert('Success', 'Profile updated successfully');
          navigation.navigate('Profile');
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
        }
      } else {
        console.error('HTTP error:', response.status);
        const responseText = await response.text();

        Alert.alert('Error', 'Error updating profile');
      }
    } catch (error) {
      console.error('Error saving profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidDate = dateString => {
    // Regular expression for the "dd-mm-yyyy" format
    const dateRegex =
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$|^(0?[1-9]|[12][0-9]|3[01])-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-\d{4}$/i;

    return dateRegex.test(dateString);
  };

  const isValidEmail = emailString => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(emailString);
  };

  function isValidDateFormat(dateString) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(dateString);
  }
  function convertDateFormat(inputDate) {
    if (isValidDateFormat(inputDate)) {
      const parts = inputDate.split('/');
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const formattedDate = `${parts[0]}-${
        monthNames[parseInt(parts[1], 10) - 1]
      }-${parts[2]}`;
      return formattedDate;
    } else {
      return inputDate;
    }
  }
  console.log(dateOfBirth, '0-k0-0-0-0-');

  return (
    <View style={styles.container}>
      {isLoading == true ? (
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
      
      <View style={styles.header}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require('../assets/icons/left-arrow.png')}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <View style={{marginLeft: 15}}>
            <Text style={{color: 'black'}}>Namaste</Text>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              {name + ' ' + middleName + ' ' + surname}
            </Text>
          </View>
        </View>

        {profileImage ? (
          <Image
            style={styles.profilePic}
            source={{
              uri: `${profileImage}?timestamp=${new Date().getTime()}`,
              cache: 'reload',
            }}
          />
        ) : (
          <Image
            style={styles.profilePic}
            source={require('../assets/images/dummy-avatar.jpg')}
          />
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        <View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/id-card.png')}
              style={{
                width: 30,
                height: 20,
                tintColor: 'gray',
                marginRight: 10,
              }}
            />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Personal Information
            </Text>
          </View>

          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>First Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Middle Name</Text>
            <TextInput
              style={styles.input}
              value={middleName}
              onChangeText={text => setmiddleName(text)}
            />
          </View>
          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Surname</Text>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={text => setSurname(text)}
            />
          </View>
          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Mobile Number</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={mobileNumber}
                editable={false}
              />
              <View style={{width: 20, height: 20}}>
                <Image
                  style={styles.verify}
                  source={require('../assets/icons/verify.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Whatsapp Number</Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={whatsappNumber}
              onChangeText={text => setWhatsappNumber(text)}
            />
          </View>
          {/* {mobileNumbers.map((number, index) => (

                        <View style={styles.cardSmall}>
                            <Text>Mobile Number</Text>

                            <TextInput
                                key={index.toString()}
                                style={styles.input}
                                keyboardType='numeric'
                                value={number}
                                onChangeText={(value) => handleMobileNumberChange(index, value)}
                            />

                            {index !== 0 && ( // Display delete button for additional mobile numbers (not the original one)
                                <TouchableOpacity onPress={() => removeMobileNumber(index)} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                    ))}

                    <TouchableOpacity onPress={addMobileNumber} style={styles.another}>
                        <Text>Add Another Mobile No.</Text>
                    </TouchableOpacity> */}

          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Date Of Birth</Text>
            {/* <TextInput
                            style={styles.input}
                            value={dateOfBirth}
                            onChangeText={(text) => setDateOfBirth(text)}
                            placeholder='dd-mm-yyyy'
                            placeholderTextColor="gray"
                            
                        /> */}
            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={{marginTop: 5, fontSize: 14, color: 'black'}}>
                {String(convertDateFormat(dateOfBirth)) ?? 'DD/MM/YYYY'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.genderContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image
                source={require('../assets/icons/person.png')}
                style={{
                  width: 25,
                  height: 20,
                  tintColor: 'gray',
                  marginRight: 5,
                }}
              />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Gender
              </Text>
            </View>
            <RadioButton.Group
              onValueChange={value => setGender(value)}
              value={gender}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.radioContainer}>
                  <RadioButton value="male" />
                  <Text style={{color: 'black'}}>Male</Text>
                </View>
                <View style={styles.radioContainer2}>
                  <RadioButton value="female" />
                  <Text style={{color: 'black'}}>Female</Text>
                </View>
                <View style={styles.radioContainer}>
                  <RadioButton value="other" />
                  <Text style={{color: 'black'}}>Other</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.cardSmall}>
            <Text style={{color: 'black'}}>Blood Group</Text>
            <Picker
              selectedValue={bloodGroup}
              onValueChange={itemValue => setBloodGroup(itemValue)}>
              {bloodGroupData.map((data, index) => (
                <Picker.Item
                  style={{color: 'black'}}
                  key={index}
                  label={data.name}
                  value={data.name}
                />
              ))}
            </Picker>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image
                source={require('../assets/icons/location.png')}
                style={{
                  width: 25,
                  height: 20,
                  tintColor: 'gray',
                  marginRight: 5,
                }}
              />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Address
              </Text>
            </View>
            <View style={styles.cardSmall}>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={text => setAddress(text)}
                placeholder="Enter your address"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.cardSmall}>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={text => setCity(text)}
                placeholder="City"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.cardSmall}>
              <TextInput
                style={styles.input}
                value={state}
                onChangeText={text => setState(text)}
                placeholder="State"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.cardSmall}>
              <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={text => setPincode(text)}
                placeholder="Zip/Pincode"
                placeholderTextColor="gray"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image
                source={require('../assets/icons/education.png')}
                style={{
                  width: 25,
                  height: 20,
                  tintColor: 'gray',
                  marginRight: 7,
                }}
              />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Education
              </Text>
            </View>
            <View style={styles.cardSmall}>
              <Picker
                selectedValue={education}
                onValueChange={itemValue => setEducation(itemValue)}>
                {educationData.map((data, index) => (
                  <Picker.Item
                    style={{color: 'black'}}
                    key={index}
                    label={data.name}
                    value={data.name}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image
                source={require('../assets/icons/suitcase.png')}
                style={{
                  width: 25,
                  height: 20,
                  tintColor: 'gray',
                  marginRight: 7,
                }}
              />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Profession
              </Text>
            </View>
            <View style={styles.cardSmall}>
              <Picker
                selectedValue={profession}
                onValueChange={itemValue => setProfession(itemValue)}>
                {professionData.map((data, index) => (
                  <Picker.Item
                    style={{color: 'black'}}
                    key={index}
                    label={data.name}
                    value={data.name}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image
                source={require('../assets/icons/sewa.png')}
                style={{
                  width: 25,
                  height: 20,
                  tintColor: 'gray',
                  marginRight: 7,
                }}
              />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Sewa Key Liye Kitna Samaye
              </Text>
            </View>
            <View style={styles.cardSmall}>
              <TextInput
                style={styles.input}
                value={sewaSamaye}
                onChangeText={text => setSewaSamaye(text)}
              />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image
                source={require('../assets/icons/eid.png')}
                style={{
                  width: 25,
                  height: 20,
                  tintColor: 'gray',
                  marginRight: 7,
                }}
              />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Diksha Dharak
              </Text>
            </View>

            <RadioButton.Group
              onValueChange={value => setDikshaDharak(value)}
              value={dikshaDharak}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.radioContainer}>
                  <RadioButton value="yes" />
                  <Text style={{color: 'black'}}>Yes</Text>
                </View>
                <View style={styles.radioContainer2}>
                  <RadioButton value="no" />
                  <Text style={{color: 'black'}}>No</Text>
                </View>
              </View>
            </RadioButton.Group>

            {dikshaDharak === 'yes' && (
              <View style={{marginTop: 10}}>
                <View style={styles.cardSmall}>
                  <TextInput
                    style={styles.input}
                    value={dharakWhere}
                    onChangeText={text => setDharakWhere(text)}
                    placeholder="Where"
                    placeholderTextColor="gray"
                  />
                </View>
                <View style={styles.cardSmall}>
                  <TextInput
                    style={styles.input}
                    value={dharakDate}
                    onChangeText={text => setDharakDate(text)}
                    placeholder="Date"
                    placeholderTextColor="gray"
                  />
                </View>
              </View>
            )}
          </View>

          <View style={{marginTop: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                tintColors={{true: '#F15927', false: 'black'}}
                disabled={false}
                value={termsChecked}
                onValueChange={newValue => setTermsChecked(newValue)}
              />
              <Text style={{paddingHorizontal: 8, color: 'black'}}>
                I agree to share personal details with us, in accordance to our
                privacy policy. Learn more
              </Text>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                tintColors={{true: '#F15927', false: 'black'}}
                disabled={false}
                value={privacyPolicyChecked}
                onValueChange={newValue => setPrivacyPolicyChecked(newValue)}
              />
              <Text style={{marginLeft: 8, color: 'black'}}>
                I agree to receive WhatsApp notifications from your app as part
                of using services.
              </Text>
            </View>
          </View>

          <View style={styles.smallButtonContainer}>
            <Button
              title="Save"
              color="#FD4F00"
              accessibilityLabel="Save profile"
              onPress={saveProfile}
            />
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8F8C6',
    padding: 15,
  },
  verify: {
    width: 20,
    height: 20,
    marginTop: 18,
    marginLeft: 5,
  },
  bloodGroupContainer: {
    marginTop: 20,
  },
  picker: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
  },
  genderContainer: {
    marginTop: 20,
  },
  smallButtonContainer: {
    marginTop: 15,
    // width: '50%', // Set the button width to 50% of the container
    // alignSelf: 'center', // Center the button within the container
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },

  deleteButtonText: {
    color: 'black',
  },

  another: {
    backgroundColor: '#ec9459',
    paddingVertical: 5,
    width: '50%',
    marginTop: 15,
    textAlign: 'center',
    borderRadius: 20,
    alignSelf: 'right',
    alignItems: 'center',
  },

  input: {
    height: 40,
    marginVertical: 3,
    padding: 3,
    backgroundColor: 'white',
    // borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black',
  },

  cardSmall: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 15,
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
