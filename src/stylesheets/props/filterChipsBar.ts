import { StyleSheet } from 'react-native';

export const filterChipsBarStyles = StyleSheet.create({
    chipsBar: {
        flexGrow: 0,
    },
    chipsContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D4C9BE',
    },
    darkChip: {
        backgroundColor: '#272724',
        borderColor: '#4A4A45',
    },
    selectedChip: {
        backgroundColor: '#FF8000',
        borderColor: '#FF8000',
    },
    chipText: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 13,
        color: '#333333',
    },
    darkChipText: {
        color: '#E6E6E6',
    },
    selectedChipText: {
        color: '#FFFFFF',
    },
    chipCount: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#888888',
        marginLeft: 6,
    },
    darkChipCount: {
        color: '#AAAAAA',
    },
    selectedChipCount: {
        color: '#FFFFFF',
    },
});
