import {Geometry} from 'geojson';

export enum ScooterStatus {
    available = 'Available',
    not_available = 'Not Available',
    rented = 'Rented',
}

class ScooterProperties {
    status: keyof typeof ScooterStatus = 'available';
    icon: keyof typeof ScooterStatus = 'available'; // Used status as icon name
}

export interface IScooterGeo extends GeoJSON.Feature<Geometry, ScooterProperties> {}

export interface IScooterGeoCollection extends GeoJSON.FeatureCollection<Geometry, ScooterProperties> {}
