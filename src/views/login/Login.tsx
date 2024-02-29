import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Linking,
    TextInput,
    LayoutAnimation,
} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';



import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import  icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_close_modal from '../../assets/icon_close_modal.png';

export default () => {

    const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
    const [check, setCheck] = useState<boolean>(false);
    const [eyeOpen, setEyeOpen] = useState<boolean>(true);

    const [phone, setPhone] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');

    const navigation = useNavigation<StackNavigationProp<any>>();

    const onLoginPress = async () => {
        const canLogin = phone?.length === 13 && pwd?.length === 6;
        if (!canLogin || !check) {
            return;
        }


    }

    const renderQuickLogin = () => {
        const styles = StyleSheet.create({
            root: {
                width: '100%',
                height: '100%',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                paddingHorizontal: 56,
            },
            otherLoginButton: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 10,
                marginBottom: 100,
            },
            otherLoginTxt: {
                fontSize: 16,
                color: '#303080'
            },
            icon_arrow: {
                width: 16,
                height: 16,
                resizeMode: 'contain',
                marginLeft: 6,
                transform: [{ rotate: '180deg', }]
            },
            wxLoginButton: {
                width: '100%',
                height: 56,
                backgroundColor: '#05c160',
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
            icon_wx: {
                width: 40,
                height: 40,
            },
            wxLoginTxt: {
                fontSize: 18,
                color: 'white',
                marginLeft: 6,
            },
            oneKeyLoginButton: {
                width: '100%',
                height: 56,
                backgroundColor: '#ff2442',
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 20,
            },
            oneKeyLoginTxt: {
                fontSize: 18,
                color: 'white',
                marginLeft: 6,
            },
            logoMain: {
                width: 180,
                height: 95,
                resizeMode: 'contain',
                position: 'absolute',
                top: 170,
            },
        });
        return (
            <View style={styles.root}>
                <View style={allStyles.protocolLayout}>
                    <TouchableOpacity
                        onPress={() => {
                            setCheck(!check);
                        }}
                    >
                        <Image
                            style={allStyles.radioButton}
                            source={check ? icon_selected : icon_unselected}
                        />
                    </TouchableOpacity>
                    <Text style={allStyles.lableTxt}>我已阅读并同意</Text>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('https://www.baidu.com')
                        }}
                    >
                        <Text style={allStyles.protocolTxt}>《用户协议》和《隐私政策》</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.otherLoginButton}
                    onPress={() => {

                    }}
                >
                    <Text style={styles.otherLoginTxt}>其它登陆方式</Text>
                    <Image style={styles.icon_arrow} source={icon_arrow} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.wxLoginButton}
                    activeOpacity={0.7}
                >
                    <Image style={styles.icon_wx} source={icon_wx_small} />
                    <Text style={styles.wxLoginTxt}>微信登陆</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.oneKeyLoginButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.oneKeyLoginTxt}>一键登陆</Text>
                </TouchableOpacity>

                <Image style={styles.logoMain} source={icon_logo_main} />
            </View>
        );
    }

    const renderInputLogin = () => {

        return (
            <View></View>
        );  
    }

    return(
        <View style={allStyles.root}>
            {
                loginType === 'quick' ?
                renderQuickLogin() : renderInputLogin()
            }
        </View>
    );
}

const allStyles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 12,
    },
    radioButton: {
        width: 20,
        height: 20,
    },
    lableTxt: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
    },
    protocolTxt: {
        fontSize: 12,
        color: '#1020ff',
    },
});
