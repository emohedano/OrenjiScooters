import React from 'react';
import {render} from '@testing-library/react-native';

import Header from '../Header';

test('it renders header as expected', () => {
    const {toJSON} = render(<Header />);

    expect(toJSON()).toMatchSnapshot();
});
