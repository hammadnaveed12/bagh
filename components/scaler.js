import {create} from 'react-native-pixel-perfect';

const designResolution = {
  width: 375,
  height: 812,
};
const perfectSize = create(designResolution);

const scaler = (size) => perfectSize(size);

export default scaler;