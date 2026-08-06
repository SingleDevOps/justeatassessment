import { renderHook, act } from '@testing-library/react-native';
import { useMainPageViewModel } from '../viewmodels/useMainPageViewModel';
import { handleSearch } from '../functions/api/apiRequest';

jest.mock('../functions/api/apiRequest', () => ({
    handleSearch: jest.fn(),
}));

const mockedHandleSearch = handleSearch as jest.MockedFunction<typeof handleSearch>;

const createNavigationMock = () => ({
    navigate: jest.fn(),
} as any);

describe('useMainPageViewModel', () => {
    beforeEach(() => {
        mockedHandleSearch.mockClear();
    });

    it('cleans the postcode and navigates to DisplayPage on success', async () => {
        const navigation = createNavigationMock();
        mockedHandleSearch.mockResolvedValue({
            ok: true,
            restaurants: [{ id: '1' }],
            allRestaurants: [{ id: '1' }],
        } as any);

        const { result } = renderHook(() => useMainPageViewModel({ navigation, isConnected: true }));

        await act(async () => {
            await result.current.submit('sw1a 0aa');
        });

        expect(mockedHandleSearch).toHaveBeenCalledWith('SW1A0AA');
        expect(navigation.navigate).toHaveBeenCalledWith('DisplayPage', {
            postcode: 'SW1A0AA',
            restaurants: [{ id: '1' }],
            allRestaurants: [{ id: '1' }],
        });
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it('does not search and sets no_connection error when offline', async () => {
        const navigation = createNavigationMock();
        const { result } = renderHook(() => useMainPageViewModel({ navigation, isConnected: false }));

        await act(async () => {
            await result.current.submit('SW1A0AA');
        });

        expect(mockedHandleSearch).not.toHaveBeenCalled();
        expect(navigation.navigate).not.toHaveBeenCalled();
        expect(result.current.error).toBe('no_connection');
    });

    it('sets api_error when the restaurant API fails', async () => {
        const navigation = createNavigationMock();
        mockedHandleSearch.mockResolvedValue({ ok: false, reason: 'api_error' } as any);

        const { result } = renderHook(() => useMainPageViewModel({ navigation, isConnected: true }));

        await act(async () => {
            await result.current.submit('SW1A0AA');
        });

        expect(result.current.error).toBe('api_error');
        expect(navigation.navigate).not.toHaveBeenCalled();
    });

    it('sets invalid_postcode when validation fails', async () => {
        const navigation = createNavigationMock();
        mockedHandleSearch.mockResolvedValue({ ok: false, reason: 'invalid_postcode' } as any);

        const { result } = renderHook(() => useMainPageViewModel({ navigation, isConnected: true }));

        await act(async () => {
            await result.current.submit('11111');
        });

        expect(result.current.error).toBe('invalid_postcode');
        expect(navigation.navigate).not.toHaveBeenCalled();
    });

    it('dismissError clears the current error', async () => {
        const navigation = createNavigationMock();
        mockedHandleSearch.mockResolvedValue({ ok: false, reason: 'api_error' } as any);

        const { result } = renderHook(() => useMainPageViewModel({ navigation, isConnected: true }));

        await act(async () => {
            await result.current.submit('SW1A0AA');
        });
        expect(result.current.error).toBe('api_error');

        act(() => {
            result.current.dismissError();
        });
        expect(result.current.error).toBeNull();
    });

    it('exposes postcode state setters', () => {
        const navigation = createNavigationMock();
        const { result } = renderHook(() => useMainPageViewModel({ navigation, isConnected: true }));

        expect(result.current.postcode).toBe('');
        act(() => {
            result.current.setPostcode('L40TH');
        });
        expect(result.current.postcode).toBe('L40TH');
    });
});
