import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { serverUrl } from '../const';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main")
                }
            } catch (error) {
                console.log("error message", error);
            }
        }
        checkLoginStatus();
    }, [])

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }
        //send the post request to the backend API
        axios.post(`${serverUrl}/login`, user).then((response) => {
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            navigation.replace("Main");
        }).catch((error) => {
            Alert.alert("Login error!");
            console.log('Login error', error);
        })
    }
    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center'
            }}>
            <View style={{ marginTop: 10 }} />
            {/* logo container */}
            <View>
                <Image
                    style={{
                        width: 150,
                        height: 100
                    }}
                    source={
                        require('../assets/images/logo.png')} />
            </View>
            <KeyboardAvoidingView>
                {/* title container */}
                <View
                    style={{
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginTop: 12,
                            color: '#041E42'
                        }}>Login To your Account</Text>
                </View>
                {/* email input container */}
                <View
                    style={{
                        marginTop: 70
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#D0D0D0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30
                        }}>
                        <MaterialIcons
                            name="email"
                            size={24}
                            color="gray"
                            style={{
                                marginLeft: 8,
                            }} />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Enter your Email"
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: 16
                            }} />
                    </View>
                </View>
                {/* password input container */}
                <View
                    style={{
                        marginTop: 10
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#D0D0D0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30
                        }}>
                        <AntDesign
                            name="lock"
                            size={24}
                            color="gray"
                            style={{
                                marginLeft: 8
                            }} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholder="Enter your Password"
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: 16
                            }} />
                    </View>
                </View>
                {/*register container */}
                <View
                    style={{
                        marginTop: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <Text>Keep me logged in</Text>
                    <Text
                        style={{
                            color: '#007fff',
                            fontWeight: "500"
                        }}>Fogot password?</Text>
                </View>
                <View style={{
                    marginTop: 80
                }} />

                {/* login btn */}
                <Pressable
                    onPress={handleLogin}
                    style={{
                        width: 200,
                        backgroundColor: '#FEBE10',
                        borderRadius: 6,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 15
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Log In</Text>
                </Pressable>
                {/* don't have an account */}
                <Pressable
                    onPress={() => navigation.navigate('Register')}
                    style={{
                        marginTop: 15,
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'gray',
                        fontSize: 16,
                    }}>Do'nt have an account? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
