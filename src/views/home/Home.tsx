import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <View style={styles.root}>
      <Text style={{
        fontSize: 40,
        color: '#333',
        fontWeight: 'bold'
      }}>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})