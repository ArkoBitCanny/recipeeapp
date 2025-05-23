

import React from 'react'
import { View, Modal, ScrollView, Text, StyleSheet, Pressable, Image, Button, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { listSelector } from '../redux/Slice/listingSlice'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const DishDescription = ({ open, setOpen, id }) => {

    const data = useSelector(listSelector);
    const dish = data?.filter(ele => ele.idMeal === id);
    const {
        strMeal,
        strMealThumb,
        strArea,
        strCategory,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
    } = dish[0];

    const ingradients = [
        { ingradient: strIngredient1, measure: strMeasure1 },
        { ingradient: strIngredient2, measure: strMeasure2 },
        { ingradient: strIngredient3, measure: strMeasure3 },
        { ingradient: strIngredient4, measure: strMeasure4 },
        { ingradient: strIngredient5, measure: strMeasure5 },
        { ingradient: strIngredient6, measure: strMeasure6 },
        { ingradient: strIngredient7, measure: strMeasure7 },
        { ingradient: strIngredient8, measure: strMeasure8 },
    ]

    return (
        <Modal
            animationType='slide'
            visible={open}
            transparent={false}
        >
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <View style={style.titleSection}>
                    <Text style={style.title}>{strMeal}</Text>
                    <Pressable onPress={() => setOpen(false)}>
                        <FontAwesome name="close" color="#000" size={30} />
                    </Pressable>
                </View>
                <View style={style.imageBox}>
                    <Image style={style.pic} source={{ uri: strMealThumb }} />
                </View>
                <View style={style.categoryBox}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Category: </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <Text style={{ paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#157347', color: '#fff', fontSize: 20, fontWeight: 'bold', borderRadius: 5 }}>{strArea}</Text>
                        <Text style={{ paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#31b4ce', color: '#fff', fontSize: 20, fontWeight: 'bold', borderRadius: 5 }}>{strCategory}</Text>
                    </View>
                </View>
                <View style={style.instructionBox}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Instructions:</Text>
                    <Text style={style.instruction}>{strInstructions}</Text>
                </View>
                <View style={style.ingradientBox}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', borderBottomColor: '#000', borderBottomWidth: 2 }}>Ingradients</Text>
                    <View style={style.ingradientList}>
                        {
                            ingradients.map((ele, i) => {
                                return <Text key={i} style={{ fontSize: 18, fontWeight: 'bold' }}>{ele.ingradient}: ({ele.measure})</Text>
                            })
                        }
                    </View>
                </View>
                <Text style={{ width: '100%', height: 1.5, backgroundColor: '#000', marginVertical: 17 }}></Text>
                <View style={{ width: '100%', paddingVertical: 19, display: 'flex', alignItems: 'flex-end', paddingHorizontal: 25 }}>
                    <TouchableOpacity style={{ maxWidth: '25%', paddingVertical: 8, backgroundColor: '#555b61', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexDirection: 'row', paddingHorizontal: 15, borderRadius: 5 }} onPress={() => setOpen(false)}>
                        <FontAwesome name='close' color="#fff" size={16} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    )
}

const style = StyleSheet.create({
    titleSection: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderBottomColor: '#ccc'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    imageBox: {
        marginHorizontal: 'auto',
        marginVertical: 20,
        width: '80%',
        height: 300,
    },
    pic: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    categoryBox: {
        marginVertical: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 15,
        maxWidth: '90%',
    },
    instructionBox: {
        marginVertical: 10,
        maxWidth: '90%',
        textAlign: 'left'
    },
    instruction: {
        fontSize: 18,
        fontWeight: 888,
    },
    ingradientBox: {
        // display: 'flex',
        // alignItems: 'flex-start',
        // justifyContent: 'center',
        // gap: 20
        textAlign: 'left',
    },
    ingradientList: {
        paddingVertical: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 13
    }

})

export default DishDescription
