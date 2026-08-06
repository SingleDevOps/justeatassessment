import { StyleSheet } from 'react-native';

export const localLegendsCarouselStyles = StyleSheet.create({
    container: {
        marginTop: 4,
        marginBottom: 4,
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: '#333333',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    darkTitle: {
        color: '#FFFFFF',
    },
    card: {
        width: 132,
        marginHorizontal: 6,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#D4C9BE',
        alignItems: 'center',
    },
    darkCard: {
        backgroundColor: '#272724',
        borderColor: '#4A4A45',
    },
    logo: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F5F5F5',
        marginBottom: 8,
    },
    name: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 12,
        color: '#333333',
        textAlign: 'center',
    },
    darkName: {
        color: '#FFFFFF',
    },
    rating: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#FF8000',
        marginTop: 4,
    },
});
