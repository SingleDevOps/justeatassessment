import { ActivityIndicator, Image, Pressable, TextInput, View } from 'react-native';
import { searchBarStyles } from '../stylesheets/props/searchBar';
import { SearchBarPropType } from '../types/searchBar';

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
                    {loading ? <ActivityIndicator color="white" size="small" /> : <Image source={require('../assets/icon/search_icon.png')} style={searchBarStyles.searchIconImage} />}
                </Pressable>
            </View>
        </View>
    );
};
