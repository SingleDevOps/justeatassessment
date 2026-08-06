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
    areaText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: '#333333',
        marginBottom: 2,
    },
    darkareaText: {
        color: '#FFFFFF',
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
        paddingHorizontal: 16,
    },
    listfooterComponent: {
        height: 50,
    },
});
