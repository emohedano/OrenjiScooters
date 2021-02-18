/**
 * Header
 *
 * @format
 */

import React from 'react';
import {Appbar} from 'react-native-paper';

function Header() {
    return (
        <Appbar.Header>
            <Appbar.Content title="オレンジ" subtitle="Scooters" />
        </Appbar.Header>
    );
}

export default Header;
