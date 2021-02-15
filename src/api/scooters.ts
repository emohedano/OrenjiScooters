import BaseApi from './base';
import {IScooterGeoCollection} from './models/Scooter';

export default class ScootersApi extends BaseApi {
    async getAll() {
        const vehiclesCollection = await this.makeRequest<IScooterGeoCollection>('/vehicles');

        vehiclesCollection.features.forEach((feature) => {
            feature.properties.icon = 'bicycle-15';
        });

        return vehiclesCollection;
    }
}
