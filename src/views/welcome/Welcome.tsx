import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import icon_logo_main from '../../assets/icon_main_logo.png';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { storageLoad } from '../../utils/storage';
import UserStore from '../../stores/UserStore';


export default function Welcome() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(() => {
            getUserInfo()
        }, 2000)
    }, [])

    const startLogin = () => {
        navigation.replace('Login')
    }

    const startHome = () => {
        navigation.replace('MainTab')
    }

    const getUserInfo = async () => {
        const cacheUserInfo = await storageLoad('userInfo');
        if (!cacheUserInfo) {
            startLogin()
        } else if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
            UserStore.setUserInfo(JSON.parse(cacheUserInfo))
            startHome();
        } else {
            startLogin();
        }
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