import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBarComponent } from '../components/SearchBar';
import { pieTokens } from '../configs/pieTokens';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: jest.fn().mockReturnValue('light'),
}));

describe('<SearchBarComponent />', () => {
    it('submits the postcode from the search button', () => {
        const onSubmit = jest.fn();
        const { getByLabelText } = render(
            <SearchBarComponent setPostcode={jest.fn()} loading={false} onSubmit={onSubmit} theme={pieTokens.light} postcode="L4 0TH" />
        );

        fireEvent.press(getByLabelText('Search restaurants'));
        expect(onSubmit).toHaveBeenCalledWith('L4 0TH');
    });

    it('exposes the input and button to screen readers', () => {
        const { getByLabelText, getByRole } = render(
            <SearchBarComponent setPostcode={jest.fn()} loading={false} onSubmit={jest.fn()} theme={pieTokens.light} postcode="" />
        );

        expect(getByLabelText('Postcode search input')).toBeVisible();
        expect(getByRole('button', { name: 'Search restaurants' })).toBeTruthy();
    });
});
