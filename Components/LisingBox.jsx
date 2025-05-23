

import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DishDescription from './DishDescription';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/Slice/favoriteSlice';

const LisingBox = ({ image, title, id }) => {
    const [favorite, setFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();

    const handelFavorite = async (id) => {
        if (!favorite) {
            setFavorite(true);
            const data = JSON.stringify({ uId: id });
            await AsyncStorage.setItem('userId', data);
            dispatch(addFavorite({id,image,title}));
        } else {
            setFavorite(false);
            await AsyncStorage.removeItem('userId');
            dispatch(removeFavorite(id));
        }
    }

    return (
        <View style={style.box}>
            <View style={style.imageBox}>
                <Image source={{ uri: image }} style={style.dishImage} />
            </View>
            <View style={style.detailBox}>
                <View style={style.detais}>
                    <Text style={style.dishName}>{title}</Text>
                    <Pressable onPress={() => handelFavorite(id)}>
                        <View style={favorite ? style.addFav : style.favButton}>
                            <Ionicons name="heart-sharp" color={favorite ? 'red' : '#fff'} size={20} />
                            <Text style={style.favText}>{favorite ? "Remove From Favorite" : "Add To Favorite"}</Text>
                        </View>
                    </Pressable>
                </View>
                <Pressable onPress={()=>setOpen(true)}>
                    <View style={style.recipeBtn}>
                        <EvilIcons name="eye" color="#fff" size={20} />
                        <Text style={style.recipeText}>Show Details Recipe</Text>
                    </View>
                    <DishDescription open={open} setOpen={setOpen} id={id}/>
                </Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    box: {
        width: 350,
        boxShadow: '0 2px 4px rgba(0, 0, 0, .3)',
        borderRadius: 15,
        paddingBottom: 20,
        marginBottom: 20,
        maxHeight: 600
    },
    imageBox: {
        width: 350,
        height: 300,
        marginHorizontal: 'auto',

    },
    dishImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 15
    },
    detailBox: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    detais: {
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    dishName: {
        maxWidth: '40%',
        fontSize: 15,
        fontWeight: 'bold',
        transform: 'capitalize'
    },
    favButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9695ed',
        gap: 3,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 5
    },
    addFav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#157347',
        gap: 3,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 5
    },
    favText: {
        fontSize: 15,
        fontWeight: 'bold',
        transform: 'capitalize',
        color: '#fff',
    },
    recipeBtn: {
        marginTop: 20,
        width: '95%',
        marginHorizontal: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#536472',
        paddingVertical: 8,
        borderRadius: 4
    },
    recipeText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '880',
        transform: 'capitalize',
    }
})

export default LisingBox
