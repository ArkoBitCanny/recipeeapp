import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';

const SignupComponent = () => {
    const [toggle, setToggle] = useState('login');
    const [userDetail, setUserDetail] = useState({
        name: "",
        mail: "",
        password: "",
        cPass: ""
    })

    const handelForm = () => {
        if (toggle === 'login') setToggle('signup');
        else setToggle('login');
    }

    const handelSubmit = async () => {
        console.log("Hewllo");
        try {
            const data=await fetch('http://localhost:3000/api/user/login',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    mail:'test2@gmail.com',
                    password:'12345678'
                })
            })
            const parsedData=await data.json();
            console.log(parsedData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView>
            <View style={style.containerFluid}>
                <Text style={{ fontSize: 40, fontWeight: '800', marginTop: 30, marginHorizontal: 'auto', color: 'orange' }}>
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
                                onChangeText={(text) => {
                                    setUserDetail({ ...userDetail }, userDetail.name = text);
                                }}
                            />
                        </View>
                    }
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 35, fontWeight: '890', marginBottom: 10 }}>Email</Text>
                        <TextInput
                            placeholder='Enter Your Email'
                            placeholderTextColor='#ccc'
                            textContentType='emailAddress'
                            autoCompleteType="email"
                            keyboardType="email-address"
                            style={style.inputBox}
                            onChangeText={(text) => {
                                setUserDetail({ ...userDetail }, userDetail.mail = text);
                            }}
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
                            onChangeText={(text) => {
                                setUserDetail({ ...userDetail }, userDetail.password = text);
                            }}
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
                                onChangeText={(text) => {
                                    setUserDetail({ ...userDetail }, userDetail.cPass = text);
                                }}
                            />
                        </View>}
                </View>
                <TouchableOpacity style={{ marginBottom: 45 }} onPress={handelSubmit}>
                    <Text style={{ width: '50%', marginHorizontal: 'auto', textAlign: 'center', fontSize: 18, fontWeight: '800', backgroundColor: 'orange', color: '#fff', paddingVertical: 14, borderRadius: 6 }}>{toggle === 'login' ? "Log in" : "Sign up"}</Text>
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
