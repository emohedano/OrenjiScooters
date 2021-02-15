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

const MAPBOX_TOKEN = Config.MAPBOX_TOKEN;
const MAPBOX_STYLE_URL = Config.MAPBOX_STYLE_URL;

MapboxGL.setAccessToken(MAPBOX_TOKEN);

type MapProps = {
    vehicleCollection: IScooterGeoCollection;
    onPressVehicle: (vehicle: IScooterGeo) => void;
};

function getScreenDimensions() {
    return {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    };
}

const Map: React.FC<MapProps> = ({vehicleCollection, onPressVehicle}) => {
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
            <View style={{...styles.container, ...dimensions}}>
                <MapboxGL.MapView
                    styleURL={MAPBOX_STYLE_URL}
                    style={styles.map}
                    logoEnabled={false}
                    zoomEnabled
                    compassEnabled={true}>
                    <MapboxGL.Camera followUserLocation />

                    <MapboxGL.UserLocation />

                    <MapboxGL.ShapeSource
                        id="exampleShapeSource"
                        shape={vehicleCollection}
                        onPress={handleMapShapePress}>
                        <MapboxGL.SymbolLayer
                            id="exampleIconName"
                            style={shapeStyles.icon as MapboxGL.SymbolLayerStyle}
                        />
                    </MapboxGL.ShapeSource>
                </MapboxGL.MapView>
            </View>
        </View>
    );
};

const shapeStyles = {
    icon: {
        iconImage: ['get', 'icon'],
        iconSize: 2,
    },
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
    },
});

export default Map;
