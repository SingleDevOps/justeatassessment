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



    // Main content container with horizontal padding
    // Ensures content fills available space
    container: {
        flex: 1,
        paddingHorizontal: 16,
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
}
);
