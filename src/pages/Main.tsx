/**
 * Main
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

type MainProps = {
    navigation: ScreenNavigationProp;
};

const Main: React.FC<MainProps> = ({navigation}) => (
    <View style={styles.container}>
        <Text>Main page</Text>
        <Button
            mode="contained"
            onPress={() => {
                navigation.navigate('SignIn');
            }}>
            Log out
        </Button>
    </View>
);

export default Main;
