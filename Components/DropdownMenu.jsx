import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, ActivityIndicator, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { countryWiseDish, dishSelector, randomApiData } from '../redux/Slice/dishesRedux';
import LatestDishes from './LatestDishes';
import { deleteLists } from '../redux/Slice/listingSlice';

const DropdownMenu = () => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);


    let data = useSelector(dishSelector);
    const dispatch = useDispatch();

    const handelSelect = (index, country) => {
        setIndex(index);
        setOpen(false);

        // Last Work
        if (country !== "All World") {
            dispatch(countryWiseDish(country));
        } else if (country === "All World") {
            dispatch(deleteLists());
            dispatch(randomApiData());
        }
    }

    const loadNewLisings = () => {
        dispatch(deleteLists());
        dispatch(randomApiData());
    }

    if (data.length <= 1) return <ActivityIndicator color="#9695ed" size="large" style={{ marginTop: 20, margin: 'auto' }} />


    return (
        <View style={style.dropMain}>
            <View style={{ width: 287, position: 'relative' }}>
                <Pressable style={{ display: 'flex', paddingLeft: 10, backgroundColor: '#ccc', boxShadow: `0 2px 2px rgba(0, 0, 0, .3)`, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}
                    onPress={() => setOpen(prev => !prev)}
                >
                    <Text style={style.dropTitle}>{data[index].strArea} Recipes</Text>
                    <View style={{ backgroundColor: '#000', padding: 12, height: '100%' }}>
                        <MaterialCommunityIcons name={open ? `toggle-up` : `toggle-down`} color="#fff" size={40} />
                    </View>
                </Pressable>
                <Modal
                    visible={open}
                    animationType='fade'
                    transparent={false}
                >
                    <ScrollView>
                        {
                            data?.map((ele, i) => <Pressable key={i} onPress={() => handelSelect(i, ele.strArea)}>
                                <Text style={index === i ? style.selectDish : style.dish}>{ele.strArea} Recipes</Text>
                            </Pressable>)
                        }
                    </ScrollView>
                </Modal>
            </View>
            {
                index === 0
                    ?
                    <Pressable onPress={loadNewLisings}>
                        <View style={style.newrecipeBox}>
                            <View style={style.reloadBox}>
                                <Ionicons name="reload" color="#9695ed" size={24} />
                                <Text style={style.reloadText}>Load new recipes</Text>
                            </View>
                        </View>
                    </Pressable>
                    :
                    null
            }

            <View style={{ marginTop: 30 }}>
                <LatestDishes />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    dropMain: {
        padding: 20,
        marginTop: 40,
        height: 'auto'
    },
    dropTitle: {
        fontSize: 20,
        fontWeight: 750
    },
    dropimageBox: {
        width: 30,
        height: 30,
    },
    dropLists: {
        paddingTop: 10,
        width: 287,
        position: 'absolute',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 4px rgba(0, 0, 0, .7)',
        top: 70,
        left: 0,
        height: 400,
        zIndex: 100,
    },
    newrecipeBox: {
        marginTop: 20,
        display: "flex",
        flexDirection: 'row-reverse',
    },
    reloadBox: {
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#9695ed',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    reloadText: {
        fontSize: 20,
        color: '#9695ed',
        fontWeight: 880
    },
    dish: {
        padding: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 880,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    selectDish: {
        backgroundColor: '#ccc',
        padding: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 880,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
})

export default DropdownMenu;
