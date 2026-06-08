import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import { searchBarStyles } from '../stylesheets/Props/searchBar_StyleSheet';
import { SearchBarPropType } from '../types/searchBar_type';

const SearchIcon = () => (
    <View style={searchBarStyles.searchIcon}>
        <View style={searchBarStyles.searchIconLens} />
        <View style={searchBarStyles.searchIconHandle} />
    </View>
);



export const SearchBarComponent = ({ setPostcode, loading, onSubmit, isDarkMode, postcode }: SearchBarPropType) => {
    return (
        <View style={[searchBarStyles.searchBarContainer, isDarkMode && searchBarStyles.darksearchBarContainer]}>
            <View style={[searchBarStyles.searchInputContainer, isDarkMode && searchBarStyles.darksearchInputContainer]}>
                <TextInput
                    placeholder="Enter a UK Postcode"
                    onChangeText={(text: string) => setPostcode(text)}
                    value={postcode}
                    onSubmitEditing={() => onSubmit(postcode)}
                    style={[searchBarStyles.searchInput, isDarkMode && searchBarStyles.darksearchInput]}
                    placeholderTextColor="#888"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    returnKeyType="search"
                />
                <Pressable onPress={() => onSubmit(postcode)} style={searchBarStyles.searchButton} disabled={loading}>
                    {loading ? <ActivityIndicator color="white" size="small" /> : <SearchIcon />}
                </Pressable>
            </View>
        </View>
    );
};
