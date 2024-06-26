import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'



import Home from '../home/Home'
import Shop from '../shop/Shop'
import Message from '../message/Message'
import Mine from '../mine/Mine'

const BottomTab = createBottomTabNavigator();

import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png'
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';

import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png'
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';

import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png'
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';


import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png'
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';

import icon_tab_publish from '../../assets/icon_tab_publish.png'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker'

export default function MainTab() {
  const RedBookTabBar = ({ state, descriptors, navigation }: any) => {
    const { routes, index } = state;

    const onPublishPress = () => {
      launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true
      },
        (res: ImagePickerResponse) => {
          const { assets } = res;
          if (!assets?.length) {
            console.log('选择图片失败');
            return
          }
          const { uri, width, height, fileName, fileSize, type } = assets[0]
          console.log(`uri:${uri},width=${width},height:${height}`)
          console.log(`fileName:${fileName},fileSize=${fileSize},type:${type}`)

        }
      )
    }


    return <View style={styles.tabBarContainer}>
      {routes.map((route: any, i: number) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const isFocused = index === i;


        if (i === 2) {
          return <View key={label}
            style={styles.tabItem}>
            <TouchableOpacity

              onPress={onPublishPress}
            >
              <Image style={styles.icon_tab_publish} source={icon_tab_publish}></Image>
            </TouchableOpacity>
          </View>
        }



        return (
          <View key={label}
            style={styles.tabItem}>
            <TouchableOpacity

              onPress={() => {
                // 跳转页面
                navigation.navigate(route.name)
              }}
            >
              <Text style={{ fontSize: isFocused ? 18 : 16, color: isFocused ? '#333' : '#999', fontWeight: isFocused ? 'bold' : 'normal' }}>{label}</Text>
            </TouchableOpacity>
          </View>
        )
      })}

    </View>
  }

  return (
    <BottomTab.Navigator
      // screenOptions={({ route }) => {
      //   return {
      //     tabBarIcon: ({ focused, color, size }) => {
      //       let img;
      //       if (route.name === 'Home') {
      //         img = focused ? icon_tab_home_selected : icon_tab_home_normal;
      //       } else if (route.name === 'Shop') {
      //         img = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
      //       } else if (route.name === 'Message') {
      //         img = focused ? icon_tab_message_selected : icon_tab_message_normal;
      //       } else if (route.name === 'Mine') {
      //         img = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
      //       }


      //       return <Image style={{ width: size, height: size, tintColor: color }} source={img}></Image>
      //     }

      //   }
      // }}
      // //@ts-ignore
      // tabBarOptions={{
      //   activeTintColor:'#ff2442',
      //   inactiveTintColor:'#999'
      // }}

      tabBar={props => <RedBookTabBar {...props}></RedBookTabBar>}
    >
      <BottomTab.Screen name='Home' component={Home} options={{ title: '首页', headerShown: false }}></BottomTab.Screen>
      <BottomTab.Screen name='Shop' component={Shop} options={{ title: '购物' , headerShown: false}}></BottomTab.Screen>

      <BottomTab.Screen name='Publish' component={Shop} options={{ title: '发布' , headerShown: false}}></BottomTab.Screen>

      <BottomTab.Screen name='Message' component={Message} options={{ title: '消息' , headerShown: false}}></BottomTab.Screen>
      <BottomTab.Screen name='Mine' component={Mine} options={{ title: '我' , headerShown: false}}></BottomTab.Screen>


    </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex'
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain'
  }
})