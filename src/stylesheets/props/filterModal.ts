import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const filterModalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    darkOverlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContainer: {
        height: SCREEN_HEIGHT * 0.92,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        width: '100%',
    },
    darkModalContainer: {
        backgroundColor: '#1A1A18',
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#CCCCCC',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 6,
    },
    darkHandle: {
        backgroundColor: '#555555',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    darkHeader: {
        borderBottomColor: '#333333',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#333333',
    },
    darkHeaderTitle: {
        color: '#E6E6E6',
    },
    headerButton: {
        fontSize: 15,
        fontFamily: 'OpenSans-Semibold',
        color: '#FF8000',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    disabledButton: {
        color: '#CCCCCC',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: 'OpenSans-Bold',
        color: '#333333',
        marginBottom: 12,
    },
    darkSectionTitle: {
        color: '#E6E6E6',
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    darkToggleRow: {
        borderBottomColor: '#333333',
    },
    toggleLabel: {
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        color: '#333333',
    },
    darkToggleLabel: {
        color: '#E6E6E6',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionPill: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#D4C9BE',
        backgroundColor: '#FFFFFF',
    },
    darkOptionPill: {
        borderColor: '#858a7e',
        backgroundColor: '#272724',
    },
    selectedOptionPill: {
        backgroundColor: '#FF8000',
        borderColor: '#FF8000',
    },
    darkSelectedOptionPill: {
        backgroundColor: '#FF8000',
        borderColor: '#FF8000',
    },
    optionPillText: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: '#333333',
    },
    darkOptionPillText: {
        color: '#E6E6E6',
    },
    selectedOptionPillText: {
        color: '#FFFFFF',
        fontFamily: 'OpenSans-Bold',
    },
    cuisineGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    cuisineChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D4C9BE',
        backgroundColor: '#FFFFFF',
    },
    darkCuisineChip: {
        borderColor: '#858a7e',
        backgroundColor: '#272724',
    },
    selectedCuisineChip: {
        backgroundColor: '#FF8000',
        borderColor: '#FF8000',
    },
    darkSelectedCuisineChip: {
        backgroundColor: '#FF8000',
        borderColor: '#FF8000',
    },
    cuisineEmoji: {
        fontSize: 14,
        marginRight: 6,
    },
    cuisineText: {
        fontSize: 13,
        fontFamily: 'OpenSans-Regular',
        color: '#333333',
    },
    darkCuisineText: {
        color: '#E6E6E6',
    },
    selectedCuisineText: {
        color: '#FFFFFF',
        fontFamily: 'OpenSans-Bold',
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    darkFooter: {
        borderTopColor: '#333333',
    },
    applyButton: {
        backgroundColor: '#FF8000',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
        color: '#FFFFFF',
    },
    activeFilterBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF8000',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    activeFilterBadgeText: {
        fontSize: 11,
        fontFamily: 'OpenSans-Bold',
        color: '#FFFFFF',
    },
});
