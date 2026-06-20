import { StyleSheet } from 'react-native';

export const searchBarStyles = StyleSheet.create({


    // Container style for SearchBar component from react-native-elements
    // Removes default styling and adds custom shadow and positioning
    searchBarContainer: {
        bottom: 10,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 1,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        width: '77.5%',
    },

    // Dark mode override for search bar container
    // Changes background to match dark theme
    darksearchBarContainer: {
        backgroundColor: 'transparent',
    },
    // Style for the inner container of the search input
    // Creates a rounded input field with subtle shadow
    searchInputContainer: {
        borderColor: '#D4C9BE',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 25,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },

    // Dark mode override for search input container
    // Applies dark background with adjusted border styling
    darksearchInputContainer: {
        backgroundColor: '#1A1A18',
        elevation: 0,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#858a7e',
    },

    // Style for the text input itself
    // Defines text size and color with appropriate spacing
    searchInput: {
        fontSize: 18,
        color: '#333', // Text color inside the input field
        paddingHorizontal: 0, // Adjust text padding inside input field
        flex: 1,
    },

    // Dark mode override for search input text
    // Changes text color to light gray for visibility on dark background
    darksearchInput: {
        color: '#e0e0e0',
    },

    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },

    searchIconImage: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },





});
