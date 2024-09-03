import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { userSetup } from '../store/reducer';
import Home from '../screens/home/Home';
import Cart from '../screens/cart/Cart';
import HeaderRight from '../components/HeaderRight';

enableScreens(true);

const Stack = createNativeStackNavigator();

const container = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.user);
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('TOKEN');
      const cartTotal = await AsyncStorage.getItem('basketItems');
      if (cartTotal) {
        dispatch(userSetup({cartTotal}));
      }
    }
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
            headerRight: () => <HeaderRight />
        }} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default container;
