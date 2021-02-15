import {Geometry} from 'geojson';

enum ScooterTypes {
    REGULAR,
}

// TODO: user an enum
type ScooterStatus = 'available' | 'not_available' | 'rented';

class ScooterProperties {
    type? = ScooterTypes.REGULAR;
    status: ScooterStatus = 'available';
    icon = 'bicycle-15';
}

export interface IScooterGeo extends GeoJSON.Feature<Geometry, ScooterProperties> {}

export interface IScooterGeoCollection extends GeoJSON.FeatureCollection<Geometry, ScooterProperties> {}
