import BaseApi from './base';
import {IScooterGeoCollection, Scooter} from './models/Scooter';

export default class ScootersApi extends BaseApi {
    async getAll() {        
        const vehiclesCollection = await this.makeRequest<IScooterGeoCollection>('/vehicles');

        vehiclesCollection.features.forEach((feature) => {
            feature.properties = new Scooter(feature.properties.status);
        });

        return vehiclesCollection;
    }
}
