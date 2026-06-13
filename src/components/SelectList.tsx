import { SelectList } from 'react-native-dropdown-select-list';
import { Image } from 'react-native';
import { selectListStyles } from '../stylesheets/Props/selectList_StyleSheet';
import { SelectListPropType } from '../types/selectList_type';
import { selectListOptions } from '../configs/sortingOptions';

export const SelectListComponent = ({ setSelected, isDarkMode, selected }: SelectListPropType) => {
    return (
        <SelectList //The selectlist displays sorting options.
            arrowicon={<Image source={require('../images/downarrow.png')} tintColor={isDarkMode ? 'white' : 'black'} style={selectListStyles.downarrow} />}
            setSelected={(value: string) => setSelected(value)}
            data={selectListOptions}
            save="value"
            placeholder="Sort By"
            defaultOption={selected ? { key: selected, value: selected } : undefined}
            // eslint-disable-next-line react-native/no-inline-styles
            inputStyles={isDarkMode ? { color: 'white' } : { color: 'black' }}
            search={false}
            boxStyles={isDarkMode ? selectListStyles.darkDropdownBox : selectListStyles.dropdownBox}
            dropdownStyles={isDarkMode ? selectListStyles.darkDropdown : selectListStyles.dropdown}
            dropdownTextStyles={isDarkMode ? selectListStyles.darkDropdownText : selectListStyles.dropdownText}
        />
    );
};
