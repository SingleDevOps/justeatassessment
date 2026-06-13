import { StyleSheet } from 'react-native';

export const selectListStyles = StyleSheet.create({
    // Dark mode override for dropdown box
    // Changes colors to match dark theme
    darkDropdownBox: {
        borderColor: '#858a7e',  // Use a visible border color that matches your theme
        backgroundColor: '#1A1A18', // Change from 'white' to '#1A1A18'
        borderWidth: 1,  // Increase border width for better visibility
        fontFamily: 'OpenSans-Regular',
        top: 5,
        marginHorizontal: 17,
        marginVertical: 10,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    // Style for dropdown selection box
    // Defines appearance with border, background, and spacing
    dropdownBox: {
        fontFamily: 'OpenSans-Regular',
        top: 5,
        marginHorizontal: 17,
        marginVertical: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: 'white',
        paddingVertical: 6,
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    // Dark mode override for expanded dropdown
    // Changes background and border colors for dark theme
    darkDropdown: {
        borderColor: '#1A1A18',
        backgroundColor: '#262626',
        width: '92%',
        paddingBottom: 1,
        alignSelf: 'center',
        marginTop: 5,
    },

    // Style for dropdown list when expanded
    // Defines width, background, and positioning
    dropdown: {
        width: '92%',
        paddingBottom: 1,
        borderColor: '#F8F9FA',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 5,
    },


    // Dark mode override for dropdown text
    // Changes text color for dark theme
    darkDropdownText: {
        textAlign: 'left',
        color: 'white',
        right: 6,
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        marginHorizontal: 2.2,
        flexWrap: 'wrap',
    },

    // Style for text within dropdown options
    // Defines alignment, font, and color
    dropdownText: {
        right: 6,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'left',
        fontSize: 14,
        color: 'black',
        marginHorizontal: 2.2,
        flexWrap: 'wrap',
    },

    // Style for dropdown arrow icon
    // Defines size, positioning, and alignment
    downarrow: {
        marginRight: 10,
        marginLeft: 5,
        alignSelf: 'center',
        width: 8,
        height: 8,
    },
});
