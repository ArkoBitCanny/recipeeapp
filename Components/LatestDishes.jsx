import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { listSelector } from '../redux/Slice/listingSlice'
import LisingBox from './LisingBox'

const LatestDishes = () => {

    const latest = useSelector(listSelector);
    return (
        <ScrollView>
            {
                latest.length <= 0
                    ?
                    <View style={style.latestBox}>
                        <ActivityIndicator size='large' color='#9695ed' />
                        <Text style={style.text}>Loading new recipes please wait</Text>
                    </View>
                    :
                    latest?.map((ele) => {
                        const { strMeal, strMealThumb, idMeal } = ele;
                        return <LisingBox key={idMeal} image={strMealThumb} title={strMeal} id={idMeal} />
                    })
            }
        </ScrollView>
    )
}

const style = StyleSheet.create({
    latestBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap:10,
        height: 300,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#9695ed',
        borderRadius: 8
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        transform:'capitalize'
    }
})

export default LatestDishes
