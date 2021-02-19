import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import NotificationMessage from '../NotificationMessage';

test('renders the passed label', () => {
    // Given
    const component = <NotificationMessage message="Test Label" visible={true} onClose={() => {}} />;

    // When
    const {getByText} = render(component);

    // Then
    expect(getByText('Test Label')).not.toBeNull();
});

test('triggers close callback', () => {
    // Given
    const onCloseMock = jest.fn();
    const component = <NotificationMessage message="Test Label" visible={true} onClose={onCloseMock} />;

    // When
    const {getByText} = render(component);
    fireEvent.press(getByText('Retry'));

    // Then
    expect(onCloseMock).toHaveBeenCalled();
});
