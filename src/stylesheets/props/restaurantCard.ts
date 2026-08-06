// Style for touchable elements (restaurant cards)
// Ensures rounded corners and prevents content overflow

import { makeThemedStyles } from '../makeThemedStyles';

export const restaurantCardStyles = makeThemedStyles((t) => ({
    // Style for touchable elements (restaurant cards)
    // Ensures rounded corners and prevents content overflow
    touchableHighlight: {
        borderRadius: t.radius.roundedC,
        overflow: 'hidden',
    },

    // Primary restaurant card style
    // Defines appearance with border, background, shadow, and spacing
    // Creates visual separation between restaurant listings
    card: {
        borderColor: t.color.borderDefault,
        borderWidth: 0.5,
        backgroundColor: t.color.containerDefault,
        borderRadius: t.radius.roundedC,
        paddingTop: t.spacing.b,
        paddingBottom: t.spacing.b,
        marginTop: t.spacing.b,
        marginBottom: t.spacing.aSmall,
        overflow: 'hidden',
        ...t.elevation.shadowA,
    },

    // Style for the top section of restaurant cards
    // Arranges logo and restaurant info side by side
    upperPart: {
        flexDirection: 'row', // Align image and text side by side
        alignItems: 'center',
        paddingHorizontal: t.spacing.d,
        paddingVertical: t.spacing.c,
    },

    // Style for restaurant logo images
    image: {
        width: t.spacing.i,
        height: t.spacing.i,
        borderRadius: t.radius.roundedC, // radius on image corners.
        backgroundColor: t.color.containerStrong, // Placeholder background color
    },

    // Container for text content next to restaurant logo
    // Uses flex to take available space with appropriate spacing
    textContainer: {
        flex: 1,
        marginLeft: t.spacing.d, // Space between image and text
    },

    // Style for restaurant name text
    // Makes name prominent with bold font and appropriate size
    name: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size16,
        color: t.color.contentDefault,
        marginBottom: t.spacing.a,
        flexShrink: 1,
    },

    nameRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    badgeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        marginLeft: t.spacing.b,
        gap: t.spacing.a,
    },

    badge: {
        borderRadius: t.radius.roundedB,
        paddingHorizontal: t.spacing.aSmall,
        paddingVertical: t.spacing.aSmall,
    },

    newBadge: {
        backgroundColor: t.color.supportInfo,
    },

    newBadgeText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size12,
        color: t.color.contentInverseSolid,
    },

    promotedBadge: {
        backgroundColor: t.color.interactiveBrand,
    },

    promotedBadgeText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size12,
        color: t.color.contentInverseSolid,
    },

    boostedBadge: {
        backgroundColor: t.color.supportBrand06,
    },

    boostedBadgeText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size12,
        color: t.color.contentInverseSolid,
    },

    offlineImage: {
        opacity: 0.4,
    },

    // Container for rating elements
    // Arranges star icon and rating info horizontally
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    starIcon: {
        marginRight: t.spacing.a, // Space between star icon and rating text
    },

    // Style for the rating value text
    // Uses the PIE content-brand colour to highlight ratings
    rating: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size14,
        color: t.color.contentBrand,
    },

    // Style for the rating count text
    // Uses standard color and font weight
    ratingNumbers: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size14,
        color: t.color.contentDefault,
    },

    openDot: {
        marginLeft: t.spacing.b,
        borderRadius: t.radius.roundedB,
        paddingHorizontal: t.spacing.aSmall,
        paddingVertical: t.spacing.aSmall,
        backgroundColor: t.color.supportPositiveTonal,
    },

    openDotText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.supportPositive,
    },

    offlineDot: {
        backgroundColor: t.color.supportErrorTonal,
    },

    offlineDotText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.supportError,
    },

    freeDeliveryText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.contentPositive,
        marginTop: t.spacing.a,
    },

    // Style for the divider between upper and lower card sections
    // Creates subtle visual separation with the PIE divider token
    separator: {
        bottom: t.spacing.aSmall,
        height: 1,
        backgroundColor: t.color.dividerDefault,
        marginHorizontal: t.spacing.d,
        marginVertical: t.spacing.b,
        opacity: 0.3,
    },

    // Container for the bottom section of restaurant cards
    // Provides consistent horizontal padding
    lowerPart: {
        paddingHorizontal: t.spacing.d,
    },

    // Style for restaurant cuisine text
    // Defines appearance and positioning of cuisine information
    cuisine: {
        fontFamily: t.fontFamily.primary,
        top: t.spacing.a,
        fontSize: t.fontSize.size14,
        color: t.color.contentDefault,
        marginBottom: t.spacing.aSmall,
        textAlign: 'left',
    },

    // Container for restaurant address section
    // Arranges address elements with appropriate spacing
    addressContainer: {
        marginTop: t.spacing.b, // Space between cuisines and address
        flexDirection: 'row',
        right: t.spacing.a,
        marginRight: t.spacing.b,
        paddingRight: t.spacing.c, // Add some padding for longer addresses
        paddingBottom: t.spacing.b,
    },

    // Style for pin icon (emoji) in address section
    // Defines font and spacing
    pinIcon: {
        marginRight: t.spacing.a, // Add some space between the icon and text
    },

    // Container for address text with left padding
    addressTextContainer: {
        flex: 1,
        paddingLeft: t.spacing.a,
        overflow: 'hidden',
    },

    // Style for restaurant address text
    // Defines appearance with italic font and appropriate line height
    address: {
        fontFamily: t.fontFamily.lightItalic,
        fontSize: t.fontSize.size12,

        flex: 1, // Allow text to take remaining space
        lineHeight: t.lineHeight.lh20, // Consistent line height for multi-line text
    },

    // Style for distance text at the bottom right of the card
    distanceText: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentSubdued,
        alignSelf: 'flex-end',
        textAlign: 'right',
        marginTop: t.spacing.a,
        marginBottom: t.spacing.a,
        marginRight: t.spacing.aSmall,
    },
}));
