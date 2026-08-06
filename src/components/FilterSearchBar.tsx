import { View, TextInput, Pressable, Text } from 'react-native';
import { filterSearchBarStyles } from '../stylesheets/props/filterSearchBar';
import { FilterSearchBarPropType } from '../types/filterSearchBar';
import { SearchIcon } from './icons/SearchIcon';
import { SettingsIcon } from './icons/SettingsIcon';

export const FilterSearchBar = ({ query, onChangeText, theme, onFilterPress, activeFilterCount }: FilterSearchBarPropType) => {
    const hasActiveFilters = !!(activeFilterCount && activeFilterCount > 0);
    const styles = filterSearchBarStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <SearchIcon color={theme.color.contentSubdued} size={theme.spacing.d} style={styles.searchIcon} />
                <TextInput
                    placeholder="Filter restaurants..."
                    placeholderTextColor={theme.color.contentPlaceholder}
                    value={query}
                    onChangeText={onChangeText}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    accessibilityLabel="Filter restaurants input"
                />
                {query.length > 0 && (
                    <Pressable
                        onPress={() => onChangeText('')}
                        style={styles.clearButton}
                        accessibilityRole="button"
                        accessibilityLabel="Clear search"
                    >
                        <View>
                            <View style={[styles.clearXBar, { transform: [{ rotate: '45deg' }] }]} />
                            <View style={[styles.clearXBarSecond, { transform: [{ rotate: '-45deg' }] }]} />
                        </View>
                    </Pressable>
                )}
                {onFilterPress && (
                    <Pressable
                        onPress={onFilterPress}
                        style={[
                            styles.filterButton,
                            hasActiveFilters && styles.activeFilterButton,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel={hasActiveFilters ? `Filters, ${activeFilterCount} active` : 'Filters'}
                        accessibilityState={{ selected: hasActiveFilters }}
                    >
                        <SettingsIcon
                            color={hasActiveFilters ? theme.color.contentInverseSolid : theme.color.contentDefault}
                            size={theme.spacing.d}
                        />
                        {hasActiveFilters && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{activeFilterCount}</Text>
                            </View>
                        )}
                    </Pressable>
                )}
            </View>
        </View>
    );
};
