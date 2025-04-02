import { StyleSheet } from 'react-native';

export const mainpageStyles = StyleSheet.create({
    container: {
        flex: 1, //Span the whole page
        backgroundColor: '#F8F9FA', // Light gray background for the main page
        paddingHorizontal: 20, //Padding for the search Bar
        justifyContent: 'center',
    },
    darkcontainer: {
        backgroundColor: '#262626',
    },
    searchContainer: {
        width: '100%',
        marginTop: -180, //Move up to make the search bar appear in the middle instead of the text.
    },
    title: { //style of the text "Find Restaurants Near You"
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    darktitle: {
        color: '#FFFFFF',
    },
    searchBarContainer: {
        shadowColor: 'gray', // Add subtle shadow for depth
        backgroundColor: '#F8F9FA', // Remove default grey background
        borderTopWidth: 0, // Remove top border
        borderBottomWidth: 0, // Remove bottom border
        paddingHorizontal: 1, // Remove extra padding
        marginLeft: 20,
        marginRight: 20,
        width: '90%',
    },
    darksearchBarContainer: {
        backgroundColor: '#262626',
    },
    searchInputContainer: {
        backgroundColor: 'white', // Set clean white background for input field
        borderRadius: 25,
        height: 60,
        shadowColor: '#000', // Add subtle shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Softer shadow opacity
        shadowRadius: 4, // Smooth shadow blur
        elevation: 8,
    },
    searchInput: {
        fontSize: 16,
        color: '#333', // Text color inside the input field
        paddingHorizontal: 10, // Adjust text padding inside input field
    },
});
