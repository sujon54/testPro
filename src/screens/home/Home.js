import axios from "axios";
import React, { useEffect, useState } from "react";
import {SafeAreaView, View, FlatList, Text, ActivityIndicator} from 'react-native';

import Product from "./Product";
import globalStyles from "../../styles/globalStyles";

const Home = () => {
    const [state, setState] = useState({
        products: [],
        loading: true,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async() => {
        const data = await axios.get('https://66d6a3fc006bfbe2e64dfce3.mockapi.io/api/products/products');
        setState(prevState => ({
            ...prevState,
            products: data.data,
            loading: false
        }));
    }

    if(state.loading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large'  />
            </View>
        );
    }

    return(
        <SafeAreaView>
            {state.products.length ?
                <FlatList
                    data={state.products}
                    renderItem={({item, index}) => <Product item={item} />}
                    keyExtractor={(item, index) => index}
                    style={globalStyles.paddingHorFifteen}
                />
                : <Text style={globalStyles.noDataSec}>No data found</Text>
            }
        </SafeAreaView>
    );
}

export default Home;