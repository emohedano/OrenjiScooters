/**
 * Main
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button} from 'react-native-paper';
import VehicleBanner from '../components/VehicleBanner';
import Map from '../components/Map';
import NotificationMessage from '../components/NotificationMessage';
import {IScooterGeo, IScooterGeoCollection} from '../api/models/Scooter';
import {ScreenNavigationProp} from '../types';
import {scootersApi} from '../api';
import {ApiException} from '../api/exceptions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

type MainProps = {
    navigation: ScreenNavigationProp;
};

const Main: React.FC<MainProps> = ({navigation}) => {
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [selectedVisible, setSelectedVisible] = React.useState(false);
    const [selectedVehicle, setSelectedVehicle] = React.useState<IScooterGeo | null>(null);
    const [vehicleCollection, setVehicleCollection] = React.useState<IScooterGeoCollection | null>(null);

    function handleVehiclePress(vehicle: IScooterGeo) {
        setSelectedVehicle(vehicle);
        setSelectedVisible(true);
    }

    function handleVehicleBannerClose() {
        setSelectedVehicle(null);
        setSelectedVisible(false);
    }

    function handleNotificationClose() {
        setErrorVisible(false);
    }

    function handleLogoutPress() {
        navigation.navigate('SignIn');
    }

    React.useEffect(() => {
        scootersApi
            .getAll()
            .then((scooters) => {
                setVehicleCollection(scooters);
            })
            .catch((error: ApiException) => {
                setErrorMessage(error.message);
                setErrorVisible(true);
            });
    }, []);

    return (
        <View style={styles.container}>
            {vehicleCollection ? (
                <Map vehicleCollection={vehicleCollection} onPressVehicle={handleVehiclePress}></Map>
            ) : null}

            <VehicleBanner
                vehicle={selectedVehicle}
                visible={selectedVisible}
                onClose={handleVehicleBannerClose}></VehicleBanner>

            <NotificationMessage
                visible={errorVisible}
                message={errorMessage}
                onClose={handleNotificationClose}></NotificationMessage>

            <Button mode="contained" onPress={handleLogoutPress}>
                Log out
            </Button>
        </View>
    );
};

export default Main;
