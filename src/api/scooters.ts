import BaseApi from './base';
import {IScooterGeoCollection} from './models/Scooter';

export default class ScootersApi extends BaseApi {
    async getAll() {
        return this.makeRequest<IScooterGeoCollection>('/vehicles');
    }
}
