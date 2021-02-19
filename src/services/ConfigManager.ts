import Config from 'react-native-config';

const CONFIG_VALUES = {
    MAP_CENTER_COORDINATE: [-122.41618259887457, 37.76098139438089],
    MAPBOX_TOKEN: Config.MAPBOX_TOKEN,
    MAPBOX_STYLE_URL: Config.MAPBOX_STYLE_URL,
};

export default {
    getConfigValue(value: keyof typeof CONFIG_VALUES) {
        return CONFIG_VALUES[value] || null;
    }
};
