import {Dimensions} from 'react-native';
// import SafeArea from 'react-native-safe-area';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// const height = Dimensions.get('window').height - StatusBar.currentHeight;
// export const get_dimensions = async () => {
//   const insets = await SafeArea.getSafeAreaInsetsForRootView().then(
//     (res) => res.safeAreaInsets,
//   );
//   return {
//     width: width - (insets.left + insets.right),
//     height: height - (insets.top + insets.bottom),
//   };
// };

export const H_W = {
  width: width,
  height: height,
};
