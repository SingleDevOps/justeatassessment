import { View, TextInput, Image, Pressable, Text } from 'react-native';
import { filterSearchBarStyles } from '../stylesheets/props/filterSearchBar';
import { FilterSearchBarPropType } from '../types/filterSearchBar';

export const FilterSearchBar = ({ query, onChangeText, isDarkMode, onFilterPress, activeFilterCount }: FilterSearchBarPropType) => {
    const hasActiveFilters = !!(activeFilterCount && activeFilterCount > 0);

    return (
        <View style={filterSearchBarStyles.container}>
            <View style={[filterSearchBarStyles.inputContainer, isDarkMode && filterSearchBarStyles.darkinputContainer]}>
                <Image source={require('../assets/icon/search_icon.png')} style={filterSearchBarStyles.searchIcon} />
                <TextInput
                    placeholder="Filter restaurants..."
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={onChangeText}
                    style={[filterSearchBarStyles.input, isDarkMode && filterSearchBarStyles.darkinput]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                {query.length > 0 && (
                    <Pressable onPress={() => onChangeText('')} style={[filterSearchBarStyles.clearButton, isDarkMode && filterSearchBarStyles.darkclearButton]}>
                        <View>
                            <View style={{ width: 10, height: 2, backgroundColor: '#FFFFFF', transform: [{ rotate: '45deg' }] }} />
                            <View style={{ width: 10, height: 2, backgroundColor: '#FFFFFF', transform: [{ rotate: '-45deg' }], marginTop: -2 }} />
                        </View>
                    </Pressable>
                )}
                {onFilterPress && (
                    <Pressable
                        onPress={onFilterPress}
                        style={[
                            filterSearchBarStyles.filterButton,
                            isDarkMode && filterSearchBarStyles.darkfilterButton,
                            hasActiveFilters && filterSearchBarStyles.activeFilterButton,
                        ]}
                    >
                        <Text
                            style={[
                                filterSearchBarStyles.filterButtonText,
                                isDarkMode && { color: '#E6E6E6' },
                                hasActiveFilters && filterSearchBarStyles.activeFilterButtonText,
                            ]}
                        >
                            ⚙
                        </Text>
                        {hasActiveFilters && (
                            <View style={filterSearchBarStyles.badge}>
                                <Text style={filterSearchBarStyles.badgeText}>{activeFilterCount}</Text>
                            </View>
                        )}
                    </Pressable>
                )}
            </View>
        </View>
    );
};
