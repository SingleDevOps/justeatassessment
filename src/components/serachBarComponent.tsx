import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { searchBarStyles } from '../stylesheets/Props/searchBar_StyleSheet';
import { SearchBarPropType } from '../types/searchBar_type';



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
                {loading ? <ActivityIndicator color="#FF8000" size="small" /> : null}
                {postcode ? (
                    <Pressable onPress={() => setPostcode('')} style={searchBarStyles.actionButton}>
                        <Text style={[searchBarStyles.actionText, isDarkMode && searchBarStyles.darksearchInput]}>Clear</Text>
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
};
