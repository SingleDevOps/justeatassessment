import { SelectList } from 'react-native-dropdown-select-list';
import { Image } from 'react-native';
import { selectListStyles } from '../stylesheets/Props/selectList_StyleSheet';

type SelectListProps = {
    setSelected: (text: string) => void;
    selectListOptions: any;
    isDarkMode: boolean;
}

export const SelectListComponent = ({setSelected, selectListOptions, isDarkMode }: SelectListProps) => {
    return (

        <SelectList //The selectlist displays sorting options.
            arrowicon={<Image source={require('../images/downarrow.png')} tintColor={isDarkMode ? 'white' : 'black'} style={selectListStyles.downarrow} />}
            setSelected={(value: string) => setSelected(value)}
            data={selectListOptions}
            save="value"
            placeholder="Sort By"
            // eslint-disable-next-line react-native/no-inline-styles
            inputStyles={isDarkMode ? { color: 'white' } : { color: 'black' }}
            search={false}
            boxStyles={isDarkMode ? selectListStyles.darkDropdownBox : selectListStyles.dropdownBox}
            dropdownStyles={isDarkMode ? selectListStyles.darkDropdown : selectListStyles.dropdown}
            dropdownTextStyles={isDarkMode ? selectListStyles.darkDropdownText : selectListStyles.dropdownText}
        />
    );
};
