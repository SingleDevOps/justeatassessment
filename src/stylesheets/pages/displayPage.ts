import { StyleSheet } from 'react-native';

export const displayPageStyles = StyleSheet.create({
    fullview: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    darkfullview: {
        backgroundColor: '#1A1A18',
    },
    countBar: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 4,
    },
    countText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        color: '#888888',
    },
    darkcountText: {
        color: '#AAAAAA',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listfooterComponent: {
        height: 50,
    },
});
