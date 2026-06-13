import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import MainPage from '../pages/MainPage';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn().mockReturnValue('light'),
}));

test('renders correctly', async () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
      navigate: jest.fn(),
    },
    route: { params: undefined },
  } as any;

  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<MainPage {...props} />);
  });
});
