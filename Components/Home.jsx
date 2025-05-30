import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Platform, BackHandler } from 'react-native';
import TopbarComponent from './TopbarComponent';
import FavoriteDishes from './FavoriteDishes'
import DropdownMenu from './DropdownMenu';
import { useDispatch } from 'react-redux';
import { backendDishData, randomApiData } from '../redux/Slice/dishesRedux';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(backendDishData());
        dispatch(randomApiData());

        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();

    }, []);
    return (
        <SafeAreaView>
            <ScrollView style={Platform.OS === 'android' ? style.containerFluid : style.containerFluidIos}>
                <TopbarComponent />
                <FavoriteDishes />
                <DropdownMenu />
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    containerFluid: {
        width: '96%',
        marginHorizontal: "auto",
        marginTop: 57,
        backgroundColor: '#fff'
    },
    containerFluidIos: {
        width: '96%',
        marginHorizontal: "auto",
        backgroundColor: '#fff'
    }
})
export default Home
