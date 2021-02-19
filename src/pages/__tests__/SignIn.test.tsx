import React from 'react';
import {render} from '@testing-library/react-native';

import SignIn from '../SignIn';

test('it renders SignIn as expected', () => {
    const navigation: any = {
        navigate: jest.fn(),
    };
    
    const {toJSON} = render(<SignIn navigation={navigation}/>);

    expect(toJSON()).toMatchSnapshot();
});
