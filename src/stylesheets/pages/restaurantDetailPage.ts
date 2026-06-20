import { StyleSheet } from 'react-native';

export const detailPageStyles = StyleSheet.create({
    fullview: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    darkfullview: {
        backgroundColor: '#1A1A18',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },

    headerSection: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    restaurantName: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 22,
        color: '#333333',
        marginTop: 12,
        textAlign: 'center',
    },
    darkrestaurantName: {
        color: '#FFFFFF',
    },
    uniqueName: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#999999',
        marginTop: 4,
    },

    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
        gap: 6,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#FF8000',
    },
    badgeText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 11,
        color: '#FFFFFF',
    },
    greenBadge: {
        backgroundColor: '#28A745',
    },
    redBadge: {
        backgroundColor: '#DC3545',
    },
    grayBadge: {
        backgroundColor: '#6C757D',
    },
    blueBadge: {
        backgroundColor: '#007BFF',
    },
    purpleBadge: {
        backgroundColor: '#6F42C1',
    },

    section: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 0.5,
        borderColor: '#D4C9BE',
    },
    darksection: {
        backgroundColor: '#272724',
        borderColor: '#858a7e',
    },
    sectionTitle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: '#FF8000',
        marginBottom: 12,
    },
    darksectionTitle: {
        color: '#FF8000',
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E8E8E8',
    },
    darkinfoRow: {
        borderBottomColor: '#3A3A38',
    },
    infoLabel: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: '#666666',
        flex: 1,
    },
    darkinfoLabel: {
        color: '#AAAAAA',
    },
    infoValue: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: '#333333',
        flex: 1,
        textAlign: 'right',
    },
    darkinfoValue: {
        color: '#E6E6E6',
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starImage: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    ratingValue: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        color: '#FF8000',
    },
    ratingCount: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: '#666666',
        marginLeft: 6,
    },
    darkratingCount: {
        color: '#AAAAAA',
    },

    cuisineChip: {
        backgroundColor: '#FFF3E0',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#FF8000',
    },
    darkcuisineChip: {
        backgroundColor: '#3A3A38',
    },
    cuisineChipText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        color: '#FF8000',
    },
    cuisinesWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    dealCard: {
        backgroundColor: '#FFF8F0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#FF8000',
    },
    darkdealCard: {
        backgroundColor: '#2D2D2A',
    },
    dealDescription: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: '#333333',
    },
    darkdealDescription: {
        color: '#E6E6E6',
    },
    dealType: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#999999',
        marginTop: 4,
    },

    availabilityCard: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E8E8E8',
    },
    darkavailabilityCard: {
        borderBottomColor: '#3A3A38',
    },
    availabilityTitle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        color: '#333333',
        marginBottom: 8,
    },
    darkavailabilityTitle: {
        color: '#E6E6E6',
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
    },
    availabilityLabel: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        color: '#666666',
    },
    darkavailabilityLabel: {
        color: '#AAAAAA',
    },
    availabilityValue: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        color: '#333333',
    },
    darkavailabilityValue: {
        color: '#E6E6E6',
    },

    tagChip: {
        backgroundColor: '#E8E8E8',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 6,
    },
    darktagChip: {
        backgroundColor: '#3A3A38',
    },
    tagText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#555555',
    },
    darktagText: {
        color: '#CCCCCC',
    },
    tagsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    locationText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        color: '#666666',
        lineHeight: 20,
    },
    darklocationText: {
        color: '#AAAAAA',
    },
});
