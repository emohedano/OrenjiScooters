/**
 * SignIn
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ScreenNavigationProp} from '../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

type SignInProps = {
    navigation: ScreenNavigationProp;
};

const SignIn: React.FC<SignInProps> = ({navigation}) => (
    <View style={styles.container}>
        <Text>SignIn page</Text>
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
