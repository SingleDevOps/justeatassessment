import { StyleSheet } from 'react-native';

export const displayPageStyles = StyleSheet.create({
    // Main container style for the entire screen
    // Takes up full available space with a light background color
    fullview: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },


    // Dark mode override for the main container
    // Changes background to dark color when dark mode is active
    darkfullview: {
        backgroundColor: '#1A1A18',
    },


    // Style for touchable elements (restaurant cards)
    // Ensures rounded corners and prevents content overflow
    touchableHighlight: {
        borderRadius: 12,
        overflow: 'hidden',
    },


    // Main content container with horizontal padding
    // Ensures content fills available space
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },



    // Primary restaurant card style
    // Defines appearance with border, background, shadow, and spacing
    // Creates visual separation between restaurant listings
    card: {
        borderColor: '#D4C9BE',
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingTop: 9,
        paddingBottom: 9,
        marginTop: 10,
        marginBottom: 6,
        overflow: 'hidden',
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 1,
    },


    // Dark mode override for restaurant cards
    // Applies darker colors and subtle border
    darkcard: {
        borderColor: '#858a7e',
        borderWidth: 0.1,
        backgroundColor: '#272724',
    },


    // Style for the top section of restaurant cards
    // Arranges logo and restaurant info side by side
    upperPart: {
        flexDirection: 'row', // Align image and text side by side
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },


    // Style for restaurant logo images
    image: {
        width: 60,
        height: 60,
        borderRadius: 12, // radius on image corners.
        backgroundColor: '#F5F5F5', // Placeholder background color
    },


    // Container for text content next to restaurant logo
    // Uses flex to take available space with appropriate spacing
    textContainer: {
        flex: 1,
        marginLeft: 16, // Space between image and text
    },


    // Style for restaurant name text
    // Makes name prominent with bold font and appropriate size
    name: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        color: '#333333',
        marginBottom: 4,
    },


    // Dark mode override for restaurant name
    darkname: {
        color: 'white',
    },


    // Container for rating elements
    // Arranges star icon and rating info horizontally
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },


    // Style for star rating icon
    // Defines size and spacing
    ratingImage: {
        width: 10,
        height: 10,
        marginRight: 4, // Space between star icon and rating text
    },


    // Style for the rating value text
    // Uses Just Eat brand orange to highlight ratings
    rating: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: '#FF8000', // Just Eat orange for ratings
    },


    // Style for the rating count text
    // Uses standard color and font weight
    ratingNumbers: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: '#333333',
    },


    // Dark mode override for rating count text
    darkratingNumbers: {
        color: 'white',
    },


    // Style for the divider between upper and lower card sections
    // Creates subtle visual separation with partially transparent line
    separator: {
        bottom: 2,
        height: 1,
        backgroundColor: '#708090',
        marginHorizontal: 16,
        marginVertical: 8,
        opacity: 0.3,
    },


    // Container for the bottom section of restaurant cards
    // Provides consistent horizontal padding
    lowerPart: {
        paddingHorizontal: 16,
    },


    // Style for restaurant cuisine text
    // Defines appearance and positioning of cuisine information
    cuisine: {
        fontFamily: 'OpenSans-Regular',
        top: 5,
        fontSize: 14,
        color: 'black',
        marginBottom: 6,
        textAlign: 'left',
    },


    // Dark mode override for cuisine text
    darkcuisine: {
        color: '#e6e6e6',
    },


    // Container for restaurant address section
    // Arranges address elements with appropriate spacing
    addressContainer: {
        marginTop: 10, // Space between cuisines and address
        flexDirection:'row',
        right: 5,
        marginRight: 10,
        paddingRight: 15, // Add some padding for longer addresses
        paddingBottom: 10,
    },


    // Style for location icon in address section
    // Defines positioning and size
    locationIcon: {
        marginLeft: 2,
        marginRight: 2.5,
        marginTop: 3,
        width: 12,
        height: 12,
    },


    // Style for pin icon (emoji) in address section
    // Defines font and spacing
    pinIcon: {
        fontFamily: 'OpenSans-LightItalic',
        fontSize: 14,
        marginRight: 4, // Add some space between the icon and text
        lineHeight: 20, // Match with the address line height
    },

    // Container for address text with left padding
    addressTextContainer: {
        flex: 1,
        paddingLeft: 4,
        overflow:'hidden',
    },


    // Style for restaurant address text
    // Defines appearance with italic font and appropriate line height
    address: {
        fontFamily: 'OpenSans-LightItalic',
        fontSize: 13,

        flex: 1, // Allow text to take remaining space
        lineHeight: 20, // Consistent line height for multi-line text
    },


    // Dark mode override for address text
    darkaddress: {
        color: '#e6e6e6',
    },


    // Style for list footer component
    // Adds space at bottom of list to prevent content being hidden
    listfooterComponent: {
        height: 50,
    },


    // Style for placeholder text
    Placeholder: {
        color: 'black',
        fontSize: 16,
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


    // Style for dropdown list when expanded
    // Defines width, background, and positioning
    dropdown: {
        width: 379,
        paddingBottom: 1,
        borderColor: '#F8F9FA',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 5,
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


    // Dark mode override for expanded dropdown
    // Changes background and border colors for dark theme
    darkDropdown: {
        borderColor: '#1A1A18',
        backgroundColor: '#262626',
        width: 379,
        paddingBottom: 1,
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


    // Style for dropdown arrow icon
    // Defines size, positioning, and alignment
    downarrow: {
        marginRight: 10,
        marginLeft: 5,
        alignSelf: 'center',
        width: 8,
        height: 8,
    },
}
);
