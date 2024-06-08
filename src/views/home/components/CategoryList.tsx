import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'


import icon_arrow from '../../../assets/icon_arrow.png'

type Props = {
    categoryList: Category[],
    onCategoryChange: (category: Category) => void
}


export default function CategoryList({ categoryList, onCategoryChange }: Props) {

    const [category, setCategory] = useState<Category>()

    useEffect(() => {
        setCategory(categoryList.find((item: Category) => item.name === '推荐'))

    }, [])


    const onCategoryPress = (category: Category) => {
        setCategory(category)
        onCategoryChange?.(category);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                {categoryList.map((item: Category, index: number) => {
                    const isSelected = item.name === category?.name;
                    return (
                        <TouchableOpacity style={styles.tabItem} key={item.name} onPress={() => onCategoryPress(item)}>
                            <Text style={isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt}>{item.name}</Text>
                        </TouchableOpacity>

                    )
                })}
            </ScrollView>
            <View style={styles.openButton}>
                <TouchableOpacity>
                    <Image source={icon_arrow} style={styles.openImg}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 36,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 6,
    },
    scrollView: {
        flex: 1,
        height: '100%'
    },
    openButton: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    openImg: {
        width: 18,
        height: 18,
        transform: [{ rotate: '-90deg' }]
    },
    tabItem: {
        width: 64,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemTxt: {
        fontSize: 16,
        color: '#999'
    },
    tabItemTxtSelected: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'

    }
})