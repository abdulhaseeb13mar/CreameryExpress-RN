/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../CeComp/WrapperScreen';
import {H_W} from '../CeComp/CeDim';
import NavigationRef from '../CeComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../CeComp/CeSearchBar';
import Data from '../CeData';
import {FruityTiles} from './CeHome';
import Loop from '../CeComp/CeFlatList';
import {connect} from 'react-redux';
import {
  CesetCurrentProductAction,
  CeremoveFavAction,
  CesetFavAction,
} from '../CeRedux/CeActions';
import UseHeader from '../CeComp/CeHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    NavigationRef.Navigate('CeSingleProduct');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        data={Arr}
        renderItem={({item}) => (
          <FruityTiles
            item={item}
            CeGoToSingleProduct={CeGoToSingleProduct}
            CeFavs={props.CeFavs}
            CeRemoveFavAct={(i) => props.CeremoveFavAction(i)}
            CeSetFavAct={(i) => props.CesetFavAction(i)}
          />
        )}
      />
    );
  };
  const CeGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        Title="Everything Here"
        leftIconAction={CeGoBack}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginTop: H_W.height * 0.03}}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  CeFavs: state.CeToggleFav,
});

export default connect(mapStateToProps, {
  CesetCurrentProductAction,
  CeremoveFavAction,
  CesetFavAction,
})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: H_W.width * 0.03,
    paddingVertical: H_W.height * 0.018,
  },
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: H_W.height * 0.003,
  },
  container: {flex: 1},
});
