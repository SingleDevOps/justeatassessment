import { StyleSheet } from 'react-native';

export const mainpageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Light gray background for the main page
        paddingHorizontal: 20, //Padding for the search Bar
        justifyContent: 'center',
    },
    darkcontainer: {
        backgroundColor: '#1A1A18',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        top: '15%',
    },
    logo: {
        marginTop:-200,
        width: '70%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    searchContainer: {
        width: '100%',
        marginTop: 30,     // Adjust this value based on your layout needs
        alignItems: 'center',
    },
    title: { //style of the text "Find Restaurants Near You"
        fontSize: 20,
        fontFamily:'OpenSans-Italic',
        color: '#888',
        textAlign: 'center',
        marginBottom: 5,
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
        marginHorizontal: 40,
        width: '90%',
    },
    darksearchBarContainer: {
        backgroundColor: '#1A1A18',
    },
    searchInputContainer: {
        marginHorizontal: 46,
        borderColor: '#D4C9BE',
        borderWidth:1,
        backgroundColor: 'white', // Set clean white background for input field
        borderRadius: 25,
        height: 70,
        shadowOpacity: 0.1, // Softer shadow opacity
        shadowRadius: 4, // Smooth shadow blur
        elevation: 1,
        alignItems:'center',
    },
    darksearchInputContainer:{
        backgroundColor: '#1A1A18',
        elevation: 0,
        borderWidth: 1,
    },
    searchInput: {
        textAlign: 'center',
        fontSize: 18,
        color: '#333', // Text color inside the input field
        paddingHorizontal: 10, // Adjust text padding inside input field
    },
    darksearchInput: {
        color: '#e0e0e0',
    },
});
