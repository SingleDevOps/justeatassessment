import { RestaurantType } from '../../types/restaurant';
import { PromotedPlacementType } from '../../types/searchData';

export function sortByPromotedPlacement(
    restaurants: RestaurantType[],
    promotedPlacement?: PromotedPlacementType
): RestaurantType[] {
    const rankedIds = promotedPlacement?.rankedIds ?? [];
    const rankMap = new Map<string, number>();
    rankedIds.forEach((id, index) => {
        rankMap.set(id, index);
    });

    const sorted = [...restaurants];
    sorted.sort((a, b) => {
        const rankA = rankMap.get(a.id.toString());
        const rankB = rankMap.get(b.id.toString());
        if (rankA === undefined && rankB === undefined) {
            return 0;
        }
        if (rankA === undefined) {
            return 1;
        }
        if (rankB === undefined) {
            return -1;
        }
        return rankA - rankB;
    });
    return sorted;
}
