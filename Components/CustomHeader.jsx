

import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, BackHandler, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = () => {
    return (
        <View style={style.main}>
                <TouchableOpacity onPress={() => { BackHandler.exitApp() }}>
                    <Icon name="arrow-back" color="#000" size={24} />
                </TouchableOpacity>
        </View>
    )
}

export default CustomHeader;

const style = StyleSheet.create({
    main: {
        backgroundColor: '#9695ed',
        marginTop: 50,
        paddingVertical: 10
    }
})
