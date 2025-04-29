import { SearchBar } from 'react-native-elements';
import {searchBarStyles} from '../stylesheets/Props/searchBar_StyleSheet';

type SearchBarProp = {
    setPostcode: (text: string) => void;
    loading: boolean;
    onSubmit: (text: string) => Promise<any | null>;
    isDarkMode: boolean;
    postcode: string;
}


export const SearchBarComponent = ({ setPostcode, loading, onSubmit, isDarkMode, postcode }: SearchBarProp) => {
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
