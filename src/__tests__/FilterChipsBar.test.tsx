import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FilterChipsBar } from '../components/FilterChipsBar';
import { pieTokens } from '../configs/pieTokens';

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
            <FilterChipsBar defs={defs} selectedIds={[]} onToggle={jest.fn()} theme={pieTokens.light} />
        );

        expect(getByTestId('filter-chip-free_delivery')).toBeTruthy();
        expect(getByTestId('filter-chip-open_now')).toBeTruthy();
        expect(getByText('Free Delivery')).toBeTruthy();
        expect(getByText('2')).toBeTruthy();
        expect(queryByText('Open Now')).toBeTruthy();
    });

    it('does not render when there are no definitions', () => {
        const { queryByTestId } = render(
            <FilterChipsBar defs={[]} selectedIds={[]} onToggle={jest.fn()} theme={pieTokens.light} />
        );
        expect(queryByTestId('filter-chip-free_delivery')).toBeNull();
    });

    it('toggles a chip via callback', () => {
        const onToggle = jest.fn();
        const { getByTestId } = render(
            <FilterChipsBar defs={defs} selectedIds={[]} onToggle={onToggle} theme={pieTokens.light} />
        );

        fireEvent.press(getByTestId('filter-chip-free_delivery'));
        expect(onToggle).toHaveBeenCalledWith('free_delivery');
    });

    it('exposes each chip as a selectable button with an accessible name', () => {
        const { getByRole } = render(
            <FilterChipsBar defs={defs} selectedIds={['free_delivery']} onToggle={jest.fn()} theme={pieTokens.light} />
        );

        const selectedChip = getByRole('button', { name: 'Free Delivery, 2 restaurants' });
        expect(selectedChip).toBeSelected();

        const unselectedChip = getByRole('button', { name: 'Open Now' });
        expect(unselectedChip).not.toBeSelected();
    });
});
