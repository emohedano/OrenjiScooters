import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
    SignIn: undefined;
    Main: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
