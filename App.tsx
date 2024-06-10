/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Welcome from './src/views/welcome/Welcome';
import Login from './src/views/login/Login';
import MainTab from './src/views/mainTab/MainTab';
import ArticleDetail from './src/views/articleDetail/ArticleDetail';
import SearchGoods from './src/views/searchGoods/SearchGoods';


const Stack = createStackNavigator()

function App(): React.JSX.Element {


  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      {/* 路由管理 */}
      {/* NavigationContainer  路由管理的容器 */}
      <NavigationContainer>
        {/* 路由管理器 */}
        {/* screenOption:cardStyle:{elevation:1} 用于修复 页面的穿透(上层页面可以看到下层的页面)BUG */}
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ cardStyle: { elevation: 1 } }}>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='Login' component={Login} options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS
          }}></Stack.Screen>

          <Stack.Screen name='MainTab' component={MainTab} options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS
          }}></Stack.Screen>

          <Stack.Screen name='ArticleDetail' component={ArticleDetail} options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS
          }}></Stack.Screen>


          <Stack.Screen name='SearchGoods' component={SearchGoods} options={{
            headerShown: false,
            presentation: 'transparentModal'
          }}></Stack.Screen>


        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
