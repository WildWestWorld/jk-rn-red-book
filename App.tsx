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
import PageA from './src/views/PageA';
import PageB from './src/views/PageB';
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
        <Stack.Navigator initialRouteName='PageA' screenOptions={{ cardStyle: { elevation: 1 } }}>
          {/* headerShown 是否展示标题栏*/}
          <Stack.Screen name='PageA' component={PageA} options={{ headerShown: false }}></Stack.Screen>
          {/* ...TransitionPresets.SlideFromRightIOS 路由动画 */}
          <Stack.Screen name='PageB' component={PageB} options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}></Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
