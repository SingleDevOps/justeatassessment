/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import MainPage from '../pages/MainPage';

test('renders correctly', async () => {
  const props = {
    navigation: { setOptions: jest.fn() },
    route: { params: { postcode: 'L40TH' } },
  };

  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<MainPage {...props}/>);
  });
});
