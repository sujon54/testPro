import React, { useState } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../../styles/globalStyles';
import defaultProduct from '../../assets/images/defaultProduct.png';
import {addCartTotal} from '../../store/reducer';

const product = ({item}) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.user);
  const navigation = useNavigation();
  const [isImgLoad, setIsImgLoad] = useState(true);

  const addToCart = async (cProduct) => {
      dispatch(addCartTotal());
      const cartItem = {
        itemId: cProduct.id,
        quantity: 1,
        price: cProduct.price,
        name: cProduct.name,
        // image: cProduct.product.images[0]
      }
      await AsyncStorage.getItem('basketItems')
        .then((data) => {
          const new_products = data != null ? JSON.parse(data) : [];
          new_products.push(cartItem);

          //save the value to AsyncStorage again
          AsyncStorage.setItem('basketItems', JSON.stringify(new_products))
          .then(() => {
            ToastAndroid.show(
              'Product added successfully',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
          )});
        });
  };

  return (
    <Card style={{marginVertical: 5, padding: 10}}>
      <TouchableOpacity
        // onPress={() => navigation.navigate('Product', {productId: item.id})}
        style={globalStyles.productSec}>
        <Image
          source={defaultProduct}
          resizeMethod="resize"
          resizeMode="contain"
          style={{width: '22%', height: 100}}
          onError={() => setIsImgLoad(false)}
        />
        {/* <Image
          source={isImgLoad ? {uri: item.images[0]} : defaultProduct}
          resizeMethod="resize"
          resizeMode="contain"
          style={{width: '22%', height: 100}}
          onError={() => setIsImgLoad(false)}
        /> */}
        <View style={{width: '70%', paddingHorizontal: 10}}>
          <Text style={{fontSize: 18, marginBottom: 10}}>{item.name}</Text>
          <Text>{item.price} tk</Text>
        </View>
        <TouchableOpacity style="8%" onPress={() => addToCart(item)}>
          <Icon
            name="plus"
            size={25}
            style={globalStyles.plusIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );
};

export default product;
