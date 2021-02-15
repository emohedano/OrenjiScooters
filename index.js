/**
 * Index
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppContainer from './src/navigation/AppContainer';
import {name as appName} from './app.json';

export default function Index() {
    return (
        <PaperProvider>
            <AppContainer />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Index);
