/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {H_W} from './CeDim';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from './CeColor';
import {CeaddCartAction, CeremoveCartAction} from '../CeRedux/CeActions';

const ItemCounterWrapper = ({style, position, Counterlength, ...props}) => {
  return (
    <View
      style={{
        ...style,
        alignItems: 'center',
        flexDirection:
          position === 'top' || position === 'bottom' ? 'column' : 'row',
      }}>
      {(position === 'top' || position === 'left') && (
        // <View
        //   style={{
        //     // alignSelf: 'stretch',
        //     // alignItems: 'center',
        //     justifyContent: 'center',
        //     height: '100%',
        //     borderWidth: 1.5,
        //   }}>
        <DefaultCounter
          position={position}
          item={props.item}
          CeGoToSingleProduct={props.CeGoToSingleProduct}
          CeaddCart={(i) => props.CeaddCartAction(i)}
          CeremoveCart={(i) => props.CeremoveCartAction(i)}
          Counterlength={Counterlength}
        />
        // </View>
      )}
      {props.children}
      {(position === 'bottom' || position === 'right') && (
        // <View
        //   style={{
        //     alignSelf: 'stretch',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //   }}>
        <DefaultCounter
          position={position}
          item={props.item}
          CeGoToSingleProduct={props.CeGoToSingleProduct}
          CeaddCart={(i) => props.CeaddCartAction(i)}
          CeremoveCart={(i) => props.CeremoveCartAction(i)}
          Counterlength={Counterlength}
        />
        // </View>
      )}
    </View>
  );
};

const DefaultCounter = ({
  item,
  CeremoveCart,
  CeaddCart,
  position,
  Counterlength,
}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        ...styles.home_TE16,
        paddingVertical: HEIGHT * 0.003,
      }}>
      <View
        style={{
          ...styles.home_TE17,
          marginVertical: HEIGHT * 0.013,
          ...(position === 'top' || position === 'bottom'
            ? {width: Counterlength}
            : {height: Counterlength}),
          flexDirection:
            position === 'top' || position === 'bottom' ? 'row' : 'column',
        }}>
        <TouchableOpacity onPress={() => CeremoveCart(item)}>
          <Feather
            name="minus-circle"
            size={H_W.width * 0.05}
            color={'black'}
          />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', color: 'black'}}>{item.added}</Text>
        <TouchableOpacity onPress={() => CeaddCart(item)}>
          <Feather name="plus-circle" size={H_W.width * 0.05} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const styles = StyleSheet.create({
  home_TE17: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  home_TE16: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    paddingHorizontal: H_W.width * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default connect(mapStateToProps, {CeaddCartAction, CeremoveCartAction})(
  ItemCounterWrapper,
);
