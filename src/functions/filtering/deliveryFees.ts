import { DeliveryFeesEntryType, DeliveryFeesType } from '../../types/searchData';

export function getDeliveryFeesEntry(restaurantId: string | number, deliveryFees?: DeliveryFeesType): DeliveryFeesEntryType | undefined {
    if (!deliveryFees) {
        return undefined;
    }
    return deliveryFees.restaurants?.[restaurantId.toString()];
}

export function getFreeDeliveryThreshold(entry?: DeliveryFeesEntryType): number | null {
    if (!entry || !Array.isArray(entry.bands)) {
        return null;
    }
    const freeBand = entry.bands.find(band => band.fee === 0);
    if (!freeBand) {
        return null;
    }
    return freeBand.minimumAmount;
}

export function formatMoney(value: number): string {
    if (value === 0) {
        return 'Free';
    }
    return `£${(value / 100).toFixed(2)}`;
}

export function getFreeDeliveryLabel(restaurantId: string | number, deliveryFees?: DeliveryFeesType): string | null {
    const threshold = getFreeDeliveryThreshold(getDeliveryFeesEntry(restaurantId, deliveryFees));
    if (threshold === null) {
        return null;
    }
    if (threshold === 0) {
        return 'Free delivery';
    }
    return `Free delivery over £${(threshold / 100).toFixed(0)}`;
}

export function formatFeeBands(entry?: DeliveryFeesEntryType): { label: string; fee: string }[] {
    if (!entry || !Array.isArray(entry.bands)) {
        return [];
    }
    return entry.bands.map((band, index) => {
        const isLast = index === entry.bands.length - 1;
        const next = entry.bands[index + 1];
        if (isLast) {
            return {
                label: `Orders over ${formatMoney(band.minimumAmount)}`,
                fee: formatMoney(band.fee),
            };
        }
        return {
            label: `Orders from ${formatMoney(band.minimumAmount)} to ${formatMoney(next.minimumAmount)}`,
            fee: formatMoney(band.fee),
        };
    });
}
