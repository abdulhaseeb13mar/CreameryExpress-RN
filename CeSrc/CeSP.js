/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {H_W} from '../CeComp/CeDim';
import WrapperScreen from '../CeComp/WrapperScreen';
import {connect} from 'react-redux';
import {Button, SocialIcon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Data from '../CeData';
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
    fetchFlavours();
    // checkIfFav();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [fav, setFav] = useState(false);
  const [sugarLevel, setSugarLevel] = useState('0%');
  const [flavours, setFlavours] = useState([]);
  const [size, setSize] = useState({size: 'Small', amount: '125ml'});
  const CeProduct = props.CeProduct;

  const fetchFlavours = () => {
    let fc = 0;
    let fl = [];
    for (let ce = 0; ce < Data.topping.length; ce++) {
      if (Data.topping[ce].productid === CeProduct.id) {
        fl.push(Data.topping[ce]);
        if (fc === 3) {
          break;
        }
        fc++;
      }
    }
    console.log(fl);
    setFlavours(fl);
  };
  // const checkIfFav = () => {
  //   for (let us = 0; us < props.CeFavs.length; us++) {
  //     if (props.CeFavs[us].id === CeProduct.id) {
  //       setFav(true);
  //       break;
  //     }
  //   }
  // };

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
              {/* <View style={styles.singleProduct_CE2}>
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
              </View> */}
              <View
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
              </View>
            </View>
            <Text
              style={{...styles.singleProduct_CE12, marginTop: HEIGHT * 0.02}}>
              {CeProduct.names}
            </Text>
            <Text style={styles.singleProduct_CE11}>${CeProduct.price}</Text>
          </View>

          <View
            style={{
              ...border,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: HEIGHT * 0.02,
            }}>
            {flavours.map((fl, index) => (
              <View
                key={index}
                style={{
                  alignSelf:
                    index === 0
                      ? 'flex-start'
                      : index === 1
                      ? 'center'
                      : 'flex-end',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  paddingLeft: H_W.width * 0.03,
                  backgroundColor: colors.primary,
                  elevation: 2,
                  marginVertical: HEIGHT * 0.002,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginRight: H_W.width * 0.02,
                  }}>
                  {fl.topping}
                </Text>
                <TouchableOpacity
                  style={{
                    // ...border,
                    width: H_W.width * 0.11,
                    height: H_W.width * 0.11,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    borderColor: colors.primary,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Entypo name="plus" color="black" size={22} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={{...border, marginBottom: '10%'}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.darkGray,
                lineHeight: 22,
              }}>
              {CeProduct.details}
            </Text>
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
    backgroundColor: 'rgba(255,255,255,0.6)',
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
