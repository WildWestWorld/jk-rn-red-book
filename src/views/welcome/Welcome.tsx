import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import icon_logo_main from '../../assets/icon_main_logo.png';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'


export default function Welcome() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(() => {
            startLogin()
        }, 3000)
    }, [])

    const startLogin = () => {
        navigation.replace('Login')
    }




    return (
        <View style={styles.root}>
            <Image style={styles.logoMain} source={icon_logo_main}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logoMain: {
        width: 200,
        height: 105,
        marginTop: 300,
        resizeMode: 'contain'
    }
})