import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import VehicleBanner from '../VehicleBanner';
import {Scooter} from '../../api/models/Scooter';

test('renders the right status label label', () => {
    // Given
    const vehicle = new Scooter('not_available');
    const component = <VehicleBanner vehicle={vehicle} visible={true} onClose={() => {}} />;

    // When
    const {getByTestId} = render(component);

    // Then
    expect(getByTestId('vehicle-banner__status-value').children[0]).toBe(' Not Available');
});

test('triggers close callback', () => {
    // Given
    const vehicle = new Scooter('available');
    const onCloseMock = jest.fn();
    const component = <VehicleBanner vehicle={vehicle} visible={true} onClose={onCloseMock} />;

    // When
    const {getByText} = render(component);
    fireEvent.press(getByText('Close'));

    // Then
    expect(onCloseMock).toHaveBeenCalled();
});
