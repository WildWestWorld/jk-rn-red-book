import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native';
import { observer, useLocalStore } from 'mobx-react';
import HomeStore from './HomeStore';

import icon_heart_empty from '../../assets/icon_heart_empty.png'
import icon_heart from '../../assets/icon_heart.png'


const { width: SCREEN_WIDTH } = Dimensions.get('window');


const Home = observer(() => {

  const store = useLocalStore(() => {
    return new HomeStore()
  })
  useEffect(() => {

    store.requestHomeList();
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
        <Image style={styles.itemImage} source={{ uri: item.image }}></Image>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }}></Image>
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Image style={styles.heart} source={icon_heart_empty}></Image>
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>



    )
  }


  const Footer = () => (
    <Text style={styles.footerTxt}>没有更多数据</Text>
  );

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.flatList}
        data={store.homeList}
        extraData={store.refreshing}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshing={store.refreshing}
        onRefresh={refreshNewData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Footer />}
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
      width: (SCREEN_WIDTH - 18) /2,
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
