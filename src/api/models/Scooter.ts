import {Geometry} from 'geojson';

export enum ScooterStatus {
    available = 'Available',
    not_available = 'Not Available',
    rented = 'Rented',
}

type ScooterStatusString = keyof typeof ScooterStatus;

export class Scooter {
    status: ScooterStatusString = 'available';
    icon: ScooterStatusString = 'available'; // Used status as icon name

    constructor(status: ScooterStatusString) {
        this.status = status;
        this.icon = status;
    }
}

export interface IScooterGeo extends GeoJSON.Feature<Geometry, Scooter> {}

export interface IScooterGeoCollection extends GeoJSON.FeatureCollection<Geometry, Scooter> {}
