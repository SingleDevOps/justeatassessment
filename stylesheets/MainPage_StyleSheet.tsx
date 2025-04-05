import { StyleSheet } from 'react-native';

export const mainpageStyles = StyleSheet.create({


    // Main container style that wraps the entire screen
    // Uses flex to fill available space with light background color
    overAll: {
        flex: 1, //Span the whole page
        backgroundColor: '#F8F9FA', // Light gray background for the main page
    },


    // Dark mode override for the main container
    // Changes background to dark color when dark mode is active
    darkOverAll: {
        backgroundColor: '#1A1A18', // Dark gray background for the main page
    },


    // Container style for KeyboardAvoidingView
    // Ensures content adjusts when keyboard appears
    keyboardAvoidingView: {
        flex: 1,
    },


    // Primary content container with horizontal padding
    // Centers content vertically and provides spacing from edges
    container: {
        flex: 1, //Span the whole page
        backgroundColor: '#F8F9FA', // Light gray background for the main page
        paddingHorizontal: 20, //Padding for the search Bar
        justifyContent: 'center',
    },


    // Dark mode override for the primary container
    darkcontainer: {
        backgroundColor: '#1A1A18',
    },


    // Container for app logo positioning
    // Centers logo horizontally and positions it at top 15% of screen
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        top: '15%',
    },


    // Style for the Just Eat logo image
    // Sets proportional dimensions and centers the image
    logo: {
        marginTop: -50,
        width: '80%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },


    // Container for search bar and title text
    // Positions search elements below logo with appropriate spacing
    searchContainer: {
        bottom: 130,
        width: '100%',
        marginTop: 230,     // Adjust this value based on your layout needs
        alignItems: 'center',
    },


    // Style for the "Near You" portion of title text
    // Defines appearance with italic gray text that complements the orange text
    titleSecondpart: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 5,
    },


    // Dark mode override for title text
    // Changes text color to white for better visibility
    darktitleSecondpart: {
        color: '#FFFFFF',
    },


    // Container for two-part title text
    // Arranges "Find Restaurants" and "Near You" horizontally with centered alignment
    twoTexts: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },


    // Style for the "Find Restaurants" portion of title text
    // Uses Just Eat brand orange color with bold italic styling
    titleFirstpart: { //style of the text "Find Restaurants"
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8000',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 5,
    },


    // Dark mode override for first part of title
    // Changes text color to white (unused because it is always having "#FF8000" color)
    darktitleFirstpart: {
        color: '#FFFFFF',
    },


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
