/**
 * Main
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import Config from 'react-native-config';

import VehicleBanner from '../components/VehicleBanner';
import Map from '../components/Map';
import NotificationMessage from '../components/NotificationMessage';
import {IScooterGeo, IScooterGeoCollection} from '../api/models/Scooter';
import {ScreenNavigationProp} from '../types';
import {scootersApi} from '../api';
import {ApiException} from '../api/exceptions';

const MAP_CENTER_COORDINATE = [-122.41618259887457, 37.76098139438089];
const MAPBOX_TOKEN = Config.MAPBOX_TOKEN;
const MAPBOX_STYLE_URL = Config.MAPBOX_STYLE_URL;

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
        getScooters();
    }

    function handleLogoutPress() {
        navigation.navigate('SignIn');
    }

    function handleMapError(error: string) {
        setErrorMessage(error);
        setErrorVisible(true);
    }

    function getScooters() {
        scootersApi
            .getAll()
            .then((scooters) => {
                setVehicleCollection(scooters);
            })
            .catch((error: ApiException) => {
                setErrorMessage(error.message);
                setErrorVisible(true);
            });
    }

    React.useEffect(() => {
        if (!MAPBOX_TOKEN) {
            setErrorMessage('Mapbox token not found');
            setErrorVisible(true);
            return;
        }

        getScooters();
    }, []);

    return (
        <View style={styles.container}>
            <Map
                token={MAPBOX_TOKEN}
                stylesUrl={MAPBOX_STYLE_URL}
                vehicleCollection={vehicleCollection}
                centerCoordinate={MAP_CENTER_COORDINATE}
                onPressVehicle={handleVehiclePress}></Map>


            {selectedVehicle && <VehicleBanner
                vehicle={selectedVehicle?.properties}
                visible={true}
                onClose={handleVehicleBannerClose}></VehicleBanner>}

            <NotificationMessage
                visible={errorVisible}
                message={errorMessage}
                onClose={handleNotificationClose}></NotificationMessage>

            <Button
                mode="contained"
                onPress={handleLogoutPress}
                accessibilityTraits="button"
                accessibilityComponentType="button">
                Log out
            </Button>
        </View>
    );
};

export default Main;
