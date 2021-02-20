/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  CeremoveFavAction,
  CesetFavAction,
  CeremoveCartAction,
  CeaddCartAction,
  CesetCurrentProductAction,
} from '../CeRedux/CeActions';
import WrapperScreen from '../CeComp/WrapperScreen';
import {colors} from '../CeComp/CeColor';
import {Measurements} from '../CeComp/CeDim';
import RefNavigation from '../CeComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import MyHeader from '../CeComp/CeHeader';
import {FruityTiles} from './CeHome';
import Loop from '../CeComp/CeFlatList';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.CeCart.items]);
  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);
  const goBack = () => RefNavigation.Navigate('CeHome');

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.CeCart.items);
    let CeArr = [];
    CartArray.forEach((element) => {
      CeArr.push(props.CeCart.items[element]);
    });
    setHorizontalCartArray(CeArr);
  };

  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    RefNavigation.Navigate('CeSingleProduct');
  };

  const infoScreen = () => RefNavigation.Navigate('InfoScreen');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <MyHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconAction={goBack}
          Title="Cart"
        />
        <ScrollView>
          <View style={styles.TilesWrapper}>
            {HorizontalCartArray.length > 0 ? (
              <View style={styles.fav_SL1}>
                <Loop
                  data={HorizontalCartArray}
                  renderItem={({item}) => {
                    return (
                      <FruityTiles
                        item={item}
                        CeGoToSingleProduct={CeGoToSingleProduct}
                        CeFavs={props.CeFavs}
                        CeRemoveFavAct={(i) => props.CeremoveFavAction(i)}
                        CeSetFavAct={(i) => props.CesetFavAction(i)}
                        CeaddCartAction={(i) => props.CeaddCartAction(i)}
                        CeremoveCartAction={(i) => props.CeremoveCartAction(i)}
                        isCart={true}
                      />
                    );
                  }}
                />
              </View>
            ) : (
              <Text
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Your Cart is empty...
              </Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: colors.primary,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            width: Measurements.width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              marginTop: Measurements.height * 0.015,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.035,
              }}>
              Total Amount:
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.05,
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 8,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}>
              ${props.CeTotal}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              marginTop: Measurements.height * 0.015,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.035,
              }}>
              Payment Mode:
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.035,
              }}>
              Payment on Delivery
            </Text>
          </View>
          <View
            style={{
              paddingVertical: Measurements.height * 0.018,
              width: '80%',
            }}>
            <Button
              raised
              onPress={infoScreen}
              disabled={props.CeTotal < 1}
              title="PROCEED TO CHECKOUT"
              titleStyle={{
                fontSize: Measurements.width * 0.05,
                color: colors.primary,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                paddingVertical: Measurements.height * 0.015,
                backgroundColor: colors.secondary,
              }}
              containerStyle={{
                width: '100%',
                borderRadius: 50,
              }}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  TilesWrapper: {},
});

const mapStateToProps = (state) => ({
  CeCart: state.CeCartReducer,
  CeTotal: state.CeCartReducer.totalAmount,
  CeFavs: state.CeToggleFav,
});

export default connect(mapStateToProps, {
  CesetFavAction,
  CeremoveFavAction,
  CeremoveCartAction,
  CeaddCartAction,
  CesetCurrentProductAction,
})(Cart);
