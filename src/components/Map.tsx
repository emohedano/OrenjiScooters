/**
 * Map
 *
 * @format
 */
import Config from 'react-native-config';
import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {IScooterGeo, IScooterGeoCollection} from '../api/models/Scooter';
import availableIcon from '../images/available.png';
import notAvailableeIcon from '../images/not_available.png';
import rentedIcon from '../images/rented.png';
import {Position} from 'geojson';

const MAPBOX_TOKEN = Config.MAPBOX_TOKEN;
const MAPBOX_STYLE_URL = Config.MAPBOX_STYLE_URL;
const DEFAULT_ZOOM_LEVEL = 15;

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const shapeStyles = {
    icon: {
        iconImage: ['get', 'icon'],
        iconSize: 2,
    },
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
    },
});

type MapProps = {
    vehicleCollection: IScooterGeoCollection | null;
    centerCoordinate: Position;
    onPressVehicle: (vehicle: IScooterGeo) => void;
};

function getScreenDimensions() {
    return {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    };
}

const Map: React.FC<MapProps> = ({vehicleCollection, centerCoordinate, onPressVehicle}) => {
    const [dimensions, setDimensions] = React.useState(getScreenDimensions());

    function handleMapShapePress(event: any) {
        // If shape pressed is a vehicle, it will be available in the features[0] property

        if (event.features && event.features[0]) {
            onPressVehicle(event.features[0]);
        }
    }

    React.useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);

        Dimensions.addEventListener('change', () => {
            setDimensions(getScreenDimensions());
        });
    }, []);

    return (
        <View style={styles.page}>
            <View style={{...dimensions}}>
                <MapboxGL.MapView
                    styleURL={MAPBOX_STYLE_URL}
                    style={styles.map}
                    logoEnabled={false}
                    zoomEnabled
                    compassEnabled={true}>
                    <MapboxGL.Camera centerCoordinate={centerCoordinate} zoomLevel={DEFAULT_ZOOM_LEVEL} />

                    <MapboxGL.Images
                        images={{
                            rented: rentedIcon,
                            available: availableIcon,
                            not_available: notAvailableeIcon,
                        }}
                    />

                    <MapboxGL.UserLocation />

                    {vehicleCollection ? (
                        <MapboxGL.ShapeSource
                            id="vehicleShapeSource"
                            shape={vehicleCollection}
                            onPress={handleMapShapePress}>
                            <MapboxGL.SymbolLayer
                                id="vehicleIconName"
                                style={shapeStyles.icon as MapboxGL.SymbolLayerStyle}
                            />
                        </MapboxGL.ShapeSource>
                    ) : null}
                </MapboxGL.MapView>
            </View>
        </View>
    );
};

export default Map;
