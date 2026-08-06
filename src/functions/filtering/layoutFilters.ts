import { FilterDefType, LayoutFilterItemType } from '../../types/searchData';

export type LayoutFilterDef = {
    id: string;
    title: string;
    count: number;
};

export function getLayoutFilterDefs(
    layout?: Record<string, { contents: LayoutFilterItemType[] }>,
    filters?: Record<string, FilterDefType>,
    fallback: LayoutFilterItemType[] = []
): LayoutFilterDef[] {
    const contents = layout?.['search-refine-filters']?.contents ?? fallback;
    return contents
        .filter(item => item.type === 'filter')
        .map(item => ({
            id: item.id,
            title: item.title || item.id,
            count: filters?.[item.id]?.restaurantIds?.length ?? 0,
        }));
}

export function getRestaurantIdsForLayoutFilters(
    filters: Record<string, FilterDefType> | undefined,
    selectedIds: string[]
): string[] {
    if (!filters || selectedIds.length === 0) {
        return [];
    }
    const ids = new Set<string>();
    selectedIds.forEach(id => {
        filters[id]?.restaurantIds?.forEach(restaurantId => ids.add(restaurantId));
    });
    return Array.from(ids);
}
