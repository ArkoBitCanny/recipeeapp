import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Linking, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { dishApiSearch, randomApiData } from '../redux/Slice/dishesRedux';
import { deleteLists } from '../redux/Slice/listingSlice';

const TopbarComponent = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [focus, setFocus] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handelTextChange = (text) => {
        text = text.trim();
        if (text.length === 0) {
            dispatch(randomApiData())
        }
        dispatch(deleteLists());
        dispatch(dishApiSearch(text.charAt(0)));
    }

    return (
        <View style={style.header}>
            {
                !openSearch
                    ?
                    <Pressable onPress={() => Linking.openURL('/')}>
                        <View style={style.imageBox}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: 'https://marketplace.canva.com/EAFeaUjq_fA/1/0/1003w/canva-beige-simple-sketch-illustration-recipe-book-cover-KGMSotYMFUo.jpg' }}
                            />
                        </View>
                    </Pressable>
                    :
                    <Pressable onPress={() => setOpenSearch(false)}>
                        <Icon name="long-arrow-left" size={35} color="#ffe7c1" />
                    </Pressable>
            }

            {
                openSearch &&
                <TextInput
                    style={!focus ? style.textInputWithOutBoder : style.textInputWithBoder}
                    placeholder='search recipe name'
                    placeholderTextColor={`#fff`}
                    onFocus={() => setFocus(true)}
                    onChangeText={(text) => setText(text)}
                    value={text}
                />
            }

            {
                !openSearch
                    ?
                    <Pressable style={style.searchIconBox} onPress={() => setOpenSearch(true)}>
                        <Icon name="search" size={30} color="#9695ed" />
                    </Pressable>
                    :
                    <Pressable onPress={() => handelTextChange(text)}>
                        <Icon name="search" size={25} color="#ffe7c1" />
                    </Pressable>
            }

        </View>
    )
}


const style = StyleSheet.create({
    header: {
        backgroundColor: "#9695ed",
        boxShadow: '0 2px 4px rgba(0, 0, 0, .3)',
        paddingHorizontal: 20,
        paddingVertical: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        minHeight: 70

    },
    imageBox: {
        width: 50,
        height: 50
    },
    searchIconBox: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputWithBoder: {
        width: '75%',
        borderWidth: 0,
        outlineWidth: 0,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#ffe7c1',
        paddingBottom: 10
    },
    textInputWithOutBoder: {
        width: '75%',
        borderWidth: 0,
        outlineWidth: 0,
        fontSize: 20,
        fontWeight: 'bold',
    }
})
export default TopbarComponent;
