import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../assets/colors/Colors';
import globalStyles from '../../styles/globalStyles';
import defaultProduct from '../../assets/images/defaultProduct.png';
import { subCartTotal } from '../../store/reducer';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const [state, setState] = useState({
    basketItems: [],
    cartTotal: 0,
    isImgLoad: true
  });

  useEffect(() => {
    getItems();
  }, []);
  
  const getItems = async() => {
    await AsyncStorage.getItem('basketItems').then((data) => {
      if(data !== null){
        let price = 0;
        JSON.parse(data).forEach(item => {
          price += item.price * item.quantity;
        });
        setState({...state, cartTotal: price, basketItems: JSON.parse(data)});
      } else{
        setState({...state, cartTotal: 0, basketItems: []});
      }
    });
  }

  const cartItemQntDcrHandler = async(itemId) => {
    let price = 0;
    const newCartItems = [];
    state.basketItems.map((cart) => {
      if (itemId == cart.itemId) {
        if (cart.quantity > 1) {
          let newQuantity = cart.quantity - 1;
          let cartItem = {
            itemId: cart.itemId,
            quantity: newQuantity,
            price: cart.price,
            image: cart.image,
            name: cart.name,
          };
          newCartItems.push(cartItem);
        } else {
          newCartItems.push(cart);
        }
      } else {
        newCartItems.push(cart);
      }
    });

    await AsyncStorage.setItem("basketItems", JSON.stringify(newCartItems));
    await AsyncStorage.getItem('basketItems').then((data) => {
      if(data !== null){
        JSON.parse(data).forEach(item => {
          price += item.price * item.quantity;
        });
      }
    });
    setState({...state, basketItems:newCartItems, cartTotal: price});
  };

  const cartItemQntIncHandler = async(itemId) => {
    let price = 0;
    const newCartItems = [];
    state.basketItems.map((cart) => {
      if (itemId == cart.itemId) {
        let newQuantity = cart.quantity + 1;
        let cartItem = {
          itemId: cart.itemId,
          quantity: newQuantity,
          price: cart.price,
          image: cart.image,
          name: cart.name,
        };
        newCartItems.push(cartItem);
      } else {
        newCartItems.push(cart);
      }
    });

    await AsyncStorage.setItem("basketItems", JSON.stringify(newCartItems));
    await AsyncStorage.getItem('basketItems').then((data) => {
      if(data !== null){
        JSON.parse(data).forEach(item => {
          price += item.price * item.quantity;
        });
      }
    });
    setState({...state, basketItems: newCartItems, cartTotal: price});
  };

  const removeItem = async(id) => {
    dispatch(subCartTotal());
    await AsyncStorage.getItem('basketItems').then(value => {
      let items = JSON.parse(value)
      if (value !== null){
        items = items.filter(item => item.itemId !== id);
      }
      AsyncStorage.setItem('basketItems', JSON.stringify(items)).then(() => getItems());
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={state.basketItems}
        renderItem={({item}) => (
          <Card style={{marginVertical: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={defaultProduct}
                style={styles.img}
                onError={() => setState({...state, isImgLoad: false})}
              />
              <View style={styles.namePriceSec}>
                <View style={styles.nameAndPriceRow}>
                  <Text style={{fontSize: 18}}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeItem(item.itemId)}>
                    <Icon name="close" size={20} />
                  </TouchableOpacity>
                </View>
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.price}>{item.price * item.quantity}tk</Text>
                  <View style={globalStyles.productSec}>
                    <TouchableOpacity onPress={() => cartItemQntDcrHandler(item.itemId)}>
                      <Icon name="minus-circle-outline" size={30} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={{marginHorizontal: 15, fontSize: 18}}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => cartItemQntIncHandler(item.itemId)}>
                      <Icon name="plus-circle-outline" size={30} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{paddingHorizontal: 10}}
        ListHeaderComponent={
          <Text style={{marginVertical: 10}}>{state.basketItems.length} Items in Cart</Text>
        }
      />

      <View style={{backgroundColor: colors.white}}>
        <View style={styles.checkoutSec}>
          <Text style={{fontSize: 18}}>Total</Text>
          <Text style={{color: colors.primary, fontSize: 18}}>{state.cartTotal} tk</Text>
        </View>
        <Button
          color={colors.white}
          uppercase={false}
          labelStyle={{fontSize: 14}}
          style={{backgroundColor: colors.primary, margin: 10}}
          onPress={() =>
            state.basketItems.length ? 
            //   navigation.navigate('Checkout', {total: state.cartTotal})
            null
              :
              ToastAndroid.show(
                'Cart is empty, please add item.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
          }
          >
          Checkout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  namePriceSec: {
    width: '70%',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  nameAndPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  img: {
    width: '30%',
    height: 120,
  },
  checkoutSec: {
    borderTopWidth: 1,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopColor: colors.gray,
    justifyContent: 'space-between',
  },
  checkoutBtn: {
    borderRadius: 20,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});
