import { SearchBar } from 'react-native-elements';


type SearchBarProp = {
    style:any;
    setPostcode: (text: string) => void;
    loading: boolean;
    onSubmit: (text: string) => Promise<any | null>;
    isDarkMode: boolean;
    postcode: string;
}


export const SearchBarComponent = ({ style, setPostcode, loading, onSubmit, isDarkMode, postcode }: SearchBarProp) => {
    return (
        <SearchBar
            placeholder="Enter a UK Postcode"
            onChangeText={((text: string) => setPostcode(text))}
            value={postcode}
            onSubmitEditing={() => onSubmit(postcode)}
            containerStyle={[style.searchBarContainer, isDarkMode && style.darksearchBarContainer]} /* Three Styles for adjusting how the searchBar looks*/
            inputContainerStyle={[style.searchInputContainer, isDarkMode && style.darksearchInputContainer]}
            inputStyle={[style.searchInput, isDarkMode && style.darksearchInput]}
            placeholderTextColor="#888"
            searchIcon={null}
            clearIcon={null}
            showLoading={loading} // ActivityIndicator for showing loading status.
            loadingProps={{ color: '#FF8000', size: 'small' }} // Style of loading indicator
        />
    );
};
