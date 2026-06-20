export type FilterSearchBarPropType = {
    query: string;
    onChangeText: (text: string) => void;
    isDarkMode: boolean;
    onFilterPress?: () => void;
    activeFilterCount?: number;
};
