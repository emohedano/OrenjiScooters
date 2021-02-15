import Config from 'react-native-config';
import {ApiException} from './exceptions';

export default class BaseApi {
    private _baseUrl: string;

    constructor() {
        this._baseUrl = Config.BASE_URL || 'http://localhost';
    }

    private _getUrl(url: string) {
        return this._baseUrl + url;
    }

    async makeRequest<T>(url: string): Promise<T> {
        try {
            const response = await fetch(this._getUrl(url));
            const body = await response.json();

            if (response.status >= 500) {
                return Promise.reject(new ApiException('Server Error', body.message));
            }

            return body;
        } catch (e) {
            throw new ApiException('Unknown Error', e.message);
        }
    }
}
