import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './CeComp/RefNavigation';
import CeHome from './CeSrc/CeHome';
import CeSP from './CeSrc/CeSP';
// import CeCart from './Main/CeCart';
// import InfoScreen from './Main/InfoScreen';
// import SearchJuiceFruitify from './Main/SearchJuiceFruitify';
// import CeFavourites from './Main/CeFavourites';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="CeSP"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="CeHome" component={CeHome} />
        <Stack.Screen name="CeSP" component={CeSP} />
        {/* <Stack.Screen name="CeCart" component={CeCart} /> */}
        {/* <Stack.Screen
          name="SearchJuiceFruitify"
          component={SearchJuiceFruitify}
        /> */}
        {/* <Stack.Screen name="CeFavourites" component={CeFavourites} /> */}
        {/* <Stack.Screen name="InfoScreen" component={InfoScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
