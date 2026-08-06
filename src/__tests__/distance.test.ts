import { haversineDistanceMeters, formatDistance } from '../functions/map/distance';

describe('haversineDistanceMeters', () => {
    it('returns 0 for identical coordinates', () => {
        const point = { latitude: 53.431267, longitude: -2.961584 };
        expect(haversineDistanceMeters(point, point)).toBe(0);
    });

    it('computes a known distance between two Liverpool points', () => {
        const metaDataLocation = { latitude: 53.431267, longitude: -2.961584 };
        const restaurantLocation = { latitude: 53.438825, longitude: -2.970989 };
        const distance = haversineDistanceMeters(metaDataLocation, restaurantLocation);
        expect(distance).toBeGreaterThan(1000);
        expect(distance).toBeLessThan(1100);
    });

    it('is symmetric', () => {
        const a = { latitude: 53.4, longitude: -2.96 };
        const b = { latitude: 53.44, longitude: -2.99 };
        expect(haversineDistanceMeters(a, b)).toBeCloseTo(haversineDistanceMeters(b, a), 6);
    });

    it('approximates a 1 degree latitude distance (~111 km)', () => {
        const distance = haversineDistanceMeters(
            { latitude: 53, longitude: -2 },
            { latitude: 54, longitude: -2 },
        );
        expect(distance).toBeGreaterThan(110000);
        expect(distance).toBeLessThan(112000);
    });
});

describe('formatDistance', () => {
    it('formats meters under 1 km', () => {
        expect(formatDistance(0)).toBe('0 m');
        expect(formatDistance(499)).toBe('499 m');
    });

    it('formats km with one decimal below 10 km', () => {
        expect(formatDistance(1000)).toBe('1.0 km');
        expect(formatDistance(1047)).toBe('1.0 km');
        expect(formatDistance(5260)).toBe('5.3 km');
    });

    it('rounds km at or above 10 km', () => {
        expect(formatDistance(10000)).toBe('10 km');
        expect(formatDistance(15400)).toBe('15 km');
    });
});
