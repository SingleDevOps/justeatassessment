import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FilterChipsBar } from '../components/FilterChipsBar';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: jest.fn().mockReturnValue('light'),
}));

const defs = [
    { id: 'free_delivery', title: 'Free Delivery', count: 2 },
    { id: 'open_now', title: 'Open Now', count: 0 },
];

describe('<FilterChipsBar />', () => {
    it('renders a chip per definition with its count', () => {
        const { getByTestId, getByText, queryByText } = render(
            <FilterChipsBar defs={defs} selectedIds={[]} onToggle={jest.fn()} isDarkMode={false} />
        );

        expect(getByTestId('filter-chip-free_delivery')).toBeTruthy();
        expect(getByTestId('filter-chip-open_now')).toBeTruthy();
        expect(getByText('Free Delivery')).toBeTruthy();
        expect(getByText('2')).toBeTruthy();
        expect(queryByText('Open Now')).toBeTruthy();
    });

    it('does not render when there are no definitions', () => {
        const { queryByTestId } = render(
            <FilterChipsBar defs={[]} selectedIds={[]} onToggle={jest.fn()} isDarkMode={false} />
        );
        expect(queryByTestId('filter-chip-free_delivery')).toBeNull();
    });

    it('toggles a chip via callback', () => {
        const onToggle = jest.fn();
        const { getByTestId } = render(
            <FilterChipsBar defs={defs} selectedIds={[]} onToggle={onToggle} isDarkMode={false} />
        );

        fireEvent.press(getByTestId('filter-chip-free_delivery'));
        expect(onToggle).toHaveBeenCalledWith('free_delivery');
    });
});
