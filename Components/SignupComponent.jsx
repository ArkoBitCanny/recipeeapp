import axios from 'axios';
import React, { useState, useTransition } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';

const SignupComponent = ({navigation}) => {
    const [toggle, setToggle] = useState('login');
    const [userDetail, setUserDetail] = useState({
        name: "",
        mail: "",
        password: "",
        cPass: ""
    })
    const [loading, startTransition] = useTransition();

    const handelChange = (name, value) => {
        setUserDetail({ ...userDetail, [name]: value });
    }

    const handelForm = () => {
        if (toggle === 'login') setToggle('signup');
        else setToggle('login');
    }

    const handelSubmit = () => {
        const url = toggle === 'login' ?
            'https://da21-2409-40e0-40-3fe0-a143-498b-9774-3ee5.ngrok-free.app/api/user/login'
            :
            'https://da21-2409-40e0-40-3fe0-a143-498b-9774-3ee5.ngrok-free.app/api/user/signup';

        startTransition(async () => {
            console.log(userDetail);
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: userDetail.name.trim(),
                        mail: userDetail.mail.trim(),
                        password: userDetail.password.trim()
                    })
                })
                const data = await response.json();
                console.log(data);
                if(data.success){
                    navigation.navigate('Home');
                }

            } catch (error) {
                console.log(error);
            }
        })
    }

    return (
        <SafeAreaView>
            <View style={style.containerFluid}>
                <Text style={{ fontSize: 40, fontWeight: '800', marginTop: 30, marginHorizontal: 'auto', color: '#9695ed' }}>
                    {
                        toggle === 'login' ? "Log In" : "Sign Up"
                    }
                </Text>
                <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 27, marginVertical: 30 }}>
                    {
                        toggle !== 'login' &&
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 35, fontWeight: '890', marginBottom: 10 }}>Name</Text>
                            <TextInput
                                placeholder='Enter Your Name'
                                placeholderTextColor='#ccc'
                                style={style.inputBox}
                                value={userDetail.name}
                                onChangeText={(text) => handelChange('name', text)}
                            />
                        </View>
                    }
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 35, fontWeight: '890', marginBottom: 10 }}>Email</Text>
                        <TextInput
                            placeholder='Enter Your Email'
                            placeholderTextColor='#ccc'
                            style={style.inputBox}
                            value={userDetail.mail}
                            onChangeText={(text) => handelChange('mail', text)}
                        />
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 35, fontWeight: '890', marginBottom: 10 }}>Password</Text>
                        <TextInput
                            placeholder='Enter Your Password'
                            placeholderTextColor='#ccc'
                            secureTextEntry={true}
                            textContentType="password"
                            style={style.inputBox}
                            value={userDetail.password}
                            onChangeText={(text) => handelChange('password', text)}
                        />
                    </View>
                    {toggle !== 'login' &&
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 35, fontWeight: '890', marginBottom: 10 }}>Confirm Password</Text>
                            <TextInput
                                placeholder='Confirm Password'
                                placeholderTextColor='#ccc'
                                secureTextEntry={true}
                                textContentType="password"
                                style={style.inputBox}
                                value={userDetail.cPass}
                                onChangeText={(text) => handelChange('cPass', text)}
                            />
                        </View>}
                </View>
                <TouchableOpacity style={{ marginBottom: 45 }} onPress={handelSubmit}>
                    <Text style={{ width: '50%', marginHorizontal: 'auto', textAlign: 'center', fontSize: 18, fontWeight: '800', backgroundColor: '#9695ed', color: '#fff', paddingVertical: 14, borderRadius: 6 }}>{toggle === 'login' ? loading ? "submitting" : "Log in" : loading ? "submitting" : "Sign up"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handelForm}>
                    {
                        toggle === 'login' ?
                            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Create a new account.<Text style={{ color: 'blue' }}>Click</Text> here</Text>
                            :
                            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Already have an account.<Text style={{ color: 'blue' }}>Click</Text> here to sign in</Text>
                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

const style = StyleSheet.create({
    containerFluid: {
        width: '96%',
        marginHorizontal: "auto",
        backgroundColor: '#fff',
        marginBottom: 40
    },
    containerFluidIos: {
        width: '96%',
        marginHorizontal: "auto",
        backgroundColor: '#fff'
    },
    inputBox: {
        width: '90%',
        fontSize: 20,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 5,
        paddingLeft: 15
    }
})

export default SignupComponent
