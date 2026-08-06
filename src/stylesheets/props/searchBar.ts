import { makeThemedStyles } from '../makeThemedStyles';

export const searchBarStyles = makeThemedStyles((t) => ({

    // Container style for the postcode search input
    // Removes default styling and adds custom shadow and positioning
    searchBarContainer: {
        bottom: t.spacing.b,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: t.spacing.aSmall,
        marginLeft: t.spacing.d,
        marginRight: t.spacing.d,
        textAlign: 'center',
        width: '77.5%',
    },

    // Style for the inner container of the search input
    // Creates a rounded input field with subtle shadow
    searchInputContainer: {
        borderColor: t.color.borderDefault,
        borderWidth: 1,
        backgroundColor: t.color.containerDefault,
        borderRadius: t.radius.roundedE,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: t.spacing.d,
        ...t.elevation.shadowA,
    },

    // Style for the text input itself
    // Defines text size and color with appropriate spacing
    searchInput: {
        fontSize: t.fontSize.size16,
        color: t.color.contentDefault, // Text color inside the input field
        paddingHorizontal: 0, // Adjust text padding inside input field
        flex: 1,
    },

    searchButton: {
        width: 44,
        height: 44,
        borderRadius: t.radius.roundedE,
        backgroundColor: t.color.interactiveBrand,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: t.spacing.c,
    },
}));
