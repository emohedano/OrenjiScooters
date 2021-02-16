import {Geometry} from 'geojson';

enum ScooterTypes {
    REGULAR,
}

export enum ScooterStatus {
    available = 'Available',
    not_available = 'Not Available',
    rented = 'Rented',
}

class ScooterProperties {
    type? = ScooterTypes.REGULAR;
    status: keyof typeof ScooterStatus = 'available';
    icon = 'bicycle-15';
}

export interface IScooterGeo extends GeoJSON.Feature<Geometry, ScooterProperties> {}

export interface IScooterGeoCollection extends GeoJSON.FeatureCollection<Geometry, ScooterProperties> {}
