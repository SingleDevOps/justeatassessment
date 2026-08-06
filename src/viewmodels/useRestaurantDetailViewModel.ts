import { useMemo, useState } from 'react';
import type { DealType, EtaMinutesType } from '../types/restaurant';
import type { DeliveryFeesEntryType } from '../types/searchData';
import { formatFeeBands, formatMoney, getFreeDeliveryThreshold } from '../functions/filtering/deliveryFees';

export const DEALS_INITIAL_LIMIT = 5;

export function formatDate(dateStr?: string): string {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatEta(eta?: EtaMinutesType): string {
    if (!eta) return 'N/A';
    if (eta.approximate !== undefined) return `~${eta.approximate} min`;
    if (eta.rangeLower !== undefined && eta.rangeUpper !== undefined) {
        return `${eta.rangeLower}-${eta.rangeUpper} min`;
    }
    return 'N/A';
}

export function getDealOfferTypeLabel(offerType?: string): string {
    switch (offerType) {
        case 'ItemLevelDiscount':
            return 'Item discount';
        case 'FreeItem':
            return 'Free item';
        case 'Voucher':
            return 'Voucher';
        case 'StampCard':
            return 'Collect stamps';
        case 'Notification':
            return 'Offer';
        default:
            return offerType || 'Offer';
    }
}

function deduplicateDeals(deals: DealType[]): DealType[] {
    const seen = new Set<string>();
    return deals.filter(deal => {
        if (deal.offerType === 'StampCard' && (!deal.description || deal.description.trim() === '')) {
            return false;
        }
        const key = deal.offerType + '::' + deal.description;
        if (seen.has(key)) { return false; }
        seen.add(key);
        return true;
    });
}

export const useRestaurantDetailViewModel = (
    restaurant: { deals?: DealType[]; rating?: { userRating?: number | null } },
    deliveryFees?: DeliveryFeesEntryType
) => {
    const [dealsExpanded, setDealsExpanded] = useState(false);

    const uniqueDeals = useMemo(() => deduplicateDeals(restaurant.deals ?? []), [restaurant.deals]);

    const userRating = restaurant.rating?.userRating ?? null;

    const feeBands = useMemo(() => formatFeeBands(deliveryFees), [deliveryFees]);

    const freeDeliveryLabel = useMemo(() => {
        const threshold = getFreeDeliveryThreshold(deliveryFees);
        if (threshold === null) {
            return null;
        }
        if (threshold === 0) {
            return 'Free delivery';
        }
        return `Free delivery over ${formatMoney(threshold)}`;
    }, [deliveryFees]);

    const toggleDealsExpanded = () => {
        setDealsExpanded(prev => !prev);
    };

    return {
        uniqueDeals,
        dealsExpanded,
        toggleDealsExpanded,
        userRating,
        feeBands,
        freeDeliveryLabel,
        minimumOrderValue: deliveryFees?.minimumOrderValue ?? null,
    };
};
