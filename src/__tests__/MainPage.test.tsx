import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import MainPage from '../pages/MainPage';
import { handleSearch } from '../functions/api/apiRequest';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn().mockReturnValue('light'),
}));

jest.mock('../functions/api/apiRequest', () => ({
  handleSearch: jest.fn(),
}));

const mockedHandleSearch = handleSearch as jest.MockedFunction<typeof handleSearch>;

const createProps = () => ({
  navigation: {
    setOptions: jest.fn(),
    navigate: jest.fn(),
  },
  route: { params: undefined },
} as any);

const findText = (renderer: ReactTestRenderer.ReactTestRenderer, content: string) =>
  renderer.root.findAllByType(Text).some(node => node.props.children === content);

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<MainPage {...createProps()} />);
  });
});

test('shows invalid postcode error in a dialog and dismisses it', async () => {
  mockedHandleSearch.mockResolvedValue({ ok: false, reason: 'invalid_postcode' } as any);

  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<MainPage {...createProps()} />);
  });

  const input = renderer.root.findByProps({ accessibilityLabel: 'Postcode search input' });
  await ReactTestRenderer.act(async () => {
    input.props.onChangeText('11111');
  });
  const updatedInput = renderer.root.findByProps({ accessibilityLabel: 'Postcode search input' });
  await ReactTestRenderer.act(async () => {
    updatedInput.props.onSubmitEditing();
  });

  expect(mockedHandleSearch).toHaveBeenCalledWith('11111');
  expect(findText(renderer, 'Invalid Postcode')).toBe(true);

  const dismiss = renderer.root.findByProps({ accessibilityLabel: 'Dismiss' });
  await ReactTestRenderer.act(async () => {
    dismiss.props.onPress();
  });

  expect(findText(renderer, 'Invalid Postcode')).toBe(false);
});

test('shows retry action for api errors and retries the search', async () => {
  mockedHandleSearch.mockResolvedValueOnce({ ok: false, reason: 'api_error' } as any);

  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<MainPage {...createProps()} />);
  });

  const input = renderer.root.findByProps({ accessibilityLabel: 'Postcode search input' });
  await ReactTestRenderer.act(async () => {
    input.props.onChangeText('SW1A0AA');
  });
  const updatedInput = renderer.root.findByProps({ accessibilityLabel: 'Postcode search input' });
  await ReactTestRenderer.act(async () => {
    updatedInput.props.onSubmitEditing();
  });

  expect(findText(renderer, 'Error fetching restaurant data')).toBe(true);

  const retry = renderer.root.findByProps({ accessibilityLabel: 'Try again' });
  mockedHandleSearch.mockResolvedValueOnce({
    ok: true,
    restaurants: [],
    allRestaurants: [],
  } as any);
  await ReactTestRenderer.act(async () => {
    retry.props.onPress();
  });

  expect(mockedHandleSearch).toHaveBeenCalledWith('SW1A0AA');
});
