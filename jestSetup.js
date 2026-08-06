import {jest} from '@jest/globals';

jest.mock('@react-native-community/netinfo', () => ({
    useNetInfo: jest.fn().mockReturnValue({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
      details: {
        isConnectionExpensive: false,
      },
    }),
  }));

jest.mock('@react-native-community/geolocation', () => ({
    getCurrentPosition: jest.fn(),
    requestAuthorization: jest.fn(),
}));

jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const React = require('react');
    const MockMapView = (props) => React.createElement(View, props);
    const MockMarker = (props) => React.createElement(View, props);
    return {
        __esModule: true,
        default: MockMapView,
        MapView: MockMapView,
        Marker: MockMarker,
    };
});
