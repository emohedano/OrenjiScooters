/**
 * Header
 *
 * @format
 */

import React from 'react';
import {Appbar} from 'react-native-paper';

function Header() {
    return (
        <Appbar.Header accessibilityTraits="header" accessibilityComponentType="header">
            <Appbar.Content
                title="オレンジ"
                subtitle="Scooters"
                accessibilityTraits="header"
                accessibilityComponentType="header"
            />
        </Appbar.Header>
    );
}

export default Header;
