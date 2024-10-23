import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ImageBackground
} from 'react-native';
import MainHeader from '../components/MainHeader';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const Scanner = props => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCodeScanned, setIsCodeScanned] = useState(false); // State to track if a code is scanned
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [scannedData, setScannedData] = useState(null); // State to store scanned data
  const device = useCameraDevice('back');

  // Request camera permission
  useEffect(() => {
    const getCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'authorized');
    };

    getCameraPermission();
  }, []);

  // Handle the scanned code
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!isCodeScanned && codes.length > 0) {
        const scannedCode = codes[0]; // Get the first (and only) code
        setIsCodeScanned(true); // Stop further scanning after the first code
        console.log('Scanned code:', scannedCode.value);

        const parsedData = JSON.parse(scannedCode.value);
          setScannedData(parsedData);

        setModalVisible(true); // Show the modal with scanned information
      }
    },
  });

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text>Loading camera...</Text>
      </View>
    );
  }
if(modalVisible){
    console.log(scannedData);
}
  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{flex: 1,alignItems:'center'}}>
        <View style={{paddingHorizontal:15}}>
      <MainHeader
        navigation={props.navigation}
        profileImg={props.route.params.profileImage}
        set={props.route.params.setProfileImage}
      />
      </View>

      <Camera
        style={{height: 300, width: 300,marginTop:100}}
        device={device}
        isActive={!isCodeScanned} // Stop camera when code is scanned
        codeScanner={codeScanner}
      />

      {/* Modal for showing scanned information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsCodeScanned(false); // Reset scanning state after closing modal
        }}>
        <View style={styles.modalView}>
          {scannedData && (
            <View style={styles.cardContainer}>
              {/* Top section with icons */}
              <View style={styles.header}>
                <Image
                  style={{height: 80, width: 200, zIndex: 2}}
                  source={require('../assets/images/head.png')}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#d4963e',
                  height: 100,
                  marginTop: -25,
                  zIndex: 1,
                }}>
                <Text
                  style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>
                  श्री बागेश्वर धाम
                </Text>
                <Text
                  style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                  (सेवा समिति महाराष्ट्र)
                </Text>
              </View>

              {/* Main section with profile picture and details */}
              <View style={styles.main}>
                <Image
                  source={{uri: scannedData.profile_image}}
                  style={styles.profilePic}
                />
                <Text style={styles.name}>नाम: {scannedData.name}</Text>
                <Text style={styles.position}>
                  पद: {scannedData.profession}
                </Text>
                <Text style={styles.district}>जिला: {scannedData.state}</Text>
                <Text style={styles.membership}>
                  सदस्यता क्रमांक: {scannedData.id}
                </Text>
              </View>

              {/* Bottom section with slogan */}
              <View style={styles.footer}>
                <Text style={styles.slogan}>
                  || सनातन हिंदू राष्ट्र की जय ||
                </Text>
              </View>
              <TouchableOpacity
                style={{position: 'absolute', top: 10, right: 10}}
                onPress={() => {
                  setModalVisible(false);
                  setIsCodeScanned(false);
                }}>
                <Image style={{height:20,width:20}} source={require('../assets/icons/close.png')} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 5, // For shadow in Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  main: {
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    marginTop: 5,
  },
  district: {
    fontSize: 16,
    marginTop: 5,
  },
  membership: {
    fontSize: 16,
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#d4963e',
    padding:10
  },
  slogan: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Orange color
  },
});

export default Scanner;
