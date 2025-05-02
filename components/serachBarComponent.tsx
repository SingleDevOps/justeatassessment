import { SearchBar } from 'react-native-elements';
import { searchBarStyles } from '../stylesheets/Props/searchBar_StyleSheet';
import { SearchBarPropType } from '../types/searchBar_type';



export const SearchBarComponent = ({ setPostcode, loading, onSubmit, isDarkMode, postcode }: SearchBarPropType) => {
    return (
        <SearchBar
            placeholder="Enter a UK Postcode"
            onChangeText={((text: string) => setPostcode(text))}
            value={postcode}
            onSubmitEditing={() => onSubmit(postcode)}
            containerStyle={[searchBarStyles.searchBarContainer, isDarkMode && searchBarStyles.darksearchBarContainer]} /* Three Styles for adjusting how the searchBar looks*/
            inputContainerStyle={[searchBarStyles.searchInputContainer, isDarkMode && searchBarStyles.darksearchInputContainer]}
            inputStyle={[searchBarStyles.searchInput, isDarkMode && searchBarStyles.darksearchInput]}
            placeholderTextColor="#888"
            searchIcon={null}
            clearIcon={null}
            showLoading={loading} // ActivityIndicator for showing loading status.
            loadingProps={{ color: '#FF8000', size: 'small' }} // Style of loading indicator
        />
    );
};
