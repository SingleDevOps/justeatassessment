import { getDeliveryFeesEntry, getFreeDeliveryThreshold, formatMoney, getFreeDeliveryLabel, formatFeeBands } from '../functions/filtering/deliveryFees';

const deliveryFees = {
    restaurants: {
        '213648': {
            restaurantId: '213648',
            minimumOrderValue: 0,
            bands: [
                { minimumAmount: 0, fee: 300 },
                { minimumAmount: 1000, fee: 0 },
            ],
        },
        '9990': {
            restaurantId: '9990',
            minimumOrderValue: 0,
            bands: [
                { minimumAmount: 0, fee: 150 },
                { minimumAmount: 2000, fee: 0 },
            ],
        },
        '273157': {
            restaurantId: '273157',
            minimumOrderValue: 800,
            bands: [{ minimumAmount: 800, fee: 250 }],
        },
    },
} as any;

describe('deliveryFees helpers', () => {
    it('returns the fee entry for a restaurant id', () => {
        expect(getDeliveryFeesEntry('213648', deliveryFees)?.restaurantId).toBe('213648');
        expect(getDeliveryFeesEntry(213648, deliveryFees)?.restaurantId).toBe('213648');
    });

    it('returns undefined when no delivery fees data', () => {
        expect(getDeliveryFeesEntry('213648', undefined)).toBeUndefined();
        expect(getDeliveryFeesEntry('missing', deliveryFees)).toBeUndefined();
    });

    it('finds the free delivery threshold from the first zero-fee band', () => {
        expect(getFreeDeliveryThreshold(deliveryFees.restaurants['213648'])).toBe(1000);
        expect(getFreeDeliveryThreshold(deliveryFees.restaurants['9990'])).toBe(2000);
    });

    it('returns null when there is no free delivery band', () => {
        expect(getFreeDeliveryThreshold(deliveryFees.restaurants['273157'])).toBeNull();
        expect(getFreeDeliveryThreshold(undefined)).toBeNull();
    });

    it('formats money values', () => {
        expect(formatMoney(0)).toBe('Free');
        expect(formatMoney(150)).toBe('£1.50');
        expect(formatMoney(1000)).toBe('£10.00');
    });

    it('builds the free delivery label for a restaurant', () => {
        expect(getFreeDeliveryLabel('213648', deliveryFees)).toBe('Free delivery over £10');
        expect(getFreeDeliveryLabel('9990', deliveryFees)).toBe('Free delivery over £20');
        expect(getFreeDeliveryLabel('273157', deliveryFees)).toBeNull();
        expect(getFreeDeliveryLabel('213648', undefined)).toBeNull();
    });

    it('labels a free delivery threshold of zero as simply free', () => {
        const entry = { restaurantId: '1', minimumOrderValue: 0, bands: [{ minimumAmount: 0, fee: 0 }] };
        expect(getFreeDeliveryLabel('1', { restaurants: { '1': entry } } as any)).toBe('Free delivery');
    });

    it('formats fee bands with range labels', () => {
        const bands = formatFeeBands(deliveryFees.restaurants['213648']);
        expect(bands).toEqual([
            { label: 'Orders from Free to £10.00', fee: '£3.00' },
            { label: 'Orders over £10.00', fee: 'Free' },
        ]);
    });

    it('returns an empty list when no fee entry exists', () => {
        expect(formatFeeBands(undefined)).toEqual([]);
    });
});
