import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalStore } from 'mobx-react'
import HomeStore from './HomeStore'

export default function Home() {

  const store = useLocalStore(() => {
    return new HomeStore()
  })
  useEffect(() => {

    store.requestHomeList();
  }, [])


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