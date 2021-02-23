/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {
  CeremoveCartAction,
  CeaddCartAction,
  CesetCurrentProductAction,
} from '../CeRedux/CeActions';
import WrapperScreen from '../CeComp/WrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../CeComp/CeColor';
import {H_W} from '../CeComp/CeDim';
import RefNavigation from '../CeComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import MyHeader from '../CeComp/CeHeader';
import {HorizontalList} from './CeHome';
import CeItemCounterWrapper from '../CeComp/CeItemCounterWrapper';

export const Cart = (props) => {
  const insets = useSafeAreaInsets();
  const CeCartArray = Object.keys(props.CeCart);
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const goBack = () => RefNavigation.Navigate('CeHome');

  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    RefNavigation.Navigate('CeSP');
  };

  const CeinfoScreen = () => RefNavigation.Navigate('CeContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <MyHeader
            leftIcon={Entypo}
            leftIconName="chevron-left"
            leftIconAction={goBack}
            Title="Cart"
            leftIconStyle={{
              textShadowColor: '#bcbcbc',
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 2,
            }}
            titleStyle={{
              textShadowColor: '#bcbcbc',
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 2,
            }}
          />
          <View style={styles.TilesWrapper}>
            {CeCartArray.length > 0 ? (
              CeCartArray.map((id, index) => {
                const item = props.CeCart[id];
                return (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CeItemCounterWrapper
                      position="left"
                      Counterlength={HEIGHT * 0.11}
                      style={{margin: 17}}
                      item={item}
                      CeGoToSingleProduct={CeGoToSingleProduct}>
                      <HorizontalList
                        item={item}
                        CeGoToSingleProduct={CeGoToSingleProduct}
                        cart={true}
                      />
                    </CeItemCounterWrapper>
                  </View>
                );
              })
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
            marginBottom: -insets.bottom,
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
              Total: ${props.CeTotal}
            </Text>
            <Button
              onPress={CeinfoScreen}
              title="Checkout"
              disabled={props.CeTotal < 1}
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
};
const border = {
  // borderColor: 'red',
  // borderWidth: 1,
};
const styles = StyleSheet.create({
  TilesWrapper: {},
});

const mapStateToProps = (state) => ({
  CeCart: state.CeCartReducer.items,
  CeTotal: state.CeCartReducer.totalAmount,
});

export default connect(mapStateToProps, {
  CeremoveCartAction,
  CeaddCartAction,
  CesetCurrentProductAction,
})(Cart);
