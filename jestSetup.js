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
