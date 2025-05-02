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

});
