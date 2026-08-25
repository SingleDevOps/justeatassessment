import { makeThemedStyles } from '../makeThemedStyles';

export const detailPageStyles = makeThemedStyles((t) => ({
    fullview: {
        flex: 1,
        backgroundColor: t.color.backgroundDefault,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: t.spacing.g,
    },
    missingState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: t.spacing.e,
    },

    headerSection: {
        alignItems: 'center',
        paddingTop: t.spacing.e,
        paddingBottom: t.spacing.a,
        paddingHorizontal: t.spacing.d,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: t.radius.roundedF,
        backgroundColor: t.color.containerStrong,
    },
    restaurantName: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size20,
        color: t.color.contentDefault,
        marginTop: t.spacing.c,
        textAlign: 'center',
    },

    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: t.spacing.b,
        gap: t.spacing.aSmall,
    },
    badge: {
        paddingHorizontal: t.spacing.b,
        paddingVertical: t.spacing.a,
        borderRadius: t.radius.roundedC,
        backgroundColor: t.color.interactiveBrand,
    },
    badgeText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size12,
        color: t.color.contentInverseSolid,
    },
    greenBadge: {
        backgroundColor: t.color.supportPositive,
    },
    redBadge: {
        backgroundColor: t.color.supportError,
    },
    grayBadge: {
        backgroundColor: t.color.contentSubdued,
    },
    blueBadge: {
        backgroundColor: t.color.supportInfo,
    },
    purpleBadge: {
        backgroundColor: t.color.supportBrand06,
    },

    section: {
        marginHorizontal: t.spacing.d,
        marginTop: t.spacing.d,
        backgroundColor: t.color.containerDefault,
        borderRadius: t.radius.roundedC,
        padding: t.spacing.d,
        borderWidth: 0.5,
        borderColor: t.color.borderDefault,
    },
    sectionTitle: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size16,
        color: t.color.interactiveBrand,
        marginBottom: t.spacing.c,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: t.spacing.aSmall + 2,
        borderBottomWidth: 0.5,
        borderBottomColor: t.color.dividerDefault,
    },
    infoLabel: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size14,
        color: t.color.contentSubdued,
        flex: 1,
    },
    infoValue: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size14,
        color: t.color.contentDefault,
        flex: 1,
        textAlign: 'right',
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starImage: {
        width: t.spacing.d,
        height: t.spacing.d,
        marginRight: t.spacing.aSmall,
    },
    ratingValue: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size16,
        color: t.color.contentBrand,
    },
    ratingCount: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size14,
        color: t.color.contentSubdued,
        marginLeft: t.spacing.aSmall,
    },

    cuisineChip: {
        backgroundColor: t.color.supportBrandTonal,
        borderRadius: t.radius.roundedB,
        paddingHorizontal: t.spacing.b,
        paddingVertical: t.spacing.aSmall,
        marginRight: t.spacing.b,
        marginBottom: t.spacing.b,
        borderWidth: 1,
        borderColor: t.color.interactiveBrand,
    },
    cuisineChipText: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.interactiveBrand,
    },
    cuisinesWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    dealCard: {
        backgroundColor: t.color.containerDefault,
        borderRadius: t.radius.roundedB,
        padding: t.spacing.c,
        marginBottom: t.spacing.b,
        borderLeftWidth: 4,
        borderLeftColor: t.color.interactiveBrand,
    },
    dealDescription: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size14,
        color: t.color.contentDefault,
    },
    dealType: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentSubdued,
        marginTop: t.spacing.a,
    },
    dealTypeBadge: {
        alignSelf: 'flex-start',
        marginTop: t.spacing.aSmall,
        borderRadius: t.radius.roundedA,
        paddingHorizontal: t.spacing.b,
        paddingVertical: t.spacing.aSmall,
        backgroundColor: t.color.supportBrandTonal,
        borderWidth: 1,
        borderColor: t.color.interactiveBrand,
    },
    dealTypeBadgeText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.interactiveBrand,
    },

    availabilityCard: {
        marginBottom: t.spacing.c,
        paddingBottom: t.spacing.c,
        borderBottomWidth: 0.5,
        borderBottomColor: t.color.dividerDefault,
    },
    availabilityTitle: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size14,
        color: t.color.contentDefault,
        marginBottom: t.spacing.b,
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: t.spacing.aSmall,
    },
    availabilityLabel: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentSubdued,
    },
    availabilityValue: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentDefault,
    },

    locationText: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentSubdued,
        lineHeight: t.lineHeight.lh20,
    },

    mapDistanceRow: {
        marginTop: t.spacing.b,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapDistanceText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.contentBrand,
    },

    showMoreButton: {
        marginTop: t.spacing.b,
        paddingVertical: t.spacing.b,
        alignItems: 'center',
        borderRadius: t.radius.roundedB,
        backgroundColor: t.color.supportBrandTonal,
        borderWidth: 1,
        borderColor: t.color.interactiveBrand,
        minHeight: 44,
        justifyContent: 'center',
    },
    showMoreText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size14,
        color: t.color.interactiveBrand,
    },
}));
