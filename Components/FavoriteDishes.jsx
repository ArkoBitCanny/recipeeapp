
import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteSelector, removeFavorite } from '../redux/Slice/favoriteSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');
const itemWidth = width * 0.7;
const itemMargin = 10;


const FoodListSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const foodData = useSelector(favoriteSelector);
    const dispatch = useDispatch();

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / (itemWidth + itemMargin));
        setCurrentIndex(newIndex);
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            scrollViewRef.current?.scrollTo({
                x: (currentIndex - 1) * (itemWidth + itemMargin),
                animated: true,
            });
        }
    };

    const handleNext = () => {
        if (currentIndex < foodData.length - 1) {
            scrollViewRef.current?.scrollTo({
                x: (currentIndex + 1) * (itemWidth + itemMargin),
                animated: true,
            });
        }
    };

    const handelRemove = async (id) => {
        dispatch(removeFavorite(id));
        setCurrentIndex(0);
        await AsyncStorage.removeItem('userId');
    }

    if (foodData.length < 1) return null

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.arrowButton} onPress={handlePrev} disabled={currentIndex === 0}>
                <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={itemWidth + itemMargin}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {foodData.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <TouchableOpacity style={{ position: 'absolute', top: 15, right: 15, borderRadius: '50%', backgroundColor: '#000067', padding: 10, zIndex: 20 }} onPress={() => handelRemove(item.id)}>
                            <FontAwesome name="close" color="red" size={24} />
                        </TouchableOpacity>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.title}</Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.arrowButton}
                onPress={handleNext}
                disabled={currentIndex === foodData.length - 1}
            >
                <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 20,
        position: 'relative'
    },
    scrollViewContent: {
        paddingLeft: 10,
    },
    itemContainer: {
        width: itemWidth,
        marginRight: itemMargin,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 16,
        color: 'green',
    },
    arrowButton: {
        backgroundColor: '#eee',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default FoodListSlider;