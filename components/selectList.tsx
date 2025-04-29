import { SelectList } from 'react-native-dropdown-select-list';
import { Image } from 'react-native';

type SelectListProps = {
    style: any;
    setSelected: (text: string) => void;
    selectListOptions:any;
    isDarkMode: boolean;
}

export const SelectListComponent = ({style, setSelected, selectListOptions, isDarkMode}: SelectListProps) => {
    return(

<SelectList //The selectlist displays sorting options.
        arrowicon={<Image source={require('../images/downarrow.png')} tintColor={isDarkMode ? 'white' : 'black'} style={style.downarrow} />}
        setSelected={(value:string) => setSelected(value)}
        data={selectListOptions}
        save="value"
        placeholder="Sort By"
        // eslint-disable-next-line react-native/no-inline-styles
        inputStyles={isDarkMode ? { color: 'white' } : { color: 'black' }}
        search={false}
        boxStyles={isDarkMode ? style.darkDropdownBox : style.dropdownBox}
        dropdownStyles={isDarkMode ? style.darkDropdown : style.dropdown}
        dropdownTextStyles={isDarkMode ? style.darkDropdownText : style.dropdownText}
      />
    );
};
