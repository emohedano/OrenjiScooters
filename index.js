/**
 * Index
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import AppContainer from './src/navigation/AppContainer';
import {name as appName} from './app.json';

const theme = {
    ...DarkTheme,
    roundness: 2,
    colors: {
        ...DarkTheme.colors,
        primary: '#fa9853',
        accent: '#fa9853',
    },
};

export default function Index() {
    return (
        <PaperProvider theme={theme}>
            <AppContainer />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Index);
