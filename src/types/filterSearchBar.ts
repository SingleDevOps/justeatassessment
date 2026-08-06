import type { PieTokens } from '../configs/pieTokens';

export type FilterSearchBarPropType = {
    query: string;
    onChangeText: (text: string) => void;
    theme: PieTokens;
    onFilterPress?: () => void;
    activeFilterCount?: number;
};
