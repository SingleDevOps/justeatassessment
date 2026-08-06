import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import { searchBarStyles } from '../stylesheets/props/searchBar';
import { SearchBarPropType } from '../types/searchBar';
import { SearchIcon } from './icons/SearchIcon';

export const SearchBarComponent = ({ setPostcode, loading, onSubmit, theme, postcode }: SearchBarPropType) => {
    const styles = searchBarStyles(theme);

    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchInputContainer}>
                <TextInput
                    placeholder="Enter a UK Postcode"
                    onChangeText={(text: string) => setPostcode(text)}
                    value={postcode}
                    onSubmitEditing={() => onSubmit(postcode)}
                    style={styles.searchInput}
                    placeholderTextColor={theme.color.contentPlaceholder}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    returnKeyType="search"
                    accessibilityLabel="Postcode search input"
                />
                <Pressable
                    onPress={() => onSubmit(postcode)}
                    style={styles.searchButton}
                    disabled={loading}
                    accessibilityRole="button"
                    accessibilityLabel="Search restaurants"
                    accessibilityState={{ disabled: loading }}
                >
                    {loading ? <ActivityIndicator color={theme.color.contentInverseSolid} size="small" /> : <SearchIcon color={theme.color.contentInverseSolid} size={theme.spacing.d} />}
                </Pressable>
            </View>
        </View>
    );
};
