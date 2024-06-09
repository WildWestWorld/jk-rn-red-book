import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native';
import { observer, useLocalStore } from 'mobx-react';
import HomeStore from './HomeStore';


import FlowList from '../../components/flowlist/FlowList.js';
import ResizeImage from '../../components/ResizeImage.tsx';
import Heart from '../../components/Heart.tsx';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from './components/TitleBar.tsx';
import CategoryList from './components/CategoryList.tsx';

const { width: SCREEN_WIDTH } = Dimensions.get('window');



const Home = observer(() => {

  const store = useLocalStore(() => {
    return new HomeStore()
  })


  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();

  }, [])

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();

  }
  const loadMoreData = () => {
    store.requestHomeList();

  }




  const renderItem = ({ item, index }: { item: ArticleSimple, index: number }) => {
    return (
      <View style={styles.item}>
        <ResizeImage uri={item.image}></ResizeImage>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }}></Image>
          <Text style={styles.nameTxt}>{item.userName}</Text>
          {/* <Image style={styles.heart} source={icon_heart_empty}></Image> */}
          <Heart value={item.isFavorite} onValueChanged={(value: boolean) => {
            console.log(value);
          }} size={20}></Heart>
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>



    )
  }


  const Footer = () => (
    <Text style={styles.footerTxt}>没有更多数据</Text>
  );


  const categoryList = store.categoryList.filter((item) => item.isAdd)


  return (
    <View style={styles.root}>
      <TitleBar tab={1} onTabChanged={(tab: number) => { console.log(`tab=${tab}`) }}></TitleBar>
      <FlowList
        style={styles.flatList}
        data={store.homeList}
        extraData={store.refreshing}
        renderItem={renderItem}
        keyExtractor={(item: ArticleSimple) => item.id.toString()}
        refreshing={store.refreshing}
        onRefresh={refreshNewData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Footer />}
        ListHeaderComponent={<CategoryList categoryList={categoryList} allCategoryList={store.categoryList} onCategoryChange={(category: Category) => {
          console.log(JSON.stringify(category))
        }} />}
        contentContainerStyle={styles.container}
        numColumns={2}
      />
    </View>
  );
});


const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

export default Home;
