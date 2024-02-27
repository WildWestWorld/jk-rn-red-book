import { Image, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'

import icon_logo_main from '../../assets/icon_logo_main.png';
import icon_unselected from '../../assets/icon_unselected.png'
import icon_selected from '../../assets/icon_selected.png'

import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login() {
    const [loginType, setLoginType] = useState<'quick' | 'input'>('quick')
    const [check, setCheck] = useState<boolean>(false)

    const renderQuickLogin = () => {
        const styles = StyleSheet.create({
            root: {
                width: '100%',
                height: '100%',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                paddingHorizontal: 40
            },
            protocoLayout: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 32
            },
            radioButton: {
                width: 20,
                height: 20
            },
            labelTxt: {
                fontSize: 12,
                color: '#999',
                marginLeft: 6
            },
            protocolTxt: {
                fontSize: 12,
                color: '#1020ff'
            }
        })

        return (
            <View style={styles.root}>
                <View style={styles.protocoLayout}>
                    <TouchableOpacity onPress={() => {
                        setCheck(!check)
                    }}>
                        <Image source={check ? icon_selected : icon_unselected} style={styles.radioButton}></Image>
                    </TouchableOpacity>
                    <Text style={styles.labelTxt}>我已阅读</Text>

                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://www.baidu.com')
                    }}>
                        <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    const renderInputLogin = () => {
        return (
            <View></View>
        )
    }


    return (
        <View style={styles.root}>
            {
                loginType === 'quick' ? renderQuickLogin() : renderInputLogin()
            }
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

    }
})