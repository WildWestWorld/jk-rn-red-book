import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'

export default function PageA() {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const onButtonPress = () => {
        navigation.push('PageB')
    }

    return (
        <View style={styles.root}>
            <Text style={styles.pageTxt}>PageA</Text>
            <Button title='点击跳转' onPress={onButtonPress}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTxt: {
        fontSize: 40,
        color: '#333',
        fontWeight: 'bold'
    }
})