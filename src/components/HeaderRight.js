import React from 'react';
import {useSelector} from 'react-redux';
import { Badge } from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const headerRight = () => {
  const navigation = useNavigation();
  const state = useSelector((state) => state.user);

  return (
    <View style={{flexDirection: 'row', marginRight: 15}}>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" size={25} />
        {state.cartTotal > 0 ? 
          <Badge size={15} style={globalStyles.badge}>{state.cartTotal}</Badge>
        : null}
      </TouchableOpacity>
    </View>
  );
};

export default headerRight;
