import { StyleSheet } from 'react-native';

export const filterSearchBarStyles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#D4C9BE',
        paddingHorizontal: 12,
        height: 48,
    },
    darkinputContainer: {
        backgroundColor: '#272724',
        borderColor: '#858a7e',
    },
    searchIcon: {
        width: 18,
        height: 18,
        tintColor: '#888888',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        color: '#333333',
        paddingVertical: 0,
    },
    darkinput: {
        color: '#E6E6E6',
    },
    clearButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#CCCCCC',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    darkclearButton: {
        backgroundColor: '#555555',
    },
    clearText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        lineHeight: 16,
    },
});
