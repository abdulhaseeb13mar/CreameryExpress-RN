import {Dimensions, StatusBar} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// const height = Dimensions.get('window').height - StatusBar.currentHeight;

export const H_W = {
  width: width,
  height: height,
};
