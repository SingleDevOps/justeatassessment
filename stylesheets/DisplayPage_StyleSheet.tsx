import { StyleSheet } from 'react-native';

export const displayPageStyles = StyleSheet.create({
    fullview: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    darkfullview: {
        backgroundColor: '#1A1A18',
    },
    touchableHighlight: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    card: {
        borderColor: '#D4C9BE',
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingTop:15,
        paddingBottom:10,
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden',
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 1,
    },
    darkcard: {
        borderColor: '#2C2C2C',
        borderWidth: 0.8,
        backgroundColor: '#262626',
    },
    upperPart: {
        flexDirection: 'row', // Align image and text side by side
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 35, // Circular image
        backgroundColor: '#F5F5F5', // Placeholder background color
    },
    textContainer: {
        flex: 1,
        marginLeft: 16, // Space between image and text
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    darkname: {
        color: 'white',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingImage: {
        width: 16,
        height: 16,
        marginRight: 4, // Space between star icon and rating text
    },
    rating: {
        fontSize: 14,
        color: '#FF8000', // Just Eat orange for ratings
        fontWeight: 'bold',
    },
    ratingNumbers: {
        fontSize: 12,
        color: '#333333',
    },
    darkratingNumbers: {
        color: 'white',
    },
    separator: {
        bottom:7,
        height:1,
        backgroundColor: '#708090',
        marginHorizontal: 16,
        marginVertical: 8,
        opacity:0.3,
    },
    lowerPart: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    cuisine: {
        top:5,
        fontSize: 14,
        color: '#393939',
        marginBottom: 6,
        textAlign: 'left',
    },
    darkcuisine: {
        color: '#e6e6e6',
    },
    listfooterComponent: {
        height: 50,
    },
    placeholder: {
        color: 'black',
        fontSize: 16,
    },
    darkplaceholder: {
        color: 'white',
    },
    dropdownBox: {
        marginHorizontal: 30,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: 'white',
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    dropdown: {
        width:345,
        backgroundColor: 'white',
        alignSelf:'center',
        marginTop:-2,
        paddingHorizontal:20,
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
        maxWidth: 400,
        flexWrap: 'wrap',
    },
    // Dropdown styles for dark mode
    darkDropdownBox: {
        borderColor: '#555',
        backgroundColor: '#ECDFCC',
    },
    darkDropdown: {
        backgroundColor: '#262626',
    },
    darkDropdownText: {
        color: 'white',
    },
}
);
