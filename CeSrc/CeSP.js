/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H_W} from '../CeComp/CeDim';
import WrapperScreen from '../CeComp/WrapperScreen';
import {connect} from 'react-redux';
import {Button, SocialIcon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../CeComp/CeColor';
import NavigationRef from '../CeComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  CeremoveFavAction,
  CesetFavAction,
  CeaddCartAction,
  CeremoveCartAction,
} from '../CeRedux/CeActions';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [fav, setFav] = useState(false);
  const [sugarLevel, setSugarLevel] = useState('0%');
  const [size, setSize] = useState({size: 'Small', amount: '125ml'});
  const CeProduct = props.CeProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.CeFavs.length; us++) {
      if (props.CeFavs[us].id === CeProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const CeAddToCart = () => props.CeaddCartAction(CeProduct);

  const CeRemoveFromCart = () => {
    props.CeCart[CeProduct.id] !== undefined
      ? props.CeremoveCartAction(CeProduct)
      : null;
  };

  const toggleFav = () => {
    fav
      ? props.CeremoveFavAction(CeProduct.id)
      : props.CesetFavAction(CeProduct);
    setFav(!fav);
  };

  const CeGoBack = () => NavigationRef.Navigate('CeHome');

  return (
    <WrapperScreen style={{backgroundColor: `rgba(${colors.rgb_Primary},0.6)`}}>
      <View style={styles.singleProduct_CE20}>
        <View style={styles.singleProduct_CE19}>
          <ImageBackground
            resizeMode="contain"
            source={CeProduct.images}
            style={styles.singleProduct_CE18}>
            <View
              style={{
                marginTop: H_W.height * 0.025,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.singleProduct_CE17}
                onPress={CeGoBack}>
                <Entypo
                  name="chevron-left"
                  color={'white'}
                  size={H_W.width * 0.08}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleFav}
                style={{
                  width: H_W.width * 0.12,
                  height: H_W.width * 0.12,
                  borderRadius: 50,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                }}>
                <Ionicons
                  name={fav ? 'ios-heart' : 'ios-heart-outline'}
                  color="red"
                  size={H_W.width * 0.06}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            ...styles.singleProduct_CE16,
            marginBottom: -insets.bottom,
            paddingBottom: insets.bottom,
            height: H_W.height * 0.62 - insets.bottom,
          }}>
          <View style={styles.singleProduct_CE15}>
            <View style={{...border, marginTop: -HEIGHT * 0.04}}>
              <View style={styles.singleProduct_CE2}>
                <TouchableOpacity
                  onPress={
                    props.CeCart[CeProduct.id] !== undefined &&
                    props.CeCart[CeProduct.id] !== 0
                      ? CeRemoveFromCart
                      : null
                  }>
                  <Entypo name="minus" color="black" size={H_W.width * 0.065} />
                </TouchableOpacity>
                <Text style={styles.singleProduct_CE23}>
                  {props.CeCart[CeProduct.id] !== undefined &&
                  props.CeCart[CeProduct.id] !== 0
                    ? props.CeCart[CeProduct.id].added
                    : '0'}
                </Text>
                <TouchableOpacity onPress={CeAddToCart}>
                  <Entypo name="plus" color="black" size={H_W.width * 0.065} />
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  // ...border,
                  width: H_W.width * 0.17,
                  height: H_W.width * 0.17,
                  borderRadius: 50,
                  backgroundColor: `rgba(${colors.rgb_Primary},0.5)`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  // elevation: 3,
                  // borderColor: 'black',
                  borderWidth: 1.5,
                }}>
                <Entypo name="plus" color="black" size={30} />
              </View> */}
            </View>
            <Text style={styles.singleProduct_CE12}>{CeProduct.names}</Text>
            <Text style={styles.singleProduct_CE11}>${CeProduct.price}</Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: H_W.width * 0.048,
              }}>
              Sugar Level
            </Text>
            <View style={styles.singleProduct_CE10}>
              {['0%', '25%', '50%', '100%'].map((i, index) => (
                <TouchableOpacity
                  onPress={() => setSugarLevel(i)}
                  key={index}
                  style={{
                    ...styles.singleProduct_CE9_1,
                    borderColor:
                      sugarLevel === i
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : colors.lightGrey3,
                    backgroundColor:
                      sugarLevel === i
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : 'white',
                  }}>
                  <Text
                    style={{
                      ...styles.singleProduct_CE8,
                      color: sugarLevel === i ? colors.primary : 'black',
                    }}>
                    {i}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: H_W.width * 0.048,
              }}>
              Choice Size
            </Text>
            <View style={styles.singleProduct_CE10}>
              {[
                {size: 'Small', amount: '125ml'},
                {size: 'Medium', amount: '175ml'},
                {size: 'Large', amount: '250ml'},
              ].map((i, index) => (
                <TouchableOpacity
                  onPress={() => setSize(i)}
                  key={index}
                  style={{
                    ...styles.singleProduct_CE9_2,
                    borderColor:
                      size.size === i.size
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : colors.lightGrey3,
                    backgroundColor:
                      size.size === i.size
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : 'white',
                  }}>
                  <Text
                    style={{
                      ...styles.singleProduct_CE8,
                      color: size.size === i.size ? colors.primary : 'black',
                    }}>
                    {i.size}
                  </Text>
                  <Text
                    style={{
                      ...styles.singleProduct_CE7,
                      color: size.size === i.size ? colors.primary : 'black',
                    }}>
                    {i.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const border = {
  // borderColor: 'red',
  // borderWidth: 1,
};

const styles = StyleSheet.create({
  singleProduct_CE23: {
    fontWeight: 'bold',
    fontSize: H_W.width * 0.056,
  },
  singleProduct_CE22: {
    marginLeft: H_W.width * 0.045,
    color: colors.darkGray,
    fontSize: H_W.width * 0.045,
    fontWeight: 'bold',
  },
  singleProduct_CE21: {
    width: H_W.width * 0.55,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  singleProduct_CE20: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleProduct_CE19: {
    width: H_W.width,
    // height: H_W.height * 0.37,
    height: '37%',
    paddingHorizontal: H_W.width * 0.05,
  },
  singleProduct_CE18: {width: '100%', height: '100%'},
  singleProduct_CE16: {
    backgroundColor: 'white',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    // height: '62%',
    width: H_W.width,
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: H_W.height * 0.01,
    paddingHorizontal: H_W.width * 0.05,
    paddingBottom: H_W.height * 0.02,
  },
  singleProduct_CE15: {
    width: '100%',
    marginBottom: H_W.height * 0.01,
    ...border,
  },
  singleProduct_CE14: {
    width: H_W.width * 0.25,
    height: H_W.width * 0.0095,
    backgroundColor: colors.darkGray,
    opacity: 0.5,
  },
  singleProduct_CE12: {
    width: '85%',
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
    ...border,
  },
  singleProduct_CE11: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 26,
    // textShadowColor: '#bcbcbc',
    textShadowColor: 'black',
    textShadowOffset: {width: 1.2, height: 1.2},
    textShadowRadius: 2,
  },
  singleProduct_CE10: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: H_W.height * 0.01,
  },
  singleProduct_CE9_1: {
    width: H_W.width * 0.2,
    borderColor: colors.lightBackground2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: H_W.height * 0.015,
  },
  singleProduct_CE9_2: {
    width: H_W.width * 0.2,
    borderColor: colors.lightBackground2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: H_W.height * 0.01,
  },
  singleProduct_CE8: {
    fontWeight: 'bold',
    marginVertical: H_W.height * 0.002,
    fontSize: H_W.width * 0.042,
  },

  singleProduct_CE7: {
    fontSize: H_W.width * 0.035,
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  singleProduct_CE6: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProduct_CE5: {
    width: '100%',
    maxHeight: H_W.height * 0.15,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: H_W.width * 0.015,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_CE4: {
    fontSize: H_W.width * 0.037,
    lineHeight: H_W.height * 0.027,
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  singleProduct_CE3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: H_W.height * 0.008,
  },
  singleProduct_CE2: {
    borderColor: 'black',
    borderWidth: 1.5,
    backgroundColor: `rgba(255,255,255,0.4)`,
    borderRadius: 50,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_W.width * 0.015,
    paddingVertical: H_W.height * 0.01,
    // elevation: 2,
  },
  singleProduct_CE1: {
    height: H_W.height * 0.07,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    CeProduct: state.CeCrntPrdtReducer,
    CeFavs: state.CeToggleFav,
    CeCart: state.CeCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  CesetFavAction,
  CeremoveFavAction,
  CeremoveCartAction,
  CeaddCartAction,
})(React.memo(SingleProduct));
