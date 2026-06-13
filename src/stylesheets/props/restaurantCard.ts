// Style for touchable elements (restaurant cards)
// Ensures rounded corners and prevents content overflow

import { StyleSheet } from 'react-native';
export const restaurantCardStyles = StyleSheet.create({
    // Style for touchable elements (restaurant cards)
    // Ensures rounded corners and prevents content overflow
    touchableHighlight: {
        borderRadius: 12,
        overflow: 'hidden',
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
        flexDirection: 'row',
        right: 5,
        marginRight: 10,
        paddingRight: 15, // Add some padding for longer addresses
        paddingBottom: 10,
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
        overflow: 'hidden',
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
});
