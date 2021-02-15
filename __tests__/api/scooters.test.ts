import {scootersApi} from '../../src/api';
import {ApiException} from '../../src/api/exceptions';

describe('api', () => {
    describe('scooters', () => {
        it('should fetch a collection of IScooterGeoCollection', async () => {
            // Given
            const makeRequestMock = jest.spyOn(scootersApi, 'makeRequest').mockImplementation(async () => {
                return {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [-122.40674, 37.75303],
                            },
                            properties: {
                                status: 'rented',
                            },
                        },
                    ],
                };
            });

            // When
            const scooters = await scootersApi.getAll();

            // Then
            expect(makeRequestMock).toBeCalledWith('/vehicles');
            expect(scooters.type).toBe('FeatureCollection');

            makeRequestMock.mockRestore();
        });

        it('should throw an ApiException if the request fails', async () => {
            // Given
            const makeRequestMock = jest.spyOn(scootersApi, 'makeRequest').mockImplementation(async () => {
                throw new ApiException('Any error');
            });

            try {
                // When
                await scootersApi.getAll();
            } catch (error) {
                // Then
                expect(error).toBeInstanceOf(ApiException);
            }

            makeRequestMock.mockRestore();
        });
    });
});
