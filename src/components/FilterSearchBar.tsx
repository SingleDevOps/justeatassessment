import { View, TextInput, Image, Pressable } from 'react-native';
import { filterSearchBarStyles } from '../stylesheets/props/filterSearchBar';
import { FilterSearchBarPropType } from '../types/filterSearchBar';

export const FilterSearchBar = ({ query, onChangeText, isDarkMode }: FilterSearchBarPropType) => {
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
            </View>
        </View>
    );
};
