import { sortByPromotedPlacement } from '../functions/sorting/sortByPromotedPlacement';

const restaurants = [
    { id: '1', name: 'One' },
    { id: '2', name: 'Two' },
    { id: '3', name: 'Three' },
    { id: '4', name: 'Four' },
] as any;

const promotedPlacement = {
    filteredSearchPromotedLimit: 2,
    rankedIds: ['3', '1'],
    restaurants: {
        '3': { restaurantId: '3', defaultPromoted: true },
        '1': { restaurantId: '1', defaultPromoted: true },
    },
} as any;

describe('sortByPromotedPlacement', () => {
    it('puts ranked restaurants first in ranked order', () => {
        const result = sortByPromotedPlacement(restaurants, promotedPlacement);
        expect(result.map(r => r.id)).toEqual(['3', '1', '2', '4']);
    });

    it('keeps unranked restaurants in their original relative order', () => {
        const result = sortByPromotedPlacement(restaurants, promotedPlacement);
        expect(result.slice(2).map(r => r.id)).toEqual(['2', '4']);
    });

    it('does not reorder when placement data is missing', () => {
        const result = sortByPromotedPlacement(restaurants, undefined);
        expect(result.map(r => r.id)).toEqual(['1', '2', '3', '4']);
    });

    it('does not mutate the input array', () => {
        const input = [...restaurants];
        sortByPromotedPlacement(input, promotedPlacement);
        expect(input.map(r => r.id)).toEqual(['1', '2', '3', '4']);
    });
});
