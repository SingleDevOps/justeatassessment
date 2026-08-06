import { StyleSheet } from 'react-native';

export const restaurantMapStyles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 12,
    },
    map: {
        width: '100%',
        height: 200,
    },
    darkmap: {
        // iOS MapKit has no dark mode toggle; keep default tiles.
    },
    expandButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        backgroundColor: '#FF8000',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    expandButtonText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: '#FFFFFF',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000',
    },
    modalMap: {
        flex: 1,
    },
    modalHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    closeButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    closeButtonText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: '#FFFFFF',
    },
});
