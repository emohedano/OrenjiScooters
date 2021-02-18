/**
 * SignIn
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Appbar, Avatar, Headline, TextInput} from 'react-native-paper';
import {ScreenNavigationProp} from '../types';
import Header from '../components/Header';
import logoImage from '../images/orenji.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#333',
    },
    form: {
        padding: 10,
    },
    logo: {
        alignSelf: 'center',
    },
});

type SignInProps = {
    navigation: ScreenNavigationProp;
};

const SignIn: React.FC<SignInProps> = ({navigation}) => (
    <View style={styles.container}>
        <Header />

        <View style={styles.form}>
            <Avatar.Image source={logoImage} style={styles.logo} />
            <Headline style={styles.logo}>オレンジ</Headline>
        </View>

        <View style={styles.form}>
            <TextInput mode="flat" label="username" />
            <TextInput label="password" secureTextEntry={true} />
        </View>

        <Button
            mode="contained"
            onPress={() => {
                navigation.navigate('Main');
            }}>
            Log in
        </Button>
    </View>
);

export default SignIn;
