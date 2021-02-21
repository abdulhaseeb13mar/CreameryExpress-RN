/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import WrapperScreen from '../CeComp/WrapperScreen';
import {colors} from '../CeComp/CeColor';
import {H_W} from '../CeComp/CeDim';
import Data from '../CeData';
import Loop from '../CeComp/CeFlatList';
import RefNavigation from '../CeComp/RefNavigation';
import {connect} from 'react-redux';
import {
  CesetCurrentProductAction,
  CeremoveFavAction,
  CesetFavAction,
} from '../CeRedux/CeActions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../CeComp/CeHeader';
import {Button} from 'react-native-elements';

function CeHome(props) {
  useEffect(() => {
    fill_Popular_Arrival();
  }, []);

  const [mostPopular, setMostPopular] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const fill_Popular_Arrival = () => {
    let popularLamps = [];
    let newArrivals = [];
    let len = Data.product.length;
    for (let ce = 0; ce < 10; ce++) {
      popularLamps.push(Data.product[ce]);
    }
    for (let x = 0; x < 10; x++) {
      newArrivals.push(Data.product[len - 1]);
      len--;
    }
    setMostPopular(popularLamps);
    setNewArrival(newArrivals);
  };

  const CeGotoFavourites = () => RefNavigation.NavigateAndReset('CeFavourites');
  const CeGotoCart = () => RefNavigation.NavigateAndReset('CeCart');
  const CeGotoSearch = () => RefNavigation.Navigate('SearchJuiceFruitify');
  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    RefNavigation.NavigateAndReset('CeSingleProduct');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{...border, flex: 1}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <MyHeader
            leftIcon={Ionicons}
            leftIconName="ios-heart-outline"
            leftIconAction={CeGotoFavourites}
            rightIconAction={CeGotoCart}
            rightIcon={Feather}
            rightIconName="search"
            Title={
              <Ionicons
                color={'black'}
                size={H_W.width * 0.09}
                name="ios-ice-cream-outline"
              />
            }
          />
          <View style={{...border}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: H_W.width * 0.065,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 27,
                }}>
                Top Flavours
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.lightGrey3,
                    fontSize: 15,
                    fontWeight: 'bold',
                    borderBottomColor: colors.lightGrey3,
                    borderBottomWidth: 2,
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <Loop
              data={mostPopular}
              renderItem={({item}) => (
                <HorizontalList
                  item={item}
                  // CeGoToSingleProduct={CeGoToSingleProduct}
                  // CeFavs={props.CeFavs}
                  // CeRemoveFavAct={(i) => props.CeremoveFavAction(i)}
                  // CeSetFavAct={(i) => props.CesetFavAction(i)}
                />
              )}
            />
          </View>
          <View style={{...border}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: H_W.width * 0.065,
                // marginTop: H_W.height * 0.01,
                // marginBottom: H_W.height * 0.008,
                ...border,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 27,
                }}>
                New Flavours
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.lightGrey3,
                    fontSize: 15,
                    fontWeight: 'bold',
                    borderBottomColor: colors.lightGrey3,
                    borderBottomWidth: 2,
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <Loop
              data={newArrival}
              renderItem={({item}) => (
                <HorizontalList
                  item={item}
                  // CeGoToSingleProduct={CeGoToSingleProduct}
                  // CeFavs={props.CeFavs}
                  // CeRemoveFavAct={(i) => props.CeremoveFavAction(i)}
                  // CeSetFavAct={(i) => props.CesetFavAction(i)}
                />
              )}
            />
          </View>
        </ScrollView>
        <View
          style={{
            height: H_W.height * 0.2,
            borderTopRightRadius: 45,
            borderTopLeftRadius: 45,
            backgroundColor: `rgba(${colors.rgb_Primary},1)`,
            position: 'relative',
            paddingHorizontal: H_W.width * 0.07,
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'black',
            borderBottomColor: 'transparent',
          }}>
          <View style={{...border}}>
            <Text
              style={{
                ...border,
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Total: $12.50
            </Text>
            <Button
              title="Order Now"
              raised
              titleStyle={{
                color: colors.primary,
                textShadowColor: '#bcbcbc',
                textShadowOffset: {width: 2, height: 2},
                textShadowRadius: 2,
              }}
              buttonStyle={{
                ...border,
                backgroundColor: 'white',
                borderRadius: 10,
              }}
              containerStyle={{...border, marginTop: 8, width: '40%'}}
            />
          </View>
          <ImageBackground
            source={require('../CeAssets/ice22.png')}
            style={{
              width: H_W.width * 0.4,
              height: H_W.height * 0.3,
              position: 'absolute',
              right: 0,
              top: -H_W.height * 0.05,
              ...border,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </WrapperScreen>
  );
}

export const HorizontalList = ({item, op}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 20,
      }}>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: 'white',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        }}>
        <View
          style={{
            backgroundColor: `rgba(${colors.rgb_Primary},0.3)`,
            paddingLeft: H_W.width * 0.06,
            paddingBottom: H_W.height * 0.02,
            width: H_W.width * 0.5,
            borderRadius: 50,
          }}>
          <ImageBackground
            source={item.images}
            style={{
              width: H_W.width * 0.28,
              height: H_W.height * 0.13,
              alignSelf: 'flex-end',
              marginTop: -10,
              marginRight: -10,
            }}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                fontSize: 19,
                color: colors.primary,
                fontWeight: 'bold',
                width: '100%',
                textShadowColor: '#bcbcbc',
                textShadowOffset: {width: 2, height: 2},
                textShadowRadius: 2,
              }}>
              {item.names}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              ${item.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const border = {
  // borderColor: 'red',
  // borderWidth: 1,
};

const styles = StyleSheet.create({
  home_TE17: {
    flexDirection: 'row',
    marginVertical: H_W.height * 0.013,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  home_TE16: {
    width: '50%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 3,
    paddingHorizontal: H_W.width * 0.03,
    paddingVertical: H_W.height * 0.003,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  CeHome_SL9: {},
  CeHome_SL8: {},
  CeHome_SL7: {},
  CeHome_SL5: {},
  CeHome_SL4: {},
  CeHome_SL3: {},
  CeHome_SL2: {},
  CeHome_SL1: {},
  home_TE6: {},
  home_TE7: {},
  home_TE15: {},
  home_TE14: {},
  home_TE13: {},
  home_TE11: {},
  home_TE10: {},
  home_TE9: {},
  home_TE8: {},
  EP_7: {},
  EP_7_2: {},
  EP_6: {},
  EP_5: {},
  EP_4: {},
  EP_3: {},
  EP_2: {},
  EP_1: {},
  HomeTabsText: {
    fontWeight: '700',
    // fontSize: H_W.width * 0.047,
  },
  HomeTabsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: H_W.width * 0.04,
    width: H_W.width * 0.2,
    height: H_W.height * 0.1,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  ExploreTileWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 20,
    marginVertical: H_W.height * 0.008,
    marginHorizontal: H_W.width * 0.05,
  },
});

const mapStateToProps = (state) => {
  return {
    CeFavs: state.CeToggleFav,
  };
};

export default connect(mapStateToProps, {
  CesetCurrentProductAction,
  CeremoveFavAction,
  CesetFavAction,
})(CeHome);
