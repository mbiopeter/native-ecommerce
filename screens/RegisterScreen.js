import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { serverUrl } from '../const';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        }
        //send the post request to the backend API
        axios.post(`${serverUrl}/register`, user).then((response) => {
            Alert.alert("Registration successfull!");
            setName("");
            setEmail("");
            setPassword("");
        }).catch((error) => {
            Alert.alert("Registration error!");
            console.log('registration error', error);
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
                        }}>Create an Account</Text>
                </View>
                {/* name input container */}
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
                        <FontAwesome
                            name="user"
                            size={24}
                            color="gray"
                            style={{
                                marginLeft: 8,
                            }} />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Enter your name"
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: 16
                            }} />
                    </View>
                </View>
                {/* email input container */}
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
                    onPress={handleRegister}
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
                    }}>Register</Text>
                </Pressable>
                {/* don't have an account */}
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{
                        marginTop: 15,
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'gray',
                        fontSize: 16,
                    }}>Already Have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen

const styles = StyleSheet.create({}) 