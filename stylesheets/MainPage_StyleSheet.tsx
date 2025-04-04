import { StyleSheet } from 'react-native';

export const mainpageStyles = StyleSheet.create({
    overAll: {
        flex: 1, //Span the whole page
        backgroundColor: '#F8F9FA', // Light gray background for the main page
    },
    darkOverAll: {
        backgroundColor: '#1A1A18', // Dark gray background for the main page
    },
    keyboardAvoidingView:{
        flex: 1,
    },
    container: {
        flex: 1, //Span the whole page
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
        marginTop:-50,
        width: '80%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    searchContainer: {
        width: '100%',
        marginTop: 230,     // Adjust this value based on your layout needs
        alignItems: 'center',
    },
    title: { //style of the text "Find Restaurants Near You"
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    darktitle: {
        color: '#FFFFFF',
    },
    twoTexts: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    titleFirstpart: { //style of the text "Find Restaurants"
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8000',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    darktitleFirstpart: {
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
        width: '70.5%',
    },
    darksearchBarContainer: {
        backgroundColor: '#1A1A18',
    },
    searchInputContainer: {
        borderColor: '#D4C9BE',
        borderWidth:1,
        backgroundColor: 'white', // Set clean white background for input field
        borderRadius: 25,
        height:65,
        shadowOpacity: 0.1, // Softer shadow opacity
        shadowRadius: 4, // Smooth shadow blur
        elevation: 1,
        width: '100%',
    },
    darksearchInputContainer:{
        backgroundColor: '#1A1A18',
        elevation: 0,
        borderWidth: 1,
    },
    searchInput: {
        fontSize: 18,
        color: '#333', // Text color inside the input field
        paddingHorizontal: 0, // Adjust text padding inside input field
    },
    darksearchInput: {
        color: '#e0e0e0',
    },
});
