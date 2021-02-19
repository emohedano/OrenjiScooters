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
import ConfigManager from '../services/ConfigManager';

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
    const MAP_CENTER_COORDINATE = ConfigManager.getConfigValue('MAP_CENTER_COORDINATE') as any;
    const MAPBOX_TOKEN = ConfigManager.getConfigValue('MAPBOX_TOKEN') as any;
    const MAPBOX_STYLE_URL = ConfigManager.getConfigValue('MAPBOX_STYLE_URL') as any;

    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [selectedVehicle, setSelectedVehicle] = React.useState<IScooterGeo | null>(null);
    const [vehicleCollection, setVehicleCollection] = React.useState<IScooterGeoCollection | null>(null);

    function handleVehiclePress(vehicle: IScooterGeo) {
        setSelectedVehicle(vehicle);
    }

    function handleVehicleBannerClose() {
        setSelectedVehicle(null);
    }

    function handleNotificationClose() {
        setErrorVisible(false);
        getScooters();
    }

    function handleLogoutPress() {
        navigation.navigate('SignIn');
    }

    async function getScooters() {
        try {
            const scooters = await scootersApi.getAll();
            setVehicleCollection(scooters);
        } catch (error) {
            setErrorMessage(error.message);
            setErrorVisible(true);
        }
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

            {selectedVehicle && (
                <VehicleBanner
                    vehicle={selectedVehicle?.properties}
                    visible={true}
                    onClose={handleVehicleBannerClose}></VehicleBanner>
            )}

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
