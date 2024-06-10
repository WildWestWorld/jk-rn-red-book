import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import ArticleDetailStore from './ArtcleDetailStore'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'



import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png'
import icon_edit_comment from '../../assets/icon_edit_comment.png';
import { ScrollView } from 'react-native-gesture-handler'
import { ImageSlider } from '../../components/slidePager'
import { StackNavigationProp } from '@react-navigation/stack'


type RouteParams = {
    ArticleDetail: {
        id: number
    }
}


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default observer(function ArticleDetail() {
    const store = useLocalStore(() => new ArticleDetailStore())

    const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>()


    const navigation = useNavigation<StackNavigationProp<any>>();
    const [height, setHeight] = useState<number>(400);
    useEffect(() => {
        store.requestArticleDetail(params.id)
    }, [])



    useEffect(() => {
        if (!store.detail?.images) {
            return;
        }
        const firstImg = store.detail?.images[0];
        Image.getSize(firstImg, (width: number, height: number) => {
            const showHeight = SCREEN_WIDTH * height / width;
            setHeight(showHeight);
        })
    }, [store.detail?.images]);



    const renderTitle = () => {
        const { detail } = store;
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.pop()}
                >
                    <Image style={styles.backImg} source={icon_arrow} />
                </TouchableOpacity>
                {detail.avatarUrl && <Image style={styles.avatarImg} source={{ uri: detail.avatarUrl }} />}
                <Text style={styles.userNameTxt}>{detail.userName}</Text>
                <Text style={styles.followTxt}>关注</Text>
                <Image style={styles.shareImg} source={icon_share} />
            </View>
        );
    }


    const renderImages = () => {
        const { detail } = store;
        const { images } = detail
        if (!images?.length) {
            return null
        }
        const data: any[] = images.map((item) => {
            return { img: item }
        })

        return (
            <View style={{ paddingBottom: 30 }} >
                <ImageSlider
                    data={data}
                    autoPlay={false}
                    closeIconColor='white'
                    caroselImageStyle={{ height }}
                    indicatorContainerStyle={{ bottom: -40, }}
                    activeIndicatorStyle={styles.activeDot}
                    inActiveIndicatorStyle={styles.inActiveDot}
                />
            </View>
        )
    }

    const renderInfo = () => {
        const { detail } = store;
        const tags = detail.tag?.map(i => `# ${i}`).join(' ');
        return (
            <>
                <Text style={styles.articleTitleTxt}>{detail.title}</Text>
                <Text style={styles.descTxt}>{detail.desc}</Text>
                <Text style={styles.tagsTxt}>{tags}</Text>
                <Text style={styles.timeAndLocationTxt}>{detail.dateTime}  {detail.location}</Text>
                <View style={styles.line} />
            </>
        );
    }


    return (
        <View style={styles.root}>
            {renderTitle()}
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                showsVerticalScrollIndicator={false}
            >
                {renderImages()}
                {renderInfo()}
            </ScrollView>

        </View>
    )
})


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    titleLayout: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
    },
    backImg: {
        width: 20,
        height: 20,
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    userNameTxt: {
        fontSize: 15,
        flex: 1,
        color: '#333',
        marginLeft: 16,
    },
    followTxt: {
        paddingHorizontal: 16,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff2442',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        color: '#ff2442',
    },
    shareImg: {
        width: 28,
        height: 28,
        marginHorizontal: 16,
    },
    activeDot: {
        width: 6,
        height: 6,
        backgroundColor: '#ff2442',
        borderRadius: 3,
    },
    inActiveDot: {
        width: 6,
        height: 6,
        backgroundColor: '#c0c0c0',
        borderRadius: 3,
    },
    articleTitleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    descTxt: {
        fontSize: 15,
        color: '#333',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    tagsTxt: {
        fontSize: 15,
        color: '#305090',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    timeAndLocationTxt: {
        fontSize: 12,
        color: '#bbb',
        marginVertical: 16,
        marginLeft: 16,
    },
    line: {
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
    },
    bottomLayout: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    bottomEditLayout: {
        height: 40,
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginRight: 12,
    },
    editImg: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },
    bottomCommentInput: {
        height: '100%',
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
    },
    bottomCount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    bottomIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 12,
    },
});
