import BaseApi from '../base';
import {ApiException} from '../exceptions';

describe('api', () => {
    describe('base', () => {
        it('should prefix urls with "BASE_URL" property as defined in .env file', async () => {
            // Given
            const fetchMock = jest.fn();
            global.fetch = fetchMock.mockImplementationOnce(() => {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: async () => ({}),
                });
            });

            // When
            await new BaseApi().makeRequest('/foo');

            // Then
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/foo');

            fetchMock.mockReset();
        });

        it('should throw an ApiException when response contains 500 status', async () => {
            // Given
            global.fetch = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    ok: false,
                    status: 500,
                    json: async () => ({message: 'any error'}),
                });
            });

            try {
                // When
                await new BaseApi().makeRequest('/foo');
            } catch (error) {
                // Then
                expect(error).toBeInstanceOf(ApiException);
                expect(error.type).toBe('Server Error');
                expect(error.message).toBe('any error');
            }
        });

        it('should throw an ApiException when request throws an error', async () => {
            global.fetch = jest.fn().mockImplementationOnce(() => {
                return Promise.reject({
                    ok: false,
                    status: 404,
                });
            });

            try {
                // When
                await new BaseApi().makeRequest('/foo');
            } catch (error) {
                // Then
                expect(error).toBeInstanceOf(ApiException);
                expect(error.type).toBe('Unknown Error');
            }
        });
    });
});
