import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductItem = ({ item }) => {
    return (
        <Pressable style={{
            marginHorizontal: 20,
            marginVertical: 25
        }}>
            <Image style={{
                width: 160,
                height: 160,
                resizeMode: 'contain'
            }} source={{ uri: item?.image }} />
            <Text
                numberOfLines={1}
                style={{
                    width: 160,
                    marginTop: 10,
                }}>{item?.title}</Text>
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                }}>$ {item?.price}</Text>
                <Text style={{
                    color: '#FFC72C',
                    fontWeight: 'bold'
                }}>{item?.rating?.rate} ratings</Text>
            </View>
            <Pressable style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 10
            }}>
                <Text>Add to Cart</Text>
            </Pressable>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({})