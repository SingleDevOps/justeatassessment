import { useMemo, useState } from 'react';
import type { DealType, EtaMinutesType } from '../types/restaurant';

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

export const useRestaurantDetailViewModel = (restaurant: { deals?: DealType[] }) => {
    const [dealsExpanded, setDealsExpanded] = useState(false);

    const uniqueDeals = useMemo(() => deduplicateDeals(restaurant.deals ?? []), [restaurant.deals]);

    const toggleDealsExpanded = () => {
        setDealsExpanded(prev => !prev);
    };

    return { uniqueDeals, dealsExpanded, toggleDealsExpanded };
};
