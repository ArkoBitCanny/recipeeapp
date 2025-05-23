import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native';
import TopbarComponent from './Components/TopbarComponent';
import DropdownMenu from './Components/DropdownMenu';
import { useDispatch } from 'react-redux';
import { backendDishData, randomApiData } from './redux/Slice/dishesRedux';
import FavoriteDishes from './Components/FavoriteDishes';

const App = () => {

  const dispatch=useDispatch();
  
  useEffect(() => {
    dispatch(backendDishData());
    dispatch(randomApiData());
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={Platform.OS === 'android' ? style.containerFluid : style.containerFluidIos}>
        <TopbarComponent />
        <FavoriteDishes/>
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

export default App
