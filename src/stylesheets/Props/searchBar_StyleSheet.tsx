import { StyleSheet } from 'react-native';

export const searchBarStyles = StyleSheet.create({


    // Container style for SearchBar component from react-native-elements
    // Removes default styling and adds custom shadow and positioning
    searchBarContainer: {
        bottom: 10,
        shadowColor: 'gray', // Add subtle shadow for depth
        backgroundColor: '#F8F9FA', // Remove default grey background
        borderTopWidth: 0, // Remove top border
        borderBottomWidth: 0, // Remove bottom border
        paddingHorizontal: 1, // Remove extra padding
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        width: '70.5%',
    },

    // Dark mode override for search bar container
    // Changes background to match dark theme
    darksearchBarContainer: {
        backgroundColor: '#1A1A18',
    },
    // Style for the inner container of the search input
    // Creates a rounded input field with subtle shadow
    searchInputContainer: {
        borderColor: '#D4C9BE',
        borderWidth: 1,
        backgroundColor: 'white', // Set clean white background for input field
        borderRadius: 25,
        height: 65,
        shadowOpacity: 0.1, // Softer shadow opacity
        shadowRadius: 4, // Smooth shadow blur
        elevation: 1,
        width: '100%',
    },

    // Dark mode override for search input container
    // Applies dark background with adjusted border styling
    darksearchInputContainer: {
        backgroundColor: '#1A1A18',
        elevation: 0,
        borderWidth: 1,
        borderBottomWidth: 1,
    },

    // Style for the text input itself
    // Defines text size and color with appropriate spacing
    searchInput: {
        fontSize: 18,
        color: '#333', // Text color inside the input field
        paddingHorizontal: 0, // Adjust text padding inside input field
    },

    // Dark mode override for search input text
    // Changes text color to light gray for visibility on dark background
    darksearchInput: {
        color: '#e0e0e0',
    },





});
