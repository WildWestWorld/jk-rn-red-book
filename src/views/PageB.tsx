import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PageB() {
    return (
        <View style={styles.root}>
            <Text style={styles.pageTxt}>PageB</Text>
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