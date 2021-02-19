import React from 'react';
import {act, render, waitFor, waitForElement} from '@testing-library/react-native';
import {create, ReactTestRenderer} from 'react-test-renderer';
import ScootersApi from '../../api/scooters';
import ConfigManager from '../../services/ConfigManager';
import Main from '../Main';

jest.mock('../../components/NotificationMessage');
jest.mock('../../components/Map');
jest.mock('../../components/VehicleBanner');

it('should fetch all the vehicles', async () => {
    // Given
    const ConfigManagerMock = jest.spyOn(ConfigManager, 'getConfigValue').mockImplementation((configName) => {        
        if (configName === 'MAPBOX_TOKEN') {
            return '123';
        }
        return null;
    });

    const navigation: any = {
        navigate: jest.fn(),
    };

    const fetchAllMock = jest.spyOn(ScootersApi.prototype, 'getAll').mockResolvedValue({} as any);
    const component = <Main navigation={navigation} />;

    // When
    await act(async () => {
        create(component);
    });

    // Then
    expect(fetchAllMock).toBeCalledTimes(1);
    ConfigManagerMock.mockRestore();
    fetchAllMock.mockRestore();
});


it('should send the right data to the map component', () => {
    // TODO: Check why the hooks are not being called
});


it('should set the state to error when api exception is thrown', async () => {
    // TODO: Check why the hooks are not being called
});


it('should set state to error when no token was provided', () => {
    // Given
    const ConfigManagerMock = jest.spyOn(ConfigManager, 'getConfigValue').mockImplementation(() => {
        return null;
    });

    const navigation: any = {
        navigate: jest.fn(),
    };

    const component = <Main navigation={navigation} />;

    // When
    const {getByTestId} = render(component);

    // Then
    expect(getByTestId('notification-message__mock').props).toEqual(
        expect.objectContaining({
            visible: true,
            message: 'Mapbox token not found',
        }),
    );
});
